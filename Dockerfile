# Local preview of the site, matching the Ruby version used in CI.
#   docker compose up        -> http://localhost:4000 (live reload)
# The repository is mounted into /site at runtime, so edits show up
# without rebuilding the image. Rebuild only when Gemfile.lock changes.
FROM ruby:3.3-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /site

COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v "$(tail -n 1 Gemfile.lock | tr -d ' ')" \
    && bundle install

EXPOSE 4000 35729

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--force_polling"]
