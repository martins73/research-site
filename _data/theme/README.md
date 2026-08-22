# University Color Themes

This file documents all 30 university color presets available in [`themes.yml`](themes.yml). Each theme provides accent colors for both **light** and **dark** modes, derived from each institution's official brand guidelines.

## How to Use

In `_config.yml`, set the `color_theme` key to any theme ID listed below:

```yaml
color_theme: iese    # or ucla, harvard, stanford, etc.
```

> **Note:** The key is `color_theme` (not `theme`), because `theme` is reserved by Jekyll for gem-based themes.

---

## Understanding Theme Colors

Each theme defines 11 color properties that control different aspects of your website's appearance. Here's what each color property does:

### How the Theme System Works

1. **Color Definition** (`themes.yml`): Contains 30 university theme presets with both light and dark mode variants
2. **Theme Selection** (`_config.yml`): Set your active theme via `color_theme: ucla`
3. **CSS Variable Injection** (`assets/css/style.scss`): Jekyll's Liquid templating reads the theme colors and injects them as CSS custom properties
4. **Usage**: All UI elements reference these colors using CSS variables like `var(--accent)`, `var(--bg-accent)`, etc.

### Color Properties & Their Effects

#### 1. **`accent`** - Primary Brand Color
**The workhorse of your theme** - used extensively throughout:
- **Buttons**: Primary action button backgrounds
- **Links**: All hyperlinks site-wide
- **Navigation**: Active page indicator text
- **Social Icons**: Hover effects on social media icons
- **Borders**: Pull quote borders, manifesto header border
- **Tags**: Paper status badges (e.g., "Working Paper", "Published")
- **Text Elements**: News links, saint-of-the-day text
- **Interactive Elements**: CV entry hover borders, abstract button text
- **Footer**: "AMDG" hover effect
- **Favicon**: Background color in your site icon

*Example: UCLA light uses `#2774AE` (official UCLA Blue), dark uses `#5090F7` (lighter for contrast)*

#### 2. **`accent_rgb`** - RGB Version of Accent
**For transparency effects** - the same color as `accent` but in RGB format:
- **Focus States**: Semi-transparent outline rings on interactive elements (uses `rgba(var(--accent-rgb), 0.2)`)
- **Shadows**: Soft shadows on buttons and cards with opacity
- **Accessibility**: Focus indicators for keyboard navigation

*Example: `"39, 116, 174"` for UCLA's blue*

#### 3. **`accent_hover`** - Darkened/Lightened Accent
**Interactive feedback** on hover:
- **Button Hovers**: Primary button hover state
- **Link Hovers**: Footer link hover effects

*In light mode: darker than accent. In dark mode: lighter than accent*

#### 4. **`accent_orange`** - Job Market Paper Highlight
**Special designation color** - intentionally consistent across all themes:
- **Job Market Paper Tag**: The prominent orange "Job Market Paper" badge on your research page
- **Paper Highlights**: Any emphasized paper markers

*Always `#B45309` in light mode, `#f59e0b` in dark mode - maintains visibility regardless of your chosen university theme*

#### 4b. **`accent_on_tint`** - Accent Text on Tinted Surfaces
**The accent shade that stays legible on `bg_accent` / `bg_accent_hover`**:
- **Active navigation button**: text of the current page's button
- **Outline button hover**, **abstract toggle button**

*Needed because a brand accent chosen to read on the page background is not
always readable on the tinted pill behind it. Derived from `accent` by shifting
lightness only, so the hue is preserved.*

#### 4c. **`on_accent`** - Text on the Solid Accent
**The text colour placed ON a filled accent surface**:
- **Primary button** ("Email Me"), **skip link**, **abstract button hover**, **modal close hover**

*In light mode this is white. In dark mode it is near-black (`#0F172A`): the dark
accent has to be light enough to read on the dark page, which leaves it too light
for white text on top. One accent value cannot serve both roles, so the text
colour flips instead.*

#### 5. **`bg_accent`** - Light Tinted Background
**Subtle colored backgrounds** (~5-10% opacity tint of your accent color):
- **Button States**: Outline button hover, active navigation button
- **Interactive Areas**: Theme toggle hover, abstract button backgrounds
- **Content Boxes**: Callout boxes (like "Looking Forward" on teaching page)
- **Card Hovers**: Paper card link hover backgrounds

*Creates a gentle wash of your brand color*

#### 6. **`bg_accent_hover`** - Darker Tinted Background
**Stronger tinted background** for deeper interaction states:
- **Active State Hovers**: When hovering over an already-active button
- **Layered Interactions**: Provides a second level of visual feedback

*Slightly more saturated than `bg_accent`*

#### 7. **`info_text`** - Badge Text Color
**Technology and method badges**:
- **Research Methods**: The pill-shaped badges on papers (e.g., "MTurk", "Regression Discontinuity", "Field Experiment")
- **Badge Hover**: Text color when hovering over technology badges

*Typically matches or complements your accent color*

#### 8. **`info_bg`** - Badge Background
**Badge pill backgrounds**:
- **Technology Tags**: Background for all the methodology and platform badges on your research papers
- Creates the colored pill effect with `info_text`

#### 9. **`info_bg_hover`** - Badge Hover Background
**Interactive badge feedback**:
- **Hover State**: Darker/lighter background when hovering over technology badges
- **Border Color**: Also used for active button borders

### Visual Hierarchy Summary

**High Impact (Most Visible)**:
- `accent` - Your primary brand color, used everywhere
- `accent_orange` - Job Market Paper designation (orange across all themes)

**Medium Impact (Supporting Colors)**:
- `bg_accent` - Subtle backgrounds for interactive elements
- `info_text` & `info_bg` - Research methodology badges

**Low Impact (Refinements)**:
- `accent_hover`, `bg_accent_hover`, `info_bg_hover` - Hover state variations
- `accent_rgb` - Transparency effects and focus states

### Example in Context

When someone views your research page with the **UCLA theme**:
- Paper titles are linked in **`accent`** blue (`#2774AE`)
- "Job Market Paper" tag is **`accent_orange`** amber (`#B45309`)
- Method badges like "MTurk" have **`info_bg`** background (`#e8f4fd`) with **`info_text`** text (`#23699D`)
- Clicking "Abstract" shows a button with **`bg_accent`** background (`#f0f9ff`)
- Hovering over links darkens them to **`accent_hover`** (`#1e5f8e`)

If they switch to dark mode, all these colors automatically transition to the dark mode variants!

---

## Theme Gallery

### US Universities

| Preview | Theme ID | Institution | Light Accent | Dark Accent | Brand Reference |
|:-------:|:---------|:------------|:-------------|:------------|:----------------|
| ![#2774AE](https://dummyimage.com/24x24/2774AE/2774AE.png) | `ucla` | UCLA | `#2774AE` | `#5090F7` | [UCLA Brand Guidelines](https://brand.ucla.edu/identity/colors) |
| ![#A41034](https://dummyimage.com/24x24/A41034/A41034.png) | `harvard` | Harvard University | `#A41034` | `#E36B7A` | [Harvard Identity](https://identity.hbs.edu/color/) |
| ![#750014](https://dummyimage.com/24x24/750014/750014.png) | `mit` | MIT | `#750014` | `#E36B7A` | [MIT Brand Colors](https://brand.mit.edu/color) |
| ![#8C1515](https://dummyimage.com/24x24/8C1515/8C1515.png) | `stanford` | Stanford University | `#8C1515` | `#DC7171` | [Stanford Identity](https://identity.stanford.edu/design-elements/color/) |
| ![#00356B](https://dummyimage.com/24x24/00356B/00356B.png) | `yale` | Yale University | `#00356B` | `#5495D6` | [Yale Identity](https://yaleidentity.yale.edu/colors) |
| ![#1D4F91](https://dummyimage.com/24x24/1D4F91/1D4F91.png) | `columbia` | Columbia University | `#1D4F91` | `#6294CE` | [Columbia Identity](https://visualidentity.columbia.edu/branding/color-palette) |
| ![#011F5B](https://dummyimage.com/24x24/011F5B/011F5B.png) | `wharton` | Wharton (UPenn) | `#011F5B` | `#6A92CF` | [Wharton School Colors](https://standards.wharton.upenn.edu/color/) |
| ![#800000](https://dummyimage.com/24x24/800000/800000.png) | `chicago_booth` | Chicago Booth | `#800000` | `#D97474` | [UChicago Maroon & White Guidelines](https://maroonandwhite.uchicago.edu/the-guidelines) |
| ![#4E2A84](https://dummyimage.com/24x24/4E2A84/4E2A84.png) | `kellogg` | Kellogg (Northwestern) | `#4E2A84` | `#9E84CA` | [Northwestern Brand](https://www.northwestern.edu/brand/visual-identity/color/) |
| ![#0C2340](https://dummyimage.com/24x24/0C2340/0C2340.png) | `notre_dame` | University of Notre Dame | `#0C2340` | `#6C94C1` | [Notre Dame Brand](https://onmessage.nd.edu/university-branding/colors/) |
| ![#00693E](https://dummyimage.com/24x24/00693E/00693E.png) | `dartmouth` | Dartmouth College | `#00693E` | `#33b878` | [Dartmouth Identity](https://brand.dartmouth.edu/visual-identity/colors) |
| ![#57068C](https://dummyimage.com/24x24/57068C/57068C.png) | `nyu` | NYU | `#57068C` | `#AE7CD9` | [NYU Identity](https://www.nyu.edu/employees/resources-and-services/media-and-communications/nyu-brand-guidelines/designing-in-the-nyu-brand/nyu-colors.html) |
| ![#B31B1B](https://dummyimage.com/24x24/B31B1B/B31B1B.png) | `cornell` | Cornell University | `#B31B1B` | `#DC7171` | [Cornell Brand](https://brand.cornell.edu/design-center/colors/) |
| ![#00274C](https://dummyimage.com/24x24/00274C/00274C.png) | `michigan` | University of Michigan | `#00274C` | `#5E95CB` | [Michigan Brand](https://brand.umich.edu/design-resources/colors/) |
| ![#BD5600](https://dummyimage.com/24x24/BD5600/BD5600.png) | `ut_austin` | UT Austin | `#BD5600` | `#e08840` | [UT Brand Colors](https://brand.utexas.edu/identity/color) |
| ![#002676](https://dummyimage.com/24x24/002676/002676.png) | `uc_berkeley` | UC Berkeley | `#002676` | `#6C91D9` | [Berkeley Brand](https://brand.berkeley.edu/colors/) |
| ![#012169](https://dummyimage.com/24x24/012169/012169.png) | `duke` | Duke University | `#012169` | `#7290D1` | [Duke Identity](https://brand.duke.edu/colors/) |
| ![#990000](https://dummyimage.com/24x24/990000/990000.png) | `usc` | USC | `#990000` | `#D97474` | [USC Brand](https://identity.usc.edu/identity/color/) |
| ![#CC0000](https://dummyimage.com/24x24/CC0000/CC0000.png) | `boston_university` | Boston University | `#CC0000` | `#F36060` | [BU Brand](https://www.bu.edu/brand/guidelines/design/colors/) |

### Catholic Universities

| Preview | Theme ID | Institution | Light Accent | Dark Accent | Brand Reference |
|:-------:|:---------|:------------|:-------------|:------------|:----------------|
| ![#B21F2C](https://dummyimage.com/24x24/B21F2C/B21F2C.png) | `catholic` | Catholic University of America | `#B21F2C` | `#D97474` | [CUA Identity](https://communications.catholic.edu/styleguide/identity-standards2.html) |
| ![#005794](https://dummyimage.com/24x24/005794/005794.png) | `thomas_aquinas` | Thomas Aquinas College | `#005794` | `#4a9ad4` | [TAC Website](https://thomasaquinas.edu) |
| ![#002B5C](https://dummyimage.com/24x24/002B5C/002B5C.png) | `ave_maria` | Ave Maria University | `#002B5C` | `#6C94C1` | [AMU Graphic Standards (PDF)](https://www.avemarialaw.edu/wp-content/uploads/2024/01/Ave-Maria-School-of-Law-Graphic-Standards-FINAL.pdf#page=25) |
| ![#21412a](https://dummyimage.com/24x24/21412a/21412a.png) | `franciscan` | Franciscan University | `#21412a` | `#5D9F6E` | [Franciscan Brand](https://www.franciscan.edu) |

### European Business Schools

| Preview | Theme ID | Institution | Light Accent | Dark Accent | Brand Reference |
|:-------:|:---------|:------------|:-------------|:------------|:----------------|
| ![#A31F34](https://dummyimage.com/24x24/A31F34/A31F34.png) | `iese` | IESE Business School | `#A31F34` | `#E36B7A` | [IESE Visual Identity](https://www.iese.edu) |
| ![#EB0000](https://dummyimage.com/24x24/EB0000/EB0000.png) | `iese_web` | IESE Business School (Website Red) | `#EB0000` | `#F36060` | [IESE Website Logo (Red)](https://www.iese.edu/wp-content/themes/iese/public/assets/images/logo-red.svg) |
| ![#001E62](https://dummyimage.com/24x24/001E62/001E62.png) | `lbs` | London Business School | `#001E62` | `#7290D1` | [LBS Brand](https://www.london.edu) |
| ![#00684B](https://dummyimage.com/24x24/00684B/00684B.png) | `insead` | INSEAD | `#00684B` | `#33b890` | [INSEAD Brand](https://www.insead.edu) |
| ![#000066](https://dummyimage.com/24x24/000066/000066.png) | `ie` | IE Business School | `#000066` | `#8989D8` | [IE University Brand](https://www.ie.edu) |
| ![#1A1F6C](https://dummyimage.com/24x24/1A1F6C/1A1F6C.png) | `cunef` | CUNEF Universidad | `#1A1F6C` | `#868BCF` | [CUNEF Brand](https://www.cunef.edu) |
| ![#0046AD](https://dummyimage.com/24x24/0046AD/0046AD.png) | `bocconi` | Bocconi University | `#0046AD` | `#5692E2` | [Bocconi Brand](https://www.unibocconi.eu) |

---

## Color Structure

Each theme entry in `themes.yml` follows this structure:

```yaml
theme_id:
  name: "Full Institution Name"
  light:
    accent: "#HEXVAL"          # Primary brand color
    accent_rgb: "R, G, B"      # RGB for opacity effects
    accent_hover: "#HEXVAL"    # Darkened accent for hover states
    accent_on_tint: "#HEXVAL"  # Accent text on bg_accent surfaces
    on_accent: "#HEXVAL"       # Text placed on a filled accent surface
    accent_orange: "#B45309"   # Consistent across themes (Job Market Paper tag)
    bg_accent: "#HEXVAL"       # Tinted background
    bg_accent_hover: "#HEXVAL" # Tinted background hover
    info_text: "#HEXVAL"       # Info badge text
    info_bg: "#HEXVAL"         # Info badge background
    info_bg_hover: "#HEXVAL"   # Info badge background hover
  dark:
    # Same properties, adjusted for dark mode readability
```

### Design Principles

- **Light mode accents** use the official primary brand color directly
- **Dark mode accents** are lightened for readability on dark backgrounds
- **`accent_orange`** (`#B45309` light / `#f59e0b` dark) is consistent across all themes and used for the "Job Market Paper" tag
- **Background tints** (`bg_accent`, `info_bg`) are very subtle washes of the accent color
- **Hover states** provide accessible visual feedback with darkened/lightened variants
- **Every text/background pair meets WCAG AA (4.5:1)** in both modes. If you change a
  colour, re-check it: `accent` and `accent_hover` against the page background *and*
  against `on_accent`; `accent_on_tint` against both tinted backgrounds; `info_text`
  against `info_bg` and `info_bg_hover`; `accent_orange` against the page background.

## Adding a New Theme

1. Find the university's official brand color (primary/accent color)
2. Add an entry to `themes.yml` following the structure above
3. Generate the derived colors:
   - **`accent_hover`**: darken the accent by ~20%
   - **`bg_accent`**: very light tint of the accent (~95% white)
   - **`bg_accent_hover`**: slightly darker tint (~90% white)
   - **Dark mode `accent`**: lighten the brand color for dark background readability
   - **Dark mode backgrounds**: dark tint of the accent (~85% black)
   - **`accent_on_tint`**: shift the accent's lightness until it clears 4.5:1 on `bg_accent_hover`
   - **`on_accent`**: `#FFFFFF` in light mode, `#0F172A` in dark mode
4. Add the new theme ID to the list in `_config.yml` comments
5. Update this README
