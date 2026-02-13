# Martin Gonzalez Cabello | Academic Website

This is the source code for my personal academic website, hosted at [martin.gonzalezcabello.com](https://martin.gonzalezcabello.com).

I use this platform to share my research on the **Human Supply Chain of AI**, **Crowdwork Platforms**, and **Algorithmic Fairness**.

## Tech Stack
* **Static Site Generator:** Jekyll
* **Styling:** Handcrafted SCSS with custom design system (compiled & minified by Jekyll)
* **Templating:** Liquid templates with data-driven content
* **Hosting:** Cloudflare Pages
* **Analytics:** Google Analytics 4 (GA4)

## Key Features

### Design & UX
* **Responsive Design:** Mobile-first approach with optimized layouts for all screen sizes
* **Dark Mode:** User-togglable theme with localStorage persistence and flash prevention
* **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation, and focus management
* **Custom Typography:** Merriweather (serif) for headings, Atkinson Hyperlegible (sans-serif) for body text — centralized via `--font-heading` and `--font-body` CSS custom properties
* **University Color Themes:** 29 preset color schemes derived from official university brand guidelines ([see full gallery](_data/theme/README.md))

### Sustainable & Performance-Focused
* **Optimized Assets:** All images converted to WebP; logos resized to display dimensions
* **Lazy Loading:** Below-fold images use `loading="lazy"` to defer network requests
* **Service Worker:** Offline-capable with pre-caching, stale-while-revalidate for static assets, and network-first for HTML
* **CSS Minification:** Jekyll Sass pipeline compresses CSS in production
* **Reduced Motion:** Respects `prefers-reduced-motion` to disable animations
* **Carbon Footprint Badge:** Tracks and displays per-page CO2 emissions via Website Carbon API
* **Portable Asset Paths:** All internal URLs use Jekyll's `relative_url` filter for baseurl-safe deployment
* **Zero Dependencies:** No JavaScript frameworks or heavy libraries
* **Minimal JavaScript:** ~664 lines of vanilla JS for interactivity

### Asset Optimization
Visual assets are processed to balance high-resolution display with fast load times:
* **Profile Picture:** Main headshot is a **1000x1000px** WebP. Maintain a **1:1 square ratio** to ensure the CSS circular masking aligns correctly.
* **Social Preview:** Uses a **1200x630px** JPG for platform compatibility. Maintain a **1.91:1 aspect ratio** to prevent unwanted cropping on WhatsApp or LinkedIn.
* **Logos:** Prefer **SVG** format for optimal scalability. If unavailable, use a **transparent PNG** with a minimum resolution of **60x60px**. Ensure all files utilize a **1:1 square aspect ratio** to maintain consistent alignment within the layout.
* **Tools:** Images are resized and converted to WebP via [Squoosh](https://squoosh.app); backgrounds are removed via [remove.bg](https://www.remove.bg).

### Privacy & Security
* **Robots.txt:** Blocks unauthorized scraping by AI training bots (GPTBot, CCBot, etc.)
* **Link Hardening:** All `target="_blank"` links include `rel="noopener"` to prevent tabnabbing
* **Privacy-First Analytics:** Configured to respect user privacy
* **Structured Data:** Schema.org markup for better SEO and discoverability
* **Open Graph & Meta Tags:** Optimized social media previews

### Data-Driven Content
All dynamic content is managed through YAML files in `_data/`, making updates simple and centralized:
* **Research Papers:** Complete paper metadata with abstracts, coauthors, and links
* **CV Sections:** Education, Industry, Skills, Awards, and more — modularized
* **Activity Feed:** Recent publications, presentations, and research updates
* **Teaching Experience:** Course history with student counts and institutions
* **Status/Now:** Current location, reading list, and activities
* **Library:** Curated book lists with personalized commentary

## Project Structure

```
research-site/
├── _config.yml                         # Jekyll configuration, site settings, color theme selector
│
├── _pages/                             # Content pages (Jekyll collection)
│   ├── cv.html                         # Curriculum Vitae (fully data-driven)
│   ├── cv-print.html                   # Print-optimized CV (used for PDF generation)
│   ├── teaching.md                     # Teaching philosophy + experience
│   ├── library.html                    # Curated book library
│   └── human-supply-chain.md           # Research manifesto
│
├── index.html                          # Homepage (about, research, activity, status)
│
├── _data/                              # YAML data files (single source of truth)
│   ├── papers.yml                      # Research papers with abstracts and metadata
│   ├── activity.yml                    # Recent activity feed (papers, talks, etc.)
│   ├── teaching.yml                    # Teaching experience (feeds CV & Teaching page)
│   ├── status.yml                      # Current status (location, reading, activities)
│   ├── last_updated.yml                # Auto-updated timestamp (set by GitHub Actions)
│   ├── library.yml                     # Bookshelf data (by shelf/category)
│   │
│   ├── theme/                          # Color Theme System
│   │   ├── themes.yml                  # 29 university color presets (light + dark mode)
│   │   └── README.md                   # Visual gallery of all themes with brand references
│   │
│   ├── cv/                             # Modularized CV Data
│   │   ├── education.yml               # Degrees and institutions
│   │   ├── appointments.yml            # Academic appointments
│   │   ├── industry.yml                # Professional experience (with locations)
│   │   ├── awards.yml                  # Honors & Awards
│   │   ├── service.yml                 # Academic service
│   │   ├── presentations.yml           # Selected presentations
│   │   ├── skills.yml                  # Skills & qualifications
│   │   ├── research_interests.yml      # Research interest keywords
│   │   └── references.yml              # References contact info
│   │
│   ├── ui/                             # UI Configuration
│   │   ├── navigation.yml              # Main navigation menu structure
│   │   └── social.yml                  # Social links and logos (for sidebar)
│   │
│   └── easter_eggs/                    # Hidden Features
│       ├── family.yml                  # Family member information for photo modal
│       └── saints.yml                  # Complete liturgical calendar (365+ days)
│
├── _includes/                          # Reusable HTML components
│   ├── head.html                       # Meta tags, SEO, analytics, theme scripts
│   ├── sidebar.html                    # Navigation, profile pic, social links
│   ├── footer.html                     # Copyright, credits, carbon badge, saint-of-the-day
│   ├── scripts.html                    # ~664 lines vanilla JS (mobile nav, dark mode, etc.)
│   ├── family-modal.html               # Accessible image modal dialog
│   ├── cv-coauthors.html               # Renders paper coauthors for CV
│   └── cv-institution-header.html      # CV institution header with logo and location
│
├── _layouts/                           # Page templates
│   ├── default.html                    # Main layout (sidebar + content container)
│   └── cv-print.html                   # Minimal layout for PDF generation
│
├── _drafts/                            # Draft content (not published)
│   └── research-notes/                 # Research note-taking system
│
├── assets/                             # Static files
│   ├── css/
│   │   └── style.scss                  # Design system (~1873 lines SCSS, minified on build)
│   ├── fonts/                          # Self-hosted web fonts (woff2)
│   ├── logos/                          # Institution and company logos (PNG/SVG)
│   ├── family/                         # Family photos (WebP)
│   ├── profile_picture.webp            # Profile image (WebP)
│   └── martin-gonzalez-cabello-cv.pdf  # Auto-generated from YAML data
│
├── .github/                            # GitHub Actions and automation
│   ├── workflows/
│   │   ├── update-status-date.yml      # Auto-updates status.yml timestamp
│   │   ├── generate-cv-pdf.yml         # Auto-generates CV PDF from data
│   │   └── generate-favicons.yml       # Auto-generates favicon PNGs from theme config
│   └── scripts/
│       ├── generate-cv-pdf.js          # Puppeteer script for PDF rendering
│       └── generate-favicons.py        # Python script for favicon generation
│
├── sw.js                               # Service worker (offline support, caching)
├── robots.txt                          # Bot access control
├── _redirects                          # Cloudflare Pages URL redirects
└── README.md                           # This file
```

## Content Management

### Data-Driven Updates (Recommended)

Most site content is controlled through YAML files in `_data/`. This modular approach makes updates simple and reduces errors:

#### 1. Managing Research Papers
Edit `_data/papers.yml` to add or update papers:
- Title, status (Job Market Paper, Publication, Working Paper)
- Coauthors with URLs
- Badges (methodology tags like "Empirical Analysis")
- **Publication:** Full journal citation (for published papers)
- **Abstract:** Full abstract text (collapsible on homepage)
- **Submission:** Submission status (for working papers)
- **Highlights:** Optional awards or achievements
- Link text and URL (Request Draft, Journal Version, View Preprint)

The CV and Teaching pages automatically pull from this file. The homepage automatically generates paper cards with collapsible abstracts.

#### 2. Adding Research Updates
Edit `_data/activity.yml` to add:
- Paper submissions
- Conference presentations
- Publications
- Other research milestones

Each entry includes date, text, and optional links.

#### 3. Updating Your Status
Edit `_data/status.yml` to update:
- Current location
- Books you're reading (up to 2)
- Off-duty activities (gaming, watching, etc.)
- Last updated date (auto-updated by GitHub Actions)

#### 4. Managing the CV
The CV is modularized in `_data/cv/`. Update specific files to change sections:
- **`education.yml`**: Degrees, universities, logos, and years
- **`appointments.yml`**: Academic appointments
- **`industry.yml`**: Professional roles, companies, and descriptions
- **`skills.yml`**: Skills, languages, and qualifications
- **`awards.yml`**: Honors and awards
- **`service.yml`**: Academic service roles
- **`presentations.yml`**: Selected conference presentations
- **`references.yml`**: Academic references and contact info

Teaching experience is managed separately in `_data/teaching.yml` (shared by the CV and Teaching pages).

**Automatic PDF Generation:** When you push changes to any CV data file, the GitHub Action automatically rebuilds the downloadable PDF. No manual export needed.

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

#### 6. Switching University Color Theme
Edit `_config.yml` and change the `color_theme` value:
```yaml
color_theme: iese    # or ucla, harvard, stanford, etc.
```
See [`_data/theme/README.md`](_data/theme/README.md) for the full visual gallery of all 29 available themes with color swatches and brand references.

## Design System

The site uses a comprehensive design system defined in `assets/css/style.scss`:

### CSS Custom Properties
- **Color Palette:** 6+ background colors, 6+ text hierarchy levels, university-branded accents
- **Spacing Scale:** 4px grid system (space-1 through space-24)
- **Typography Scale:** text-xs through text-6xl
- **Font Families:** `--font-body` (Atkinson Hyperlegible) and `--font-heading` (Merriweather) — change fonts site-wide by editing two variables
- **Line Heights:** tight, snug, normal, relaxed

### Dark Mode
- Complete theme switch via `[data-theme="dark"]` attribute
- All 50+ color variables have dark variants
- Persisted in localStorage with flash prevention

### Components
- Sidebar navigation (sticky on desktop, collapsible on mobile)
- Research paper cards with status badges
- Book grid layout (responsive 3-column)
- CV sections with institutional logos
- Accessible modal dialog for family photos
- Theme toggle button

## JavaScript Features

The site uses vanilla JavaScript (~664 lines in `_includes/scripts.html`) for:

1. **Mobile Navigation** - Auto-scroll to main content on mobile
2. **Profile Picture Spin** - 3.2s animation on click
3. **Family Photo Modal** - Accessible lightbox with keyboard navigation, focus trap, and ARIA labels
4. **Dark Mode Toggle** - Theme switching with localStorage
5. **Liturgical Calendar** - Saint-of-the-day in footer (hover on desktop, tap on mobile)
6. **Carbon Footprint Badge** - Website Carbon API with caching and fallback values
7. **Mobile Scroll Guard** - Disables browser scroll restoration on mobile
8. **Paper Abstract Toggles** - Delegated event listener with ARIA-expanded state management
9. **Service Worker Registration** - Offline support and asset caching

## Local Development

This site uses Jekyll, deployed via Cloudflare Pages.

### Prerequisites
* Ruby 2.7+ and Bundler

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/martins73/research-site.git
    cd research-site
    ```

2.  **Install dependencies:**
    ```bash
    bundle install
    ```

3.  **Run Jekyll locally:**
    ```bash
    bundle exec jekyll serve
    ```
    Then open `http://localhost:4000`

## Automation

### GitHub Actions

#### Status Date (`update-status-date.yml`)
- Triggers on push to `_data/status.yml`
- Updates the "Updated:" date field with the current date
- Commits and pushes changes

#### CV PDF Generation (`generate-cv-pdf.yml`)
- Triggers on push to `_data/cv/`, `_data/papers.yml`, `_data/teaching.yml`, `_config.yml`, `_pages/cv-print.html`, or `_layouts/cv-print.html`
- Builds the Jekyll site, then uses Puppeteer to render `cv-print.html` to PDF
- Commits the generated PDF to `assets/martin-gonzalez-cabello-cv.pdf`
- Can also be triggered manually via `workflow_dispatch`

#### Favicon Generation (`generate-favicons.yml`)
- Triggers on push to `_config.yml` or `_data/theme/themes.yml`
- Reads the active `color_theme` from `_config.yml` and looks up its accent color in the theme data
- Uses Python (Pillow) to generate 192px and 512px PNG favicons with the author's initials (MGC)
- Commits the generated PNGs to `assets/logos/favicon-192.png` and `assets/logos/favicon-512.png`
- Can also be triggered manually via `workflow_dispatch`

## Privacy & Ethics

This site respects user privacy and blocks AI training scrapers:

### robots.txt Configuration
- **Blocked:** GPTBot, ChatGPT-User, CCBot, AnthropicAI
- **Allowed:** Google, Bing (for legitimate SEO)

### Analytics
- Privacy-first Google Analytics 4 configuration

## Architecture Notes

### Why Data-Driven?

This site minimizes hard-coded HTML. Instead, it treats content as data stored in `_data/`.

**Benefits:**
- **Single Source of Truth:** Update your CV (Education, Industry, Skills), Library, or Status in one place. Changes propagate automatically to every page that uses that data.
- **Modular Architecture:** The CV is split into logical components (`cv/education.yml`, `cv/industry.yml`), making it easy to rearrange or hide sections without touching the layout.
- **Consistency:** Structured data guarantees that dates, locations, and titles follow the same format across the entire site.
- **Maintenance:** You can edit the site content from a mobile phone (via GitHub mobile) just by editing text files.

**Example:** The CV page is generated dynamically by stitching together multiple data files:

```liquid
{% for degree in site.data.cv.education %}
  <div class="cv-item">
    <h3>{{ degree.school }}</h3>
    <p>{{ degree.degree }} ({{ degree.year }})</p>
  </div>
{% endfor %}

{% for role in site.data.cv.industry %}
  <div class="cv-item">
    <h3>{{ role.company }}</h3>
    <p>{{ role.title }}</p>
  </div>
{% endfor %}
```

This ensures that all pages are always in sync with your source data.

## License

The code in this repository is licensed under the MIT License.

All site content, including text, images, PDFs, and data files, is &copy; 2026 Martin Gonzalez Cabello. All rights reserved unless otherwise stated.
