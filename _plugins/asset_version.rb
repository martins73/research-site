require 'digest'

module Jekyll
  # Liquid filters that compute content-hash versions of static assets at build time.
  #
  # Usage:
  #   {{ "/assets/css/style.css" | asset_version }}
  #     => "a3f2b91c"  (first 8 chars of SHA1 of file content)
  #
  #   {{ list_of_paths | assets_version }}
  #     => "9b14ee20"  (combined hash of all paths' content; for cache keys
  #                      that should change when ANY file in a set changes)
  #
  # If the file is missing the filter returns "0" so pages still render with
  # an obviously-stale version string instead of failing the build.
  module AssetVersionFilters
    @@cache = {}

    def asset_version(input)
      full = AssetVersionFilters.resolve_path(@context.registers[:site].source, input)
      AssetVersionFilters.hash_for(full) || '0'
    end

    def assets_version(input)
      paths = input.is_a?(Array) ? input : [input]
      source = @context.registers[:site].source
      hashes = paths.map { |p| AssetVersionFilters.hash_for(AssetVersionFilters.resolve_path(source, p)) || '0' }
      Digest::SHA1.hexdigest(hashes.join('-'))[0, 8]
    end

    def self.resolve_path(source, input)
      return nil if input.nil? || input.to_s.empty?
      relative = input.to_s.sub(%r{^/+}, '')
      File.join(source, relative)
    end

    def self.hash_for(full_path)
      return nil if full_path.nil?

      # If a .css path is requested but only the .scss source exists (Sass
      # compiles to .css at build time), hash the .scss source instead.
      if !File.exist?(full_path) && full_path.end_with?('.css')
        scss = full_path.sub(/\.css\z/, '.scss')
        full_path = scss if File.exist?(scss)
      end

      return nil unless File.exist?(full_path)
      mtime = File.mtime(full_path).to_i
      key = "#{full_path}:#{mtime}"
      @@cache[key] ||= Digest::SHA1.hexdigest(File.binread(full_path))[0, 8]
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetVersionFilters)
