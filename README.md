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

### 🎨 Design & UX
* **Responsive Design:** Mobile-first approach with optimized layouts for all screen sizes
* **Dark Mode:** User-togglable theme with localStorage persistence and flash prevention
* **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation, and focus management
* **Custom Typography:** Merriweather (serif) for headings, Atkinson Hyperlegible (sans-serif) for body text — centralized via `--font-heading` and `--font-body` CSS custom properties

### 🌱 Sustainable & Performance-Focused
* **Optimized Assets:** All images converted to WebP; logos resized to display dimensions
* **Lazy Loading:** Below-fold images use `loading="lazy"` to defer network requests
* **Service Worker:** Offline-capable with pre-caching, stale-while-revalidate for static assets, and network-first for HTML
* **CSS Minification:** Jekyll Sass pipeline compresses CSS in production
* **Reduced Motion:** Respects `prefers-reduced-motion` to disable animations
* **Carbon Footprint Badge:** Tracks and displays per-page CO2 emissions via Website Carbon API
* **Portable Asset Paths:** All internal URLs use Jekyll's `relative_url` filter for baseurl-safe deployment
* **Zero Dependencies:** No JavaScript frameworks or heavy libraries
* **Minimal JavaScript:** ~440 lines of vanilla JS for interactivity

### 🛡️ Privacy & Security
* **Robots.txt:** Blocks unauthorized scraping by AI training bots (GPTBot, CCBot, etc.)
* **Link Hardening:** All `target="_blank"` links include `rel="noopener"` to prevent tabnabbing
* **Privacy-First Analytics:** Configured to respect user privacy
* **Structured Data:** Schema.org markup for better SEO and discoverability
* **Open Graph & Meta Tags:** Optimized social media previews

### 📊 Data-Driven Content
All dynamic content is managed through YAML files in `_data/`, making updates simple and centralized:
* **Navigation:** Site navigation structure
* **Research Papers:** Complete paper metadata with abstracts, coauthors, and links
* **CV Sections:** Education, Industry, and Additional Info are modularized
* **Activity Feed:** Recent publications, presentations, and research updates
* **Teaching Experience:** Course history with student counts and institutions
* **Status/Now:** Current location, reading list, and activities
* **Library:** Curated book lists with personalized commentary
* **Family Information:** Photo gallery data for easter egg
* **Saints Calendar:** Liturgical calendar for footer easter egg

## Project Structure

```
research-site/
├── _config.yml                 # Jekyll configuration and site settings
│
├── _data/                      # YAML data files (single source of truth)
│   ├── papers.yml              # Research papers with abstracts and metadata
│   ├── activity.yml            # Recent activity feed (papers, talks, etc.)
│   ├── teaching.yml            # Teaching experience (feeds CV & Teaching page)
│   ├── status.yml              # Current status (location, reading, activities)
│   │
│   ├── cv/                     # Modularized CV Data
│   │   ├── education.yml       # Degrees and institutions
│   │   ├── awards.yml          # Honors & Awards
│   │   ├── service.yml         # Academic Service
│   │   ├── presentations.yml   # Selected Presentations
│   │   ├── industry.yml        # Professional experience
│   │   ├── skills.yml          # Skills & Qualifications
│   │   └── references.yml      # References contact info
│   │
│   ├── ui/                     # UI Elements
│   │   ├── navigation.yml      # Main navigation menu structure
│   │   └── social.yml          # Social links and logos (for sidebar)
│   │
│   ├── library.yml             # Bookshelf data (The Human Supply Chain, Formation, Fun)
│   │
│   └── easter_eggs/            # Hidden features & Personal touches
│       ├── family.yml          # Family member information for photo modal
│       └── saints.yml          # Complete liturgical calendar (365+ days)
│
├── _includes/                  # Reusable HTML components
│   ├── head.html               # Meta tags, SEO, analytics, theme scripts
│   ├── sidebar.html            # Navigation, profile pic, social links
│   ├── footer.html             # Copyright, credits, carbon badge, saint-of-the-day
│   ├── scripts.html            # ~440 lines vanilla JS (mobile nav, dark mode, etc.)
│   └── family-modal.html       # Accessible image modal dialog
│
├── _layouts/                   # Page templates
│   └── default.html            # Main layout (sidebar + content container)
│
├── _drafts/                    # Draft content (not published)
│   └── research-notes/         # Research note-taking system
│
├── .github/workflows/          # GitHub Actions automation
│   └── update-status-date.yml  # Auto-updates status.yml timestamp on push
│
├── sw.js                        # Service worker (offline support, caching)
│
├── assets/                      # Static files
│   ├── css/
│   │   └── style.scss           # Design system (~1820 lines SCSS, minified on build)
│   ├── fonts/                   # Self-hosted web fonts (woff2)
│   ├── logos/                   # Institution and company logos (PNG/SVG)
│   ├── family/                  # Family photos (WebP)
│   ├── profile_picture.webp     # Profile image (WebP)
│   └── martin-gonzalez-cabello-cv.pdf
│
├── Content Pages
│   ├── index.html               # Homepage (about, research, activity, status)
│   ├── cv.html                  # Curriculum Vitae (fully data-driven)
│   ├── teaching.md              # Teaching philosophy + experience (data-driven)
│   ├── library.html             # Curated book library (data-driven)
│   └── human-supply-chain.md    # Research manifesto
│
├── Configuration Files
│   ├── robots.txt              # Bot access control
│   └── README.md               # This file
│
└── .git/                       # Version control
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
- Full abstract text
- Link text and URL (Request Draft, Journal Version, View Preprint)

The CV and Teaching pages automatically pull from this file.

The homepage automatically generates paper cards with collapsible abstracts from this file.

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
- **`education.yml`**: Degrees, universities, logos, and years.
- **`industry.yml`**: Professional roles, companies, and descriptions.
- **`skills.yml`**: Skills, languages, and qualifications.
- **`awards.yml`**: Honors and awards.
- **`service.yml`**: Academic service roles.
- **`presentations.yml`**: Selected conference presentations.
- **`references.yml`**: Academic references and contact info.

Teaching experience is managed separately in `_data/teaching.yml` (shared by the CV and Teaching pages).

#### 5. Managing the Library
Edit `_data/library.yml` to manage your book collections. The file is structured by "shelves" (e.g., "The Human Supply Chain", "Formation"):
```yaml
- shelf: "Formation"
  books:
    - title: "The Problem of Pain"
      author: "C.S. Lewis"
      meta: "THEOLOGY"
      comment: "Lewis tackles the hardest problem of faith..."
```

## Design Philosophy

This website follows a **digital minimalism** approach:
- Clean, distraction-free reading experience
- Thoughtful typography and spacing
- Respect for user preferences (dark mode, reduced motion support)
- Fast, accessible, and sustainable by design
- Data-driven content management for easy updates

## Design System

The site uses a comprehensive design system defined in `/assets/css/style.scss`:

### CSS Custom Properties
- **Color Palette:** 6+ background colors, 6+ text hierarchy levels
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

The site uses vanilla JavaScript (~440 lines in `_includes/scripts.html`) for:

1. **Mobile Navigation** - Auto-scroll to main content on mobile
2. **Profile Picture Spin** - 3.2s animation on click
3. **Family Photo Modal** - Accessible lightbox with:
   - Keyboard navigation (Enter/Space to open, Escape to close)
   - Focus trap and ARIA labels
   - Image + caption display
4. **Dark Mode Toggle** - Theme switching with localStorage
5. **Liturgical Calendar** - Saint-of-the-day in footer (hover on desktop, tap on mobile)
6. **Carbon Footprint Badge** - Website Carbon API with caching and fallback values
7. **Mobile Scroll Guard** - Disables browser scroll restoration on mobile
8. **Paper Abstract Toggles** - Delegated event listener with ARIA-expanded state management
9. **Service Worker Registration** - Offline support and asset caching

## Local Development

This site uses Jekyll, deployed via Cloudflare Pages.

### Prerequisites
* Ruby 2.7+ and Bundler (for local development)

### Local Development

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

## Privacy & Ethics

This site respects user privacy and blocks AI training scrapers:

### robots.txt Configuration
- **Blocked:** GPTBot, ChatGPT-User, CCBot, AnthropicAI
- **Allowed:** Google, Bing (for legitimate SEO)

### Analytics
- Privacy-first Google Analytics 4 configuration

## Automation

### GitHub Actions
`.github/workflows/update-status-date.yml` automatically:
- Triggers on push to `_data/status.yml`
- Updates the "Updated:" date field with the current date
- Commits and pushes changes

## License

The code in this repository is licensed under the MIT License.

All site content, including text, images, PDFs, and data files, is © 2026 Martín González Cabello. All rights reserved unless otherwise stated.

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
