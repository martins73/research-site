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
* **Optimized Assets:** All images use WebP format for maximum compression
* **Zero Dependencies:** No JavaScript frameworks or heavy libraries
* **Minimal JavaScript:** ~300 lines of vanilla JS for interactivity
* **Fast Loading:** Optimized CSS with design tokens and efficient selectors

### 🛡️ Privacy & Security
* **Robots.txt:** Blocks unauthorized scraping by AI training bots (GPTBot, CCBot, etc.)
* **Privacy-First Analytics:** Configured to respect user privacy
* **Structured Data:** Schema.org markup for better SEO and discoverability
* **Open Graph & Meta Tags:** Optimized social media previews

### 📊 Data-Driven Content
* **Jekyll Data Files:** Dynamic content managed through YAML files in `_data/`
* **Activity Feed:** Automated timestamp updates via GitHub Actions
* **Reading List:** Curated bookshelf organized by research themes

## Project Structure

```
research-site/
├── _config.yml         # Jekyll configuration and site settings
├── _data/              # YAML data files for dynamic content
│   ├── activity.yml    # Recent activity feed
│   ├── family.yml      # Family member information
│   └── status.yml      # Current status (location, reading, etc.)
├── _includes/          # Reusable components
│   └── footer.html
├── _layouts/           # Page templates
│   └── default.html
├── assets/
│   ├── css/            # Stylesheets with design system
│   ├── logos/          # Institution and company logos
│   └── *.webp          # Optimized images
├── index.html          # Homepage
├── cv.html             # Curriculum Vitae
├── teaching.html       # Teaching philosophy & experience
├── library.html        # Reading list & book recommendations
└── robots.txt          # Bot access control and privacy
```

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

## Content Management

### Updating Your Status
Edit `_data/status.yml` to update your current location, reading list, and activities.

### Adding Research Papers
Update the research cards in `index.html` with your latest publications and working papers.

### Managing the Reading List
Edit `library.html` to add or remove books from your curated shelves.

### Activity Feed
The activity feed in `_data/activity.yml` automatically timestamps updates via GitHub Actions.

## Design Philosophy

This website follows a **digital minimalism** approach:
- Clean, distraction-free reading experience
- Thoughtful typography and spacing
- Respect for user preferences (dark mode, reduced motion)
- Fast, accessible, and sustainable by design

## License

The code in this repository is licensed under the MIT License.

All site content, including text, images, PDFs, and data files, is © 2026 Martín González Cabello. All rights reserved unless otherwise stated.
