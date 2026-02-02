# Martin Gonzalez Cabello | Academic Website

This is the source code for my personal academic website, hosted at [martin.gonzalezcabello.com](https://martin.gonzalezcabello.com).

I use this platform to share my research on the **Human Supply Chain of AI**, **Crowdwork Platforms**, and **Algorithmic Fairness**.

## Tech Stack
* **Static Site Generator:** Jekyll (GitHub Pages)
* **Styling:** Handcrafted CSS3 with custom design system
* **Templating:** Liquid templates with data-driven content
* **Hosting:** GitHub Pages with Cloudflare CDN
* **Analytics:** Google Analytics 4 (GA4)

## Key Features

### 🎨 Design & UX
* **Responsive Design:** Mobile-first approach with optimized layouts for all screen sizes
* **Dark Mode:** User-togglable theme with localStorage persistence and flash prevention
* **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation, and focus management
* **Custom Typography:** Merriweather (serif) for headings, Atkinson Hyperlegible (sans-serif) for body text

### 🌱 Sustainable & Performance-Focused
* **Optimized Assets:** Profile and social images use WebP format for maximum compression
* **Zero Dependencies:** No JavaScript frameworks or heavy libraries
* **Minimal JavaScript:** ~315 lines of vanilla JS for interactivity
* **Fast Loading:** Optimized CSS with design tokens and efficient selectors

### 🛡️ Privacy & Security
* **Robots.txt:** Blocks unauthorized scraping by AI training bots (GPTBot, CCBot, etc.)
* **Privacy-First Analytics:** Configured to respect user privacy
* **Structured Data:** Schema.org markup for better SEO and discoverability
* **Open Graph & Meta Tags:** Optimized social media previews

### 📊 Data-Driven Content
All dynamic content is managed through YAML files in `_data/`, making updates simple and centralized:
* **Research Papers:** Complete paper metadata with abstracts, coauthors, and links
* **Activity Feed:** Recent publications, presentations, and research updates
* **Teaching Experience:** Course history with student counts and institutions
* **Status/Now:** Current location, reading list, and activities
* **Family Information:** Photo gallery data
* **Navigation:** Site navigation structure
* **Saints Calendar:** Liturgical calendar for footer feature

## Project Structure

```
research-site/
├── _config.yml              # Jekyll configuration and site settings
│
├── _data/                   # YAML data files (single source of truth)
│   ├── papers.yml           # Research papers with abstracts and metadata
│   ├── activity.yml         # Recent activity feed (papers, talks, etc.)
│   ├── teaching.yml         # Teaching experience with course details
│   ├── status.yml           # Current status (location, reading, activities)
│   ├── family.yml           # Family member information for photo modal
│   ├── navigation.yml       # Main navigation menu structure
│   └── saints.yml           # Complete liturgical calendar (365+ days)
│
├── _includes/               # Reusable HTML components
│   ├── head.html            # Meta tags, SEO, analytics, theme scripts
│   ├── sidebar.html         # Navigation, profile pic, social links
│   ├── footer.html          # Copyright, credits, saint-of-the-day
│   ├── scripts.html         # ~315 lines vanilla JS (mobile nav, dark mode, etc.)
│   └── family-modal.html    # Accessible image modal dialog
│
├── _layouts/                # Page templates
│   └── default.html         # Main layout (sidebar + content container)
│
├── _drafts/                 # Draft content (not published)
│   └── research-notes/      # Research note-taking system
│       ├── README.md        # Documentation for research notes
│       ├── TEMPLATE.md      # Template for new research notes
│       └── ideas.md         # Research ideas and brainstorming
│
├── .github/workflows/       # GitHub Actions automation
│   └── update-status-date.yml  # Auto-updates status.yml timestamp on push
│
├── assets/                  # Static files
│   ├── css/
│   │   └── style.css        # Complete design system (~3000+ lines)
│   ├── logos/               # Institution and company logos (12 PNG + 1 SVG)
│   │   ├── ucla.png, mit.png, iit.png, upm.png
│   │   ├── achs.png, dec.png, telefonica.png
│   │   ├── thinkids.png, oliver.png
│   │   ├── claude.png, gemini.png
│   │   └── favicon.svg
│   ├── family/              # Family member photos (6 images)
│   │   ├── family.jpg, andrea.jpg, carlota.jpg
│   │   └── martin.jpg, joaquin.jpg, juanpablo.jpg
│   ├── profile_picture.webp      # Profile image (WebP)
│   ├── social_preview.jpg        # Open Graph preview (JPEG for compatibility)
│   └── martin-gonzalez-cabello-cv.pdf
│
├── Content Pages
│   ├── index.html           # Homepage (about, research, activity, status)
│   ├── cv.html              # Curriculum Vitae (data-driven from teaching.yml)
│   ├── teaching.md          # Teaching philosophy + experience (data-driven)
│   ├── library.html         # Curated book library (4 shelves)
│   └── human-supply-chain.md # Research manifesto (intentionally unlisted)
│
├── Configuration Files
│   ├── robots.txt           # Bot access control (blocks AI scrapers)
│   ├── CNAME                # Custom domain configuration
│   ├── LICENSE              # MIT License
│   └── README.md            # This file
│
└── .git/                    # Version control
```

## Content Management

### Data-Driven Updates (Recommended)

Most site content is controlled through YAML files in `_data/`. This modular approach makes updates simple and reduces errors:

#### Updating Your Status
Edit `_data/status.yml` to update:
- Current location
- Books you're reading (up to 2)
- Off-duty activities (gaming, watching, etc.)
- Last updated date (auto-updated by GitHub Actions)

#### Adding Research Updates
Edit `_data/activity.yml` to add:
- Paper submissions
- Conference presentations
- Publications
- Other research milestones

Each entry includes date, text, and optional links.

#### Managing Teaching Experience
Edit `_data/teaching.yml` to add or update courses:
- Course title and year
- Role (e.g., Teaching Assistant)
- Institution and program
- Number of students

The CV and Teaching pages automatically pull from this file.

#### Managing Research Papers
Edit `_data/papers.yml` to add or update papers:
- Title, status (Job Market Paper, Publication, Working Paper)
- Coauthors with URLs
- Badges (methodology tags like "Empirical Analysis", "NK Modeling")
- **Publication:** Full journal citation (for published papers)
- **Submission:** Submission status (for working papers)
- **Highlights:** Optional awards or achievements
- Full abstract text
- Link text and URL (Request Draft, Journal Version, View Preprint)

The homepage automatically generates paper cards with collapsible abstracts from this file.

### Direct Page Editing

#### Managing the Reading List
Edit `library.html` to add or remove books from your curated shelves:
- The Human Supply Chain
- Formation
- Fun

Each book includes metadata, title, author, and a personal comment.

#### Managing the Reading List
Edit `library.html` to add or remove books from your curated shelves:
- The Human Supply Chain
- Formation
- Fun

Each book includes metadata, title, author, and a personal comment.

## Design Philosophy

This website follows a **digital minimalism** approach:
- Clean, distraction-free reading experience
- Thoughtful typography and spacing
- Respect for user preferences (dark mode, reduced motion support)
- Fast, accessible, and sustainable by design
- Data-driven content management for easy updates

## Design System

The site uses a comprehensive design system defined in `/assets/css/style.css`:

### CSS Custom Properties
- **Color Palette:** 6+ background colors, 6+ text hierarchy levels
- **Spacing Scale:** 4px grid system (space-1 through space-24)
- **Typography Scale:** text-xs through text-6xl
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

The site uses vanilla JavaScript (~315 lines in `_includes/scripts.html`) for:

1. **Mobile Navigation** - Auto-scroll to main content on mobile
2. **Profile Picture Spin** - 3.2s animation on click
3. **Family Photo Modal** - Accessible lightbox with:
   - Keyboard navigation (Enter/Space to open, Escape to close)
   - Focus trap and ARIA labels
   - Image + caption display
4. **Dark Mode Toggle** - Theme switching with localStorage
5. **Liturgical Calendar** - Saint-of-the-day in footer on hover
6. **Web Vitals Monitoring** - Tracks LCP, FID/INP, CLS metrics sent to GA4
7. **Mobile Scroll Guard** - Disables browser scroll restoration on mobile

## Local Development

This site uses Jekyll, which is automatically processed by GitHub Pages.

### Prerequisites
* Ruby 2.7+ and Bundler (for local development)
* Or just use GitHub Pages to build automatically

### Option 1: Local Jekyll Server (Recommended)

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

### Option 2: Simple HTTP Server (Limited)

If you don't want to install Jekyll locally, you can use a basic HTTP server, but note that Jekyll features (layouts, includes, data files) won't work:

```bash
python3 -m http.server
```

## Privacy & Ethics

This site respects user privacy and blocks AI training scrapers:

### robots.txt Configuration
- **Blocked:** GPTBot, ChatGPT-User, CCBot, Google-Extended, Anthropic-AI, Claude-Web
- **Allowed:** Google, Bing (for legitimate SEO)

### Analytics
- Privacy-first Google Analytics 4 configuration
- Web Vitals performance monitoring

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

This site emphasizes **data-driven content management** through YAML files:

**Benefits:**
- **Single Source of Truth:** Update teaching experience in one place (`teaching.yml`), reflected on both CV and Teaching pages
- **Consistency:** Structured data ensures consistent formatting across pages
- **Maintainability:** Easier to update content without touching HTML/Liquid templates
- **Separation of Concerns:** Content editors don't need to know HTML

**Example:** The teaching section on `cv.html` uses:
```liquid
{% for course in site.data.teaching.courses %}
  {% if course.institution contains "UCLA Anderson" %}
    <li><strong>{{ course.title }}</strong> ({{ course.level }})</li>
  {% endif %}
{% endfor %}
```

This pulls directly from `_data/teaching.yml`, ensuring the CV always stays up-to-date with the latest course information.
