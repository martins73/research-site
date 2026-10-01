# Martin Gonzalez Cabello | Academic Website

This is the source code for my personal academic website, hosted at [martin.gonzalezcabello.com](https://martin.gonzalezcabello.com).

I use this platform to share my research on the **Human Supply Chain of AI**, **Crowdwork Platforms**, and **Fairness**.

## Tech Stack
* **Static Site Generator:** Jekyll 4
* **Styling:** Handcrafted SCSS with a custom design system (compiled and minified by Jekyll)
* **Templating:** Liquid templates with data-driven content
* **Hosting:** Cloudflare Pages
* **Analytics:** Google Analytics 4 (GA4)
* **Automation:** GitHub Actions (CV PDF, favicons, talk locations, citations, status date)

## Key Features

### Design & UX
* **Responsive Design:** Mobile-first approach with optimized layouts for all screen sizes
* **Dark Mode:** User-togglable theme with localStorage persistence and flash prevention
* **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation, and focus management (focus traps in every modal)
* **Custom Typography:** Merriweather (serif) for headings, Atkinson Hyperlegible (sans-serif) for body text, centralized via the `--font-heading` and `--font-body` CSS custom properties
* **University Color Themes:** 30 preset color schemes derived from official university brand guidelines ([see full gallery](_data/theme/README.md))

### Research Features
* **Cite Button:** Every paper card has a **Cite** button that reveals BibTeX with one-click copy. Papers with a DOI use the publisher's own metadata, fetched automatically (see [Citations](#citations-cite-button)).
* **Talks Map (easter egg):** Clicking the "Conference Presentations & Talks" heading on the CV opens an interactive map of every talk, with a filter by paper. City coordinates are looked up automatically (see [Talks Map](#talks-map)).
* **Activity Feed:** The homepage "Recent Activity" list is also published as an Atom feed at [`/feed.xml`](https://martin.gonzalezcabello.com/feed.xml), so people can follow updates in a feed reader.
* **Academic Profiles:** Google Scholar, ORCID and LinkedIn links in the sidebar, also listed in the JSON-LD `sameAs` so search engines connect the profiles.

### Sustainable & Performance-Focused
* **Optimized Assets:** All photos are WebP; logos resized to display dimensions
* **Lazy Loading:** Below-fold images use `loading="lazy"`; the talks map's base map (21KB) is fetched only when the map is opened
* **Service Worker:** Offline-capable with pre-caching, stale-while-revalidate for static assets, and network-first for HTML
* **CSS Minification:** Jekyll Sass pipeline compresses CSS in production
* **Reduced Motion:** Respects `prefers-reduced-motion` to disable animations
* **Carbon Footprint Badge:** Tracks and displays per-page CO2 emissions via the Website Carbon API
* **Portable Asset Paths:** All internal URLs use Jekyll's `relative_url` filter for baseurl-safe deployment
* **Cache Busting:** CSS, JS and other assets get a content-hash query string at build time (`_plugins/asset_version.rb`)
* **Zero Dependencies:** No JavaScript frameworks or libraries; about 1,100 lines of vanilla JS in `assets/js/main.js`

### Asset Optimization
Visual assets are processed to balance high-resolution display with fast load times:
* **Profile Picture:** Main headshot is a **1000x1000px** WebP. Maintain a **1:1 square ratio** so the CSS circular mask aligns correctly. Bump `avatar_version` in `_config.yml` when you replace it.
* **Social Preview:** Uses a **1200x630px** JPG for platform compatibility. Maintain a **1.91:1 aspect ratio** to prevent unwanted cropping on WhatsApp or LinkedIn.
* **Logos:** Prefer **SVG** for scalability. Otherwise use a **transparent PNG** of at least **60x60px**. Keep all logos at a **1:1 aspect ratio** so they align in the layout.
* **Tools:** Images are resized and converted to WebP via [Squoosh](https://squoosh.app); backgrounds are removed via [remove.bg](https://www.remove.bg).

### Privacy & Security
* **Security Headers:** The `_headers` file sets `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy` (camera, microphone, geolocation and FLoC disabled), and HSTS
* **AI Crawlers:** `robots.txt` blocks AI *training* crawlers but allows AI *search* and user-initiated agents, so assistants such as ChatGPT, Claude and Perplexity can find and cite the site (see [robots.txt](#robotstxt))
* **Private CV Contact Details:** The phone number and office address printed on the CV PDF are kept in GitHub repository secrets, not in this public repository (see [CV PDF](#cv-pdf-generation-generate-cv-pdfyml))
* **Link Hardening:** All `target="_blank"` links include `rel="noopener"` to prevent tabnabbing
* **Email Obfuscation:** Cloudflare Scrape Shield rewrites visible `mailto:` links and plain-text addresses at the edge; the JSON-LD Person block omits email entirely
* **Analytics:** Google Analytics 4. GA4 does not log or store IP addresses, so no IP-masking setting is needed ([Google Analytics Help](https://support.google.com/analytics/answer/2763052))
* **Structured Data:** Schema.org JSON-LD for `Person` (knowsAbout, alumniOf, affiliation, profile links) on every page and `ScholarlyArticle` for public papers on the homepage (with the DOI when available)
* **Open Graph & Meta Tags:** Complete Open Graph and Twitter card metadata for social previews

## Project Structure

```
research-site/
├── _config.yml                         # Site settings, author info, color theme, UI text
├── index.html                          # Homepage (about, recent activity, research, now)
├── feed.xml                            # Atom feed generated from _data/activity.yml
│
├── _pages/                             # Content pages (Jekyll collection)
│   ├── cv.html                         # Curriculum Vitae (fully data-driven) + talks map
│   ├── cv-pdf-source.html              # Source for the generated CV PDF (consumed only by Puppeteer)
│   ├── cv-pdf.html                     # PDF viewer page (desktop iframe + mobile canvas)
│   ├── teaching.md                     # Teaching philosophy + experience
│   ├── library.html                    # Curated book library
│   └── human-supply-chain.md           # Research manifesto
│
├── _data/                              # YAML data files (single source of truth)
│   ├── activity.yml                    # Recent activity (homepage list + Atom feed)
│   ├── status.yml                      # Current status (location, reading, activities)
│   ├── last_updated.yml                # Auto-updated timestamp (set by GitHub Actions)
│   ├── library.yml                     # Bookshelf data (by shelf/category)
│   ├── citations.yml                   # BibTeX fetched from DOIs (generated, see Automation)
│   ├── talk_locations.yml              # Talk city coordinates (generated, see Automation)
│   │
│   ├── theme/                          # Color theme system
│   │   ├── themes.yml                  # 30 university color presets (light + dark mode)
│   │   └── README.md                   # Visual gallery of all themes with brand references
│   │
│   ├── cv/                             # Modularized CV data
│   │   ├── education.yml               # Degrees and institutions
│   │   ├── appointments.yml            # Academic appointments
│   │   ├── industry.yml                # Professional experience (with locations)
│   │   ├── teaching.yml                # Teaching experience (feeds CV and Teaching page)
│   │   ├── papers.yml                  # Research papers (homepage cards, CV, citations)
│   │   ├── awards.yml                  # Honors and awards
│   │   ├── service.yml                 # Academic service
│   │   ├── presentations.yml           # Conference presentations (CV + talks map)
│   │   ├── skills.yml                  # Skills and qualifications
│   │   ├── research_interests.yml      # Research interest keywords
│   │   └── references.yml              # References contact info
│   │
│   ├── ui/                             # UI configuration
│   │   ├── navigation.yml              # Main navigation menu structure
│   │   └── social.yml                  # Sidebar profile links and their SVG icons
│   │
│   └── easter_eggs/                    # Hidden features
│       ├── family.yml                  # Family member information for photo modal
│       └── saints.yml                  # Complete liturgical calendar (365+ days)
│
├── _includes/                          # Reusable HTML components
│   ├── head.html                       # Meta tags, SEO, JSON-LD, analytics, feed link
│   ├── sidebar.html                    # Navigation, profile picture, profile links
│   ├── footer.html                     # Copyright, credits, carbon badge, saint of the day
│   ├── scripts.html                    # Loads assets/js/main.js with a content-hash version
│   ├── family-modal.html               # Accessible image modal dialog
│   ├── talkmap-modal.html              # Talks map modal (CV page)
│   ├── paper-bibtex.html               # BibTeX for one paper (cached DOI entry or generated)
│   ├── cv-coauthors.html               # Renders paper coauthors for CV
│   └── cv-institution-header.html      # CV institution header with logo and location
│
├── _layouts/                           # Page templates
│   ├── default.html                    # Main layout (sidebar + content container)
│   ├── cv-pdf-source.html              # Minimal layout for the CV PDF source page
│   └── pdf-viewer.html                 # Standalone PDF viewer layout
│
├── _plugins/
│   └── asset_version.rb                # Content-hash cache busting filters
│
├── _drafts/                            # Draft content (not published)
│   └── research-notes/                 # Research note-taking system
│
├── assets/                             # Static files
│   ├── css/style.scss                  # Design system (~2,400 lines SCSS, minified on build)
│   ├── js/main.js                      # All site JavaScript (Liquid-processed for config)
│   ├── maps/talks-basemap.svg          # Base map for the talks map (US + Europe inset)
│   ├── fonts/                          # Self-hosted web fonts (woff2)
│   ├── logos/                          # Institution and company logos (PNG/SVG), favicons
│   ├── family/                         # Family photos (WebP)
│   ├── profile_picture.webp            # Profile image (WebP)
│   ├── social_preview.jpg              # Open Graph social media preview (1200x630)
│   └── martin-gonzalez-cabello-cv.pdf  # Auto-generated from YAML data
│
├── .github/                            # GitHub Actions and automation
│   ├── workflows/
│   │   ├── build.yml                   # Runs jekyll build on every PR and push to main (CI)
│   │   ├── generate-cv-pdf.yml         # Auto-generates the CV PDF from data
│   │   ├── enrich-cv-data.yml          # Looks up talk coordinates and DOI citations
│   │   ├── generate-favicons.yml       # Auto-generates favicon PNGs from theme config
│   │   └── update-status-date.yml      # Auto-updates the status timestamp
│   └── scripts/
│       ├── generate-cv-pdf.js          # Puppeteer script for PDF rendering
│       ├── generate-favicons.py        # Favicon generation (Pillow)
│       ├── geocode_talks.py            # Talk city -> coordinates (OpenStreetMap Nominatim)
│       └── fetch_citations.py          # DOI -> BibTeX (doi.org content negotiation)
│
├── Dockerfile / docker-compose.yaml    # Local preview in Docker
├── .devcontainer/                      # VS Code dev container (reuses docker-compose)
├── sw.js                               # Service worker (offline support, caching)
├── robots.txt                          # Crawler access control
├── _headers                            # Cloudflare Pages security headers
├── _redirects                          # Cloudflare Pages URL redirects
├── Gemfile / Gemfile.lock              # Ruby dependencies (lockfile committed for reproducible builds)
└── README.md                           # This file
```

## Content Management

### Data-Driven Updates (Recommended)

Most site content is controlled through YAML files in `_data/`. This modular approach makes updates simple and reduces errors.

#### 1. Managing Research Papers
Edit `_data/cv/papers.yml` to add or update papers:
- Title, status (Job Market Paper, Publication, Working Paper)
- Coauthors with URLs
- Badges (methodology tags like "Empirical Analysis")
- **Publication:** Full journal citation (for published papers)
- **Abstract:** Full abstract text (collapsible on homepage)
- **Submission:** Submission status (for working papers)
- **Highlights:** Optional awards or achievements
- Link text and URL (Request Draft, Journal Version, View Preprint)
- **`doi`** *(optional)*: e.g. `"10.1016/j.bushor.2024.09.003"`. The Cite button then shows the publisher's BibTeX, and the JSON-LD links the DOI.
- **`author_position`** *(optional)*: your place in the author list (default `1`), used only for BibTeX generated for papers without a DOI
- **`date_published`** *(optional)*: ISO date or year (e.g., `"2025"` or `"2025-09"`), used for `ScholarlyArticle` JSON-LD `datePublished`
- **`journal_name`** *(optional)*: clean journal name (e.g., `"Business Horizons"`), used for `ScholarlyArticle` JSON-LD `isPartOf`

The homepage generates paper cards with collapsible abstracts and a Cite button, and the CV lists papers by `cv_category`. Papers with a real `http(s)` link also emit a `ScholarlyArticle` JSON-LD entry on the homepage; papers with `mailto:` placeholders are skipped from structured data.

#### Citations (Cite button)
You never write BibTeX by hand:
- **Papers with a `doi`:** after you push, the *Update Talk Locations and Citations* workflow requests BibTeX from `https://doi.org/<doi>` (content negotiation, `Accept: application/x-bibtex`), which returns the metadata the publisher registered with Crossref or DataCite. It tidies the entry (one field per line, `--` page ranges, preprints as `@misc`) and caches it in `_data/citations.yml`.
- **Papers without a DOI:** an `@unpublished` entry is generated from the title, coauthors and status (`_includes/paper-bibtex.html`). Use `author_position` if you are not the first author.
- To correct an entry, edit it in `_data/citations.yml`; the workflow never overwrites existing entries. Delete an entry to have it fetched again (for example, after a preprint gets a new version DOI).

#### 2. Adding Research Updates
Edit `_data/activity.yml` to add paper submissions, conference presentations, publications and other milestones. Each entry has a date (e.g., `"July 2026"`), text, and an optional link. New items go at the top. They appear on the homepage and in the Atom feed automatically.

#### 3. Updating Your Status
Edit `_data/status.yml` to update:
- Current location
- Books you're reading (up to 2)
- Off-duty activities (gaming, watching, etc.)

The "Updated:" date (`_data/last_updated.yml`) is set automatically by GitHub Actions.

#### 4. Managing the CV
The CV is modularized in `_data/cv/`. Update specific files to change sections:
- **`education.yml`**: Degrees, universities, logos, and years
- **`appointments.yml`**: Academic appointments
- **`industry.yml`**: Professional roles, companies, and descriptions
- **`skills.yml`**: Skills, languages, and qualifications
- **`awards.yml`**: Honors and awards
- **`service.yml`**: Academic service roles
- **`presentations.yml`**: Conference presentations (also feed the talks map)
- **`references.yml`**: Academic references and contact info

Teaching experience is managed separately in `_data/cv/teaching.yml` (shared by the CV and Teaching pages).

**Automatic PDF Generation:** When you push changes to any CV data file, a GitHub Action rebuilds the downloadable PDF. No manual export needed.

#### Talks Map
Add talks to `_data/cv/presentations.yml` exactly as before; only the city is needed:
```yaml
- event: "INFORMS Annual Meeting (Scheduled)"
  location: "San Francisco, CA"
  year: "2026"
```
- After you push, the *Update Talk Locations and Citations* workflow geocodes any new city with [OpenStreetMap Nominatim](https://nominatim.org/) (at most one request per second, as its [usage policy](https://operations.osmfoundation.org/policies/nominatim/) requires) and caches the result in `_data/talk_locations.yml`.
- Put "(Scheduled)" in the event name to show a talk as upcoming.
- US talks are drawn on the main map and European talks in the inset. Talks elsewhere still appear in the CV but are not plotted.
- If a city is placed wrongly, edit its line in `_data/talk_locations.yml`; the workflow never overwrites existing entries.
- The home marker is set once in `_config.yml` under `talkmap_home`.

#### 5. Managing the Library
Edit `_data/library.yml` to manage your book collections:
```yaml
- shelf: "Formation"
  books:
    - title: "The Problem of Pain"
      author: "C.S. Lewis"
      meta: "THEOLOGY"
      comment: "Lewis tackles the hardest problem of faith..."
```

#### 6. Profile Links
Profile URLs live under `social:` in `_config.yml`; icons live in `_data/ui/social.yml`. A link appears in the sidebar when both exist. Icons are inline SVG paths (Bootstrap Icons on a 16x16 grid; ORCID from Simple Icons on a 24x24 grid, set with `viewbox`).

#### 7. Switching University Color Theme
Edit `_config.yml` and change the `color_theme` value:
```yaml
color_theme: iese    # or ucla, harvard, stanford, etc.
```
See [`_data/theme/README.md`](_data/theme/README.md) for the full visual gallery of all 30 available themes with color swatches and brand references. The favicon PNGs regenerate automatically.

## Design System

The site uses a design system defined in `assets/css/style.scss`:

### CSS Custom Properties
- **Color Palette:** background, text hierarchy and border tokens, plus university-branded accents injected from `_data/theme/themes.yml`
- **Spacing Scale:** 4px grid (`--space-1` through `--space-24`)
- **Typography Scale:** `--text-sm` through `--text-6xl`
- **Font Families:** `--font-body` (Atkinson Hyperlegible) and `--font-heading` (Merriweather); change fonts site-wide by editing two variables
- **Line Heights:** tight, snug, normal, relaxed

### Dark Mode
- Complete theme switch via the `[data-theme="dark"]` attribute
- All color tokens are redefined for dark mode, including the theme accents
- Persisted in localStorage with flash prevention

### Components
- Sidebar navigation (sticky on desktop, collapsible on mobile)
- Research paper cards with status badges, abstracts and BibTeX
- Book list grouped by shelf
- CV sections with institutional logos
- Accessible modal dialogs (family photos, talks map)
- Theme toggle button

## JavaScript Features

All JavaScript is vanilla and lives in `assets/js/main.js` (about 1,100 lines). The file is Liquid-processed at build time so it can read `_config.yml` and `_data/`, then served as one cached file:

1. **Mobile Navigation:** Auto-scroll to main content on mobile
2. **Profile Picture Spin:** 3.2s animation on click
3. **Family Photo Modal:** Accessible lightbox with keyboard navigation, focus trap and ARIA labels
4. **Talks Map:** Lazy-loaded SVG map with paper filter, tooltips, focus trap and keyboard support
5. **Dark Mode Toggle:** Theme switching with localStorage
6. **Liturgical Calendar:** Saint of the day in the footer (hover on desktop, tap on mobile)
7. **Mobile Scroll Guard:** Scrolls to the top on refresh on mobile
8. **Carbon Footprint Badge:** Website Carbon API with caching and fallback values
9. **Paper Abstract Toggles:** Delegated event listener with `aria-expanded` state management
10. **Cite / Copy BibTeX:** Toggles the BibTeX block and copies it to the clipboard
11. **Scroll Reveal:** Fade or slide animations, configurable in `_config.yml`
12. **Service Worker Registration:** Offline support and asset caching

## Local Development

This site uses Jekyll and is deployed via Cloudflare Pages. There are two ways to preview it locally.

### Option A: Docker (no Ruby install needed)
Requires [Docker](https://www.docker.com/).
```bash
git clone https://github.com/martins73/research-site.git
cd research-site
docker compose up
```
Then open `http://localhost:4000`. Edits to content and data files rebuild the site and reload the page automatically. Rebuild the image (`docker compose up --build`) after changing `Gemfile.lock`.

In **VS Code**, the same setup is available as a dev container: run *Dev Containers: Reopen in Container*.

### Option B: Ruby
Requires Ruby 3.3 and Bundler (the same versions CI uses).
```bash
git clone https://github.com/martins73/research-site.git
cd research-site
bundle install
bundle exec jekyll serve
```
Then open `http://localhost:4000`.

### Building the CV PDF locally
The PDF header includes a phone number and office address that are not stored in the repository. To include them in a local build, create `_config.cv-private.yml` (already git-ignored):
```yaml
cv_private:
  phone: "+1 ..."
  address: "..."
```
Then build with `bundle exec jekyll build --config _config.yml,_config.cv-private.yml` and run `node .github/scripts/generate-cv-pdf.js` (requires `npm install puppeteer pdf-lib`).

## Automation

### GitHub Actions

#### Build (`build.yml`)
- Triggers on every pull request and on pushes to `main`
- Runs `bundle exec jekyll build` with `JEKYLL_ENV=production` to catch Liquid template errors, YAML parse errors and missing includes before they reach production
- Uses Ruby 3.3 with `bundler-cache` to match the CV PDF workflow

#### CV PDF Generation (`generate-cv-pdf.yml`)
- Triggers on push to `_data/cv/`, `_config.yml`, `_pages/cv-pdf-source.html` or `_layouts/cv-pdf-source.html`, or manually via `workflow_dispatch`
- Writes the phone number and office address from the repository secrets **`CV_PHONE`** and **`CV_ADDRESS`** into a temporary config file, builds the site, then uses Puppeteer to render `cv-pdf-source.html` to PDF
- Commits the generated PDF to `assets/martin-gonzalez-cabello-cv.pdf`
- If either secret is missing, the run shows a warning and the PDF omits that line

**One-time setup:** in GitHub, open *Settings → Secrets and variables → Actions → New repository secret* and add `CV_PHONE` and `CV_ADDRESS`.

#### Talk Locations and Citations (`enrich-cv-data.yml`)
- Triggers on push to `_data/cv/presentations.yml` or `_data/cv/papers.yml`, or manually via `workflow_dispatch`
- Geocodes new talk cities into `_data/talk_locations.yml` and fetches BibTeX for new DOIs into `_data/citations.yml`
- Only new entries are looked up; existing entries are never overwritten
- Commits the updated files (pulling first, since the CV PDF workflow may push on the same change)

#### Favicon Generation (`generate-favicons.yml`)
- Triggers on push to `_config.yml` or `_data/theme/themes.yml`, or manually via `workflow_dispatch`
- Reads the active `color_theme` from `_config.yml` and looks up its accent color in the theme data
- Uses Python (Pillow) to generate 192px and 512px PNG favicons with the author's initials (MGC)
- Commits the generated PNGs to `assets/logos/favicon-192.png` and `assets/logos/favicon-512.png`

#### Status Date (`update-status-date.yml`)
- Triggers on push to `_data/status.yml`
- Updates the "Updated:" date in `_data/last_updated.yml` and commits it

## Privacy & Ethics

### robots.txt
- **Blocked (AI training):** ClaudeBot (plus the legacy `anthropic-ai` and `Claude-Web` tokens), GPTBot, Google-Extended, Applebot-Extended, Meta, CCBot, Bytespider, Amazonbot, Diffbot, Omgilibot, Timpibot, cohere-ai, ImagesiftBot
- **Allowed (AI search and user-initiated fetches):** OAI-SearchBot and ChatGPT-User ([OpenAI](https://developers.openai.com/api/docs/bots)), Claude-SearchBot and Claude-User ([Anthropic](https://support.claude.com/en/articles/8896518)), PerplexityBot and Perplexity-User ([Perplexity](https://docs.perplexity.ai/guides/bots))
- **Allowed:** all search engines (Google, Bing, etc.)
- **Note:** `Google-Extended` covers both Gemini training and grounding in Gemini Apps, but does not affect Google Search ([Google](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)). Remove its block if you want Gemini to cite the site live.

### Analytics
- Google Analytics 4. GA4 does not log or store IP addresses ([Google Analytics Help](https://support.google.com/analytics/answer/2763052)).

### CV Contact Details
- The phone number and office address appear only in the generated PDF. They are stored as repository secrets, not in `_config.yml`.

## Architecture Notes

### Why Data-Driven?

This site minimizes hard-coded HTML. Instead, it treats content as data stored in `_data/`.

**Benefits:**
- **Single Source of Truth:** Update your CV (Education, Industry, Skills), Library, or Status in one place. Changes propagate automatically to every page that uses that data.
- **Modular Architecture:** The CV is split into logical components (`cv/education.yml`, `cv/industry.yml`), making it easy to rearrange or hide sections without touching the layout.
- **Consistency:** Structured data guarantees that dates, locations, and titles follow the same format across the entire site.
- **Automation over Data Entry:** Derived data (coordinates, BibTeX, favicons, PDF, timestamps) is generated by GitHub Actions, so you only edit what you know.
- **Maintenance:** You can edit the site content from a mobile phone (via GitHub mobile) just by editing text files.

**Example:** The CV page is generated dynamically by stitching together multiple data files. All institution-anchored sections use a unified vocabulary (`institution`, `institution_url`, `logo`, `location`, `dates`):

```liquid
{% for item in site.data.cv.education %}
  <div class="cv-item">
    <h3>{{ item.institution }}</h3>
    <p>{{ item.degree }} ({{ item.dates }})</p>
  </div>
{% endfor %}

{% for company in site.data.cv.industry %}
  <div class="cv-item">
    <h3>{{ company.institution }}</h3>
    {% for position in company.positions %}
      <p>{{ position.role }} ({{ position.dates }})</p>
    {% endfor %}
  </div>
{% endfor %}
```

This ensures that all pages are always in sync with your source data.

## License

The code in this repository is licensed under the MIT License.

All site content, including text, images, PDFs, and data files, is &copy; 2026 Martin Gonzalez Cabello. All rights reserved unless otherwise stated.
