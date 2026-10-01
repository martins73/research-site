---
layout: null
---
/*
 * Site JavaScript.
 *
 * This file is Liquid-processed at build time (hence the front matter), so it
 * can still read _config.yml and _data the way the inline script it replaced
 * did. It is served as an external, content-hashed file so the browser caches
 * it once instead of re-parsing ~37KB inline on every page.
 */
const SITE_CONFIG = window.__SITE_CONFIG || {};
const SERVICE_WORKER_URL = SITE_CONFIG.serviceWorker || {{ site.service_worker | default: '/sw.js' | relative_url | jsonify }};

/**
 * Main application JavaScript
 *
 * Handles mobile navigation scroll behavior, profile interactions, modals,
 * dark mode, and liturgical calendar display.
 */
document.addEventListener("DOMContentLoaded", function () {

  /* ============================================================================
     CONFIGURATION BRIDGE
     ============================================================================
     Injects Jekyll data from _config.yml into a JavaScript object.
     This separates data from logic, preventing hardcoded values in the script.
  */
  const CONFIG = {
    // Logic & Paths
    mobileBreakpoint: SITE_CONFIG.mobileBreakpoint || {{ site.mobile_breakpoint | default: 768 }},
    spinDuration: {{ site.spin_duration | default: 3200 }},
    
    // Data
    authorName: {{ site.author.given_name | jsonify }},
    repoUrl: {{ site.social.github | jsonify }},
    themeColor: {{ site.data.theme.themes[site.color_theme].light.accent | default: '#2774AE' | jsonify }},
    
    // Text & Data Labels (from _config.yml)
    text: {
      darkMode: {
        toLight: {{ site.ui_text.dark_mode.to_light | default: 'Switch to light mode' | jsonify }},
        toDark: {{ site.ui_text.dark_mode.to_dark | default: 'Switch to dark mode' | jsonify }}
      },
      saints: {
        feast: {{ site.ui_text.saints.feast_prefix | default: 'Feast of ' | jsonify }},
        and: {{ site.ui_text.saints.conjunction | default: ' and ' | jsonify }}
      },
      carbon: {
        grams: {{ site.ui_text.carbon.grams | default: 'g of CO<sub>2</sub>/view' | jsonify }},
        cleaner: {{ site.ui_text.carbon.cleaner | default: 'Cleaner than' | jsonify }},
        percent: {{ site.ui_text.carbon.percent | default: '% of pages' | jsonify }},
        tested: {{ site.ui_text.carbon.tested | default: 'tested' | jsonify }},
        // Fallback Data
        fallbackC: {{ site.ui_text.carbon.fallback_grams | default: '0.03' | jsonify }},
        fallbackP: {{ site.ui_text.carbon.fallback_percent | default: '94' | jsonify }}
      },
      research: {
        show: {{ site.ui_text.research.show_abstract | default: 'Show Abstract' | jsonify }},
        hide: {{ site.ui_text.research.hide_abstract | default: 'Hide Abstract' | jsonify }}
      },
      console: {
        greeting: {{ site.ui_text.console.greeting | default: "👋 Hi, I'm" | jsonify }},
        repo: {{ site.ui_text.console.repo | default: 'Check out the repo:' | jsonify }}
      }
    }
  };

  /* ============================================================================
     0. MOBILE: SCROLL FROM SIDEBAR TO CONTENT
     ============================================================================

     On mobile devices, when user clicks a sidebar link:
     - If sidebar is visible at top of screen: smooth scroll to main content (shows animation)
     - If sidebar is scrolled past screen: instant scroll to main content (no animation)

     This provides visual feedback about where the content is while avoiding
     animation when the user is already reading further down the page.
  */
  const isMobile = window.matchMedia(`(max-width: ${CONFIG.mobileBreakpoint}px)`).matches;
  let didAutoScrollToContent = false;  // Track if we auto-scrolled this page load

  if (isMobile) {
    const sidebar = document.querySelector(".sidebar");

    // Track sidebar visibility without forcing layout on click.
    // IntersectionObserver updates this flag asynchronously so the
    // click handler can read a pre-cached value instead of calling
    // getBoundingClientRect() which forces a synchronous layout.
    let sidebarIsScrolledDown = false;
    if (sidebar) {
      const sidebarObserver = new IntersectionObserver(
        (entries) => { sidebarIsScrolledDown = !entries[0].isIntersecting; },
        { threshold: 0.5 }
      );
      sidebarObserver.observe(sidebar);
    }

    document.querySelectorAll(".sidebar .sidebar-nav").forEach(link => {
      link.addEventListener("click", () => {
        sessionStorage.setItem("autoScrollToContent", "1");
        sessionStorage.setItem("wasScrolledDown", sidebarIsScrolledDown ? "1" : "0");
      });
    });

    const shouldAutoScroll = sessionStorage.getItem("autoScrollToContent") === "1";

    if (shouldAutoScroll) {
      sessionStorage.removeItem("autoScrollToContent");
      const wasScrolledDown = sessionStorage.getItem("wasScrolledDown") === "1";
      sessionStorage.removeItem("wasScrolledDown");

      const main = document.getElementById("main-content");
      if (main) {
        didAutoScrollToContent = true;  // Mark that we're doing auto-scroll

        // Use requestAnimationFrame to ensure layout is complete before scrolling
        requestAnimationFrame(() => {
          const y = main.getBoundingClientRect().top + window.scrollY - 20;

          // If user was at top when they clicked, use smooth scroll to show animation
          // If user was scrolled down when they clicked, use instant scroll
          window.scrollTo({
            top: y,
            behavior: wasScrolledDown ? "auto" : "smooth"
          });
        });
      }
    }
  }

  /* ============================================================================
     1. SPINNING PROFILE PICTURE
     ============================================================================

     Clicking the profile picture triggers a spinning animation.
     Duration is configured in _config.yml (default 3.2s).
  */
  const profilePic = document.querySelector(".js-spin-trigger");
  if (profilePic) {
    const triggerSpin = () => {
      // Force the CSS duration to match the Config (milliseconds -> seconds)
      profilePic.style.animationDuration = (CONFIG.spinDuration / 1000) + 's';

      profilePic.classList.add("spin-effect");

      // Remove class after the exact duration from config
      setTimeout(() => {
        profilePic.classList.remove("spin-effect");
        profilePic.style.animationDuration = ''; // Clean up
      }, CONFIG.spinDuration);
    };

    profilePic.addEventListener("click", triggerSpin);
    profilePic.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerSpin();
      }
    });
  }

  /* ============================================================================
     2. FAMILY DYNAMIC MODAL WITH ACCESSIBILITY
     ============================================================================

     Interactive modal for displaying family member photos and information.

     Features:
     - Click/Enter/Space to open modal with family member photo
     - Click outside modal or Escape key to close
     - Tab navigation loops within modal (focus trap)
     - Full ARIA labels and keyboard support for accessibility
     - Focus returns to triggering element after closing
  */
  const modal = document.getElementById("family-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const closeButton = document.getElementById("modal-close");
  const triggers = document.querySelectorAll(".family-link");
  const familyData = {{ site.data.easter_eggs.family | jsonify }};

  if (modal && triggers.length > 0 && familyData) {
    let lastFocusedElement = null;

    const openModal = (personKey) => {
      const personData = familyData[personKey];
      if (!personData) return;

      lastFocusedElement = document.activeElement;

      modalImg.src = personData.img;
      modalImg.alt = personData.text;
      modalCaption.innerText = personData.text;

      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");

      if (closeButton) closeButton.focus();

      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");

      document.body.style.overflow = "";

      modalImg.src = "";
      modalImg.alt = "";
      modalCaption.innerText = "";

      if (lastFocusedElement) lastFocusedElement.focus();
    };

    triggers.forEach((trigger) => {
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
      trigger.setAttribute("aria-haspopup", "dialog");

      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        openModal(this.getAttribute("data-person"));
      });

      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(this.getAttribute("data-person"));
        }
      });
    });

    if (closeButton) closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.style.display === "flex") {
        closeModal();
      }
    });

    // Focus Trap
    modal.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }

  /* ============================================================================
     2b. TALKS MAP EASTER EGG
     ============================================================================

     Clicking the "Conference Presentations & Talks" heading on the CV opens a
     map of every talk in _data/cv/presentations.yml. Coordinates come from
     _data/talk_locations.yml, which the "Geocode Talk Locations" workflow
     fills in automatically from each talk's city.

     - The base map (/assets/maps/talks-basemap.svg) is fetched on first open,
       so CV visitors who never click pay nothing for it.
     - US talks are placed with the same Albers projection the base map was
       drawn with; European talks go in the inset (Mercator). Projection
       parameters ride along on the SVG as data-* attributes.
     - Same modal behavior as the family modal: Escape/backdrop close, focus
       trap, focus returns to the heading.
  */
  const mapModal = document.getElementById("talkmap-modal");
  const mapTriggers = document.querySelectorAll(".talkmap-link");
  const mapDataEl = document.getElementById("talkmap-data");

  if (mapModal && mapTriggers.length > 0 && mapDataEl) {
    const papers = JSON.parse(mapDataEl.textContent);
    const locationsEl = document.getElementById("talkmap-locations");
    const coords = (locationsEl && JSON.parse(locationsEl.textContent)) || {};
    const frame = document.getElementById("talkmap-frame");
    const tip = document.getElementById("talkmap-tip");
    const filtersEl = document.getElementById("talkmap-filters");
    const mapClose = document.getElementById("talkmap-close");
    const SVG_NS = "http://www.w3.org/2000/svg";
    const DEG = Math.PI / 180;
    const SCHEDULED = /\s*\(scheduled\)\s*/i;
    let lastFocused = null;
    let loaded = null;
    let activePaper = "all";

    // Short paper name for filter chips: the part before the subtitle colon
    const shortTitle = (title) => title.split(":")[0].trim();

    // Group talks by city
    const cities = new Map();
    papers.forEach((paper, i) => {
      (paper.talks || []).forEach((talk) => {
        if (!cities.has(talk.location)) {
          const c = coords[talk.location] || {};
          cities.set(talk.location, { name: talk.location, lat: c.lat, lon: c.lon, talks: [] });
        }
        cities.get(talk.location).talks.push({
          event: talk.event.replace(SCHEDULED, " ").trim(),
          upcoming: SCHEDULED.test(talk.event),
          year: talk.year,
          paper: i
        });
      });
    });
    cities.forEach((c) => c.talks.sort((a, b) => b.year - a.year));

    // Stats line: talks, cities, countries, year range
    const allTalks = [...cities.values()].flatMap((c) => c.talks);
    const years = allTalks.map((t) => Number(t.year));
    const countries = new Set([...cities.keys()].map((loc) => {
      const last = loc.split(",").pop().trim();
      return /^[A-Z]{2}$/.test(last) ? "USA" : last;
    }));
    document.getElementById("talkmap-stats").textContent =
      `${allTalks.length} talks · ${cities.size} cities · ${countries.size} countries · ` +
      `${Math.min(...years)}–${Math.max(...years)}`;

    // Projections (must match the generator of talks-basemap.svg)
    const conicN = (Math.sin(29.5 * DEG) + Math.sin(45.5 * DEG)) / 2;
    const conicC = 1 + Math.sin(29.5 * DEG) * (2 * conicN - Math.sin(29.5 * DEG));
    const conicR0 = Math.sqrt(conicC) / conicN;
    const makeProjector = (svg) => {
      const [ak, ab, ac] = svg.dataset.albers.split(",").map(Number);
      const [mk, mx, my] = svg.dataset.mercator.split(",").map(Number);
      return (lat, lon) => {
        if (lat == null || lon == null) return null;
        if (lon > -25 && lon < 45 && lat > 30 && lat < 72) {
          return { x: mk * lon * DEG + mx, y: -mk * Math.log(Math.tan(Math.PI / 4 + lat * DEG / 2)) + my, inset: true };
        }
        if (lon > -125 && lon < -66 && lat > 24 && lat < 50) {
          const r = Math.sqrt(conicC - 2 * conicN * Math.sin(lat * DEG)) / conicN;
          const a = (lon + 96) * DEG * conicN;
          return { x: ak * r * Math.sin(a) + ab, y: -ak * (conicR0 - r * Math.cos(a)) + ac, inset: false };
        }
        return null; // Not geocoded yet, or outside both maps: not plotted
      };
    };

    const svgEl = (tag, attrs) => {
      const el = document.createElementNS(SVG_NS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      return el;
    };

    const showTip = (city, dot) => {
      tip.replaceChildren();
      const title = document.createElement("strong");
      title.textContent = city.name;
      const list = document.createElement("ul");
      city.talks.forEach((t) => {
        const li = document.createElement("li");
        li.textContent = `${t.event}, ${t.year}${t.upcoming ? " (upcoming)" : ""}`;
        const sub = document.createElement("span");
        sub.textContent = shortTitle(papers[t.paper].title);
        li.appendChild(sub);
        list.appendChild(li);
      });
      tip.append(title, list);
      tip.hidden = false;
      const d = dot.getBoundingClientRect();
      const f = frame.getBoundingClientRect();
      let x = d.right - f.left + 8;
      if (x + tip.offsetWidth > f.width) x = d.left - f.left - tip.offsetWidth - 8;
      tip.style.left = `${Math.max(4, x)}px`;
      tip.style.top = `${Math.max(4, d.top - f.top - 8)}px`;
    };
    const hideTip = () => { tip.hidden = true; };

    const drawMarkers = (svg) => {
      const project = makeProjector(svg);
      const layer = svgEl("g", { class: "talkmap-marks" });

      const [hlat, hlon] = frame.dataset.home.split(",").map(Number);
      const home = project(hlat, hlon);
      if (home) {
        layer.appendChild(svgEl("circle", { class: "talkmap-home", cx: home.x, cy: home.y, r: 6 }));
        const label = svgEl("text", { class: "talkmap-label is-home", x: home.x + 10, y: home.y + 16 });
        label.textContent = frame.dataset.homeLabel;
        layer.appendChild(label);
      }

      cities.forEach((city) => {
        const p = project(city.lat, city.lon);
        if (!p) return;
        const r = 6 + (city.talks.length - 1) * 3;
        const allUpcoming = city.talks.every((t) => t.upcoming);
        const g = svgEl("g", { class: "talkmap-city", transform: `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})` });
        g.dataset.papers = [...new Set(city.talks.map((t) => t.paper))].join(",");
        if (city.talks.some((t) => t.upcoming)) {
          g.appendChild(svgEl("circle", { class: "talkmap-ring", r: r + 5 }));
        }
        const dot = svgEl("circle", {
          class: `talkmap-dot${allUpcoming ? " is-upcoming" : ""}`,
          r,
          tabindex: 0,
          role: "button",
          "aria-label": `${city.name}: ${city.talks.length} talk${city.talks.length > 1 ? "s" : ""}`
        });
        dot.addEventListener("mouseenter", () => showTip(city, dot));
        dot.addEventListener("focus", () => showTip(city, dot));
        dot.addEventListener("click", () => showTip(city, dot));
        dot.addEventListener("mouseleave", hideTip);
        dot.addEventListener("blur", hideTip);
        const label = p.inset
          ? svgEl("text", { class: "talkmap-label", y: r + 14, "text-anchor": "middle" })
          : svgEl("text", { class: "talkmap-label", x: r + 5, dy: "0.35em" });
        label.textContent = city.name.split(",")[0];
        g.append(dot, label);
        layer.appendChild(g);
      });
      svg.appendChild(layer);
    };

    const applyFilter = () => {
      filtersEl.querySelectorAll("button").forEach((b) => {
        b.setAttribute("aria-pressed", String(b.dataset.paper === activePaper));
      });
      frame.querySelectorAll(".talkmap-city").forEach((g) => {
        const match = activePaper === "all" || g.dataset.papers.split(",").includes(activePaper);
        g.classList.toggle("is-dim", !match);
      });
    };

    [{ key: "all", label: "All papers" }]
      .concat(papers.map((p, i) => ({ key: String(i), label: shortTitle(p.title), title: p.title })))
      .forEach((f) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "talkmap-chip";
        b.dataset.paper = f.key;
        b.textContent = f.label;
        if (f.title) b.title = f.title;
        b.addEventListener("click", () => { activePaper = f.key; applyFilter(); });
        filtersEl.appendChild(b);
      });
    applyFilter();

    const loadMap = () => {
      if (!loaded) {
        loaded = fetch(frame.dataset.src)
          .then((res) => {
            if (!res.ok) throw new Error(res.status);
            return res.text();
          })
          .then((text) => {
            const svg = new DOMParser().parseFromString(text, "image/svg+xml").documentElement;
            svg.setAttribute("role", "img");
            svg.setAttribute("aria-label", "Map of talk locations");
            frame.insertBefore(document.importNode(svg, true), tip);
            drawMarkers(frame.querySelector("svg"));
            applyFilter();
          })
          .catch(() => {
            loaded = null; // Allow a retry on the next open
            const msg = document.createElement("p");
            msg.className = "talkmap-error";
            msg.textContent = "The map could not load. Please try again.";
            frame.replaceChildren(msg, tip);
          });
      }
      return loaded;
    };

    const openMap = () => {
      lastFocused = document.activeElement;
      mapModal.style.display = "flex";
      mapModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if (mapClose) mapClose.focus();
      loadMap();
    };

    const closeMap = () => {
      hideTip();
      mapModal.style.display = "none";
      mapModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    };

    mapTriggers.forEach((trigger) => {
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.addEventListener("click", (e) => { e.preventDefault(); openMap(); });
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openMap();
        }
      });
    });

    if (mapClose) mapClose.addEventListener("click", closeMap);
    mapModal.addEventListener("click", (e) => { if (e.target === mapModal) closeMap(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mapModal.style.display === "flex") closeMap();
    });

    // Focus Trap
    mapModal.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusable = mapModal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ============================================================================
     3. DARK MODE TOGGLE
     ============================================================================

     Toggle button to switch between light and dark themes.

     - Theme preference persisted in localStorage
     - Initial theme applied in head.html before page renders (prevents flash)
     - Accessible via keyboard and screen readers
  */
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const getCurrentTheme = () => {
      return document.documentElement.getAttribute("data-theme") || "light";
    };

    const updateThemeLabels = (theme) => {
      const isDark = theme === "dark";
      const label = isDark ? CONFIG.text.darkMode.toLight : CONFIG.text.darkMode.toDark;
      themeToggle.setAttribute("aria-label", label);
      themeToggle.setAttribute("title", label);
    };

    // Browser chrome (the mobile address bar) follows the theme. Light uses the
    // accent; dark uses --bg-paper so the bar blends into the page.
    const THEME_COLORS = { light: CONFIG.themeColor, dark: "#1e293b" };

    const updateThemeColorMeta = (theme) => {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.light);
    };

    const setTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      updateThemeLabels(theme);
      updateThemeColorMeta(theme);
    };

    // Set initial theme labels (theme itself is set in head.html)
    updateThemeLabels(getCurrentTheme());

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
      const currentTheme = getCurrentTheme();
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  /* ============================================================================
     4. SAINT OF THE DAY (FOOTER HOVER)
     ============================================================================

     Displays the liturgical calendar's saint of the day in the footer.

     Behavior:
     - Hover over the cross (✝) symbol to display saint information
     - Intelligently formats saint names (singular/plural, strips prefix)
     - Falls back to copyright text if no saint is available
  */
  const trigger = document.getElementById("saint-trigger");
  const target = document.getElementById("copyright-content");
  
  if (trigger && target) {
    const today = new Date();
    const key = (today.getMonth() + 1) + "-" + today.getDate();
    
    // Retrieve saint data
    const saintsByDay = {{ site.data.easter_eggs.saints | jsonify }};
    const saints = saintsByDay ? saintsByDay[key] : null;
    
    // Capture original state
    const originalHTML = target.innerHTML;
    const originalText = target.innerText;
    
    // Format Helper
    const formatSaintList = (arr) => {
      if (!arr || arr.length === 0) return "";
      if (arr.length === 1) return arr[0];
      const cleaned = arr.map((s) => (s || "").trim()).filter(Boolean);
      const stripPrefix = (s, rx) => s.replace(rx, "").trim();
      
      if (cleaned.every((s) => /^Saint\s+/i.test(s))) {
        return "Saints " + cleaned.map((s) => stripPrefix(s, /^Saint\s+/i)).join(CONFIG.text.saints.and);
      }
      if (cleaned.every((s) => /^Blessed\s+/i.test(s))) {
        return "Blesseds " + cleaned.map((s) => stripPrefix(s, /^Blessed\s+/i)).join(CONFIG.text.saints.and);
      }
      return cleaned.join(CONFIG.text.saints.and);
    };
    
    if (saints && saints.length > 0) {
      const saintText = formatSaintList(saints);
      
      // --- Action: Show ---
      const showSaint = () => {
        target.style.transition = "opacity 0.2s";
        target.style.opacity = "0";
        setTimeout(() => {
          target.innerText = CONFIG.text.saints.feast + saintText;
          target.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
          target.style.fontWeight = "500";
          target.style.opacity = "1";
        }, 200);
      };
      
      // --- Action: Hide ---
      const hideSaint = () => {
        target.style.transition = "opacity 0.2s";
        target.style.opacity = "0";
        setTimeout(() => {
          if (originalHTML !== originalText) {
            target.innerHTML = originalHTML;
          } else {
            target.innerText = originalText;
          }
          target.style.color = "inherit";
          target.style.fontWeight = "normal";
          target.style.opacity = "1";
        }, 200);
      };
      
      // --- DESKTOP (Hover) ---
      trigger.addEventListener("mouseenter", showSaint);
      trigger.addEventListener("mouseleave", hideSaint);
      
      // --- MOBILE (Hold + Delay) ---
      // 1. Touch Starts: Show immediately
      trigger.addEventListener("touchstart", (e) => {
           // Prevent default only if cancelable to stop 'sticky' clicks
           if(e.cancelable) e.preventDefault(); 
           showSaint(); 
      }, { passive: false });
      
      // 2. Touch Ends: Wait before hiding
      trigger.addEventListener("touchend", () => {
          setTimeout(hideSaint, 800); 
      });
      
      trigger.addEventListener("touchcancel", () => {
          setTimeout(hideSaint, 800);
      });
    }
  }

  /* ============================================================================
     5. MOBILE: SCROLL TO TOP ON REFRESH
     ============================================================================

     On mobile, refreshing the page (e.g. tapping Go in the address bar) restores
     scroll position by default. This overrides that to always start at the top.

     IMPORTANT: Don't scroll to top if we're auto-scrolling to content from sidebar.
  */
  if (window.matchMedia(`(max-width: ${CONFIG.mobileBreakpoint}px)`).matches) {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Only scroll to top if we're NOT auto-scrolling to content
    if (!didAutoScrollToContent) {
      window.scrollTo(0, 0);
    }
  }

  /* ============================================================================
     6. CARBON BADGE (WEBSITE CARBON API)
     ============================================================================ */
  // Deferred with requestIdleCallback (or setTimeout fallback) so the badge
  // fetch and innerHTML update do not run during early user interactions,
  // which was causing INP regressions (~400ms) on the #wcb element.
  (window.requestIdleCallback || function(cb) { setTimeout(cb, 200); })(function() {
  (function() {
    const badgeContainer = document.getElementById('wcb');
    if (!badgeContainer) return;

    const SITE_URL = '{{ site.url }}';
    const domainSlug = SITE_URL
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '')
      .replace(/\./g, '-');

    const reportUrl = `https://www.websitecarbon.com/website/${domainSlug}/`;
    const apiUrl = 'https://api.websitecarbon.com/b?url=' + encodeURIComponent(SITE_URL + '/');

    // Uses config values for fallback if API fails
    const FALLBACK = { c: CONFIG.text.carbon.fallbackC, p: CONFIG.text.carbon.fallbackP };

    function renderBadge(data) {
      if (!data || data.c === undefined) {
        data = FALLBACK;
      }

      badgeContainer.innerHTML = `
        <span class="wcb-text">
          ${data.c}${CONFIG.text.carbon.grams}<br>
          ${CONFIG.text.carbon.cleaner} ${data.p}${CONFIG.text.carbon.percent}
          <a class="wcb-link" target="_blank" rel="noopener" href="${reportUrl}">${CONFIG.text.carbon.tested}</a>.
        </span>
      `;
    }

    const cacheKey = 'wcb_' + domainSlug;
    const cached = localStorage.getItem(cacheKey);
    const now = new Date().getTime();

    if (cached) {
      try {
        const r = JSON.parse(cached);
        if (now - r.t < 86400000) {
          renderBadge(r.d);
          return;
        }
      } catch (e) {
        localStorage.removeItem(cacheKey);
      }
    }

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error('Network status: ' + response.status);
        return response.json();
      })
      .then(data => {
        renderBadge(data);
        localStorage.setItem(cacheKey, JSON.stringify({ t: now, d: data }));
      })
      .catch(err => {
        console.error('Carbon Badge Error:', err);
        renderBadge(FALLBACK);
      });
  })();
  }); // end requestIdleCallback

  /* ============================================================================
     7. RESEARCH PAPERS: TOGGLE ABSTRACT
     ============================================================================

     Expands/collapses research paper abstracts when user clicks the toggle button.
     {% if site.typewriter_abstract %}
     When enabled, text is revealed letter-by-letter with a blinking cursor.
     Controlled by typewriter_abstract in _config.yml.
     {% endif %}
  */
  (function() {
    {% if site.typewriter_abstract %}
    var TYPEWRITER_SPEED = {{ site.typewriter_speed | default: 12 }};
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    {% endif %}

    // Store original HTML for each abstract (trimmed to remove template whitespace)
    var abstractStore = {};
    document.querySelectorAll('.paper-abstract').forEach(function(el) {
      abstractStore[el.id] = el.innerHTML.trim();
    });

    {% if site.typewriter_abstract %}
    // Track active typewriter timers so we can cancel mid-typing
    var activeTimers = {};

    function cancelTypewriter(id) {
      if (activeTimers[id]) {
        clearTimeout(activeTimers[id]);
        delete activeTimers[id];
      }
    }

    function typewriterReveal(el, id) {
      var originalHTML = abstractStore[id];

      // Parse original HTML to extract paragraph texts (markdownify wraps in <p>)
      var temp = document.createElement('div');
      temp.innerHTML = originalHTML;
      var sourceParagraphs = temp.querySelectorAll('p');
      var paraTexts = [];
      sourceParagraphs.forEach(function(p) {
        var text = p.textContent.trim();
        if (text) paraTexts.push(text);
      });
      // Fallback: if no <p> tags, treat entire content as one block
      if (paraTexts.length === 0) {
        var fallback = (temp.textContent || '').trim();
        if (fallback) paraTexts.push(fallback);
      }

      // Build the typing DOM: one <p> per paragraph, cursor in the first
      el.innerHTML = '';
      var cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor';
      cursor.textContent = '|';

      var currentPara = document.createElement('p');
      el.appendChild(currentPara);
      var textNode = document.createTextNode('');
      currentPara.appendChild(textNode);
      currentPara.appendChild(cursor);

      var paraIndex = 0;
      var charIndex = 0;

      function typeNext() {
        if (paraIndex >= paraTexts.length) {
          // Typing complete: restore original HTML with formatting
          cursor.remove();
          el.innerHTML = originalHTML;
          delete activeTimers[id];
          return;
        }
        var currentText = paraTexts[paraIndex];
        if (charIndex < currentText.length) {
          textNode.textContent += currentText.charAt(charIndex);
          charIndex++;
          activeTimers[id] = setTimeout(typeNext, TYPEWRITER_SPEED);
        } else {
          // Paragraph done — move to next
          paraIndex++;
          charIndex = 0;
          if (paraIndex < paraTexts.length) {
            cursor.remove();
            currentPara = document.createElement('p');
            el.appendChild(currentPara);
            textNode = document.createTextNode('');
            currentPara.appendChild(textNode);
            currentPara.appendChild(cursor);
            activeTimers[id] = setTimeout(typeNext, TYPEWRITER_SPEED);
          } else {
            // All paragraphs done
            cursor.remove();
            el.innerHTML = originalHTML;
            delete activeTimers[id];
          }
        }
      }

      typeNext();
    }
    {% endif %}

    document.addEventListener('click', function(e) {
      var button = e.target.closest('[data-abstract]');
      if (!button) return;

      var index = button.getAttribute('data-abstract');
      var abstractElement = document.getElementById('abstract-' + index);
      if (!abstractElement) return;
      var abstractId = abstractElement.id;

      if (abstractElement.classList.contains('collapsed')) {
        // --- EXPAND ---
        {% if site.typewriter_abstract %}cancelTypewriter(abstractId);{% endif %}
        abstractElement.classList.remove('collapsed');
        abstractElement.classList.add('expanded');
        button.textContent = CONFIG.text.research.hide;
        button.setAttribute('aria-expanded', 'true');

        {% if site.typewriter_abstract %}
        if (prefersReducedMotion) {
          abstractElement.innerHTML = abstractStore[abstractId];
        } else {
          typewriterReveal(abstractElement, abstractId);
        }
        {% endif %}
      } else {
        // --- COLLAPSE ---
        {% if site.typewriter_abstract %}cancelTypewriter(abstractId);{% endif %}
        abstractElement.innerHTML = abstractStore[abstractId];
        abstractElement.classList.remove('expanded');
        abstractElement.classList.add('collapsed');
        button.textContent = CONFIG.text.research.show;
        button.setAttribute('aria-expanded', 'false');
      }
    });
  })();

  /* ============================================================================
     8. SCROLL REVEAL
     ============================================================================

     Two modes controlled by scroll_reveal + scroll_reveal_mode in _config.yml:

     "fade"  — Elements start invisible (opacity 0, translateY 24px) and fade in
               + slide up when they enter the viewport. One-shot via IntersectionObserver.
               Staggered delays for sibling groups.

     "slide" — Elements stay visible but start offset downward (30px).
               translateY is continuously mapped to viewport position via
               requestAnimationFrame, giving a smooth "sliding into place" feel.
  */
  {% if site.scroll_reveal %}
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Ensure section titles participate in reveal dynamics without
    // requiring manual .scroll-reveal classes on every heading.
    document.querySelectorAll(
      '#main-content > h1, #main-content > h2, #main-content > h3, ' +
      '#main-content section > h1, #main-content section > h2, #main-content section > h3, ' +
      '#main-content .cv-section-header'
    ).forEach(function(el) {
      el.classList.add('scroll-reveal');
    });

    {% if site.scroll_reveal_mode == "slide" %}
    /* ---- Slide mode: continuous scroll-linked translation ---- */
    document.documentElement.classList.add('sr-mode-slide');

    var SR_MAX_OFFSET = {{ site.scroll_reveal_offset | default: 60 }};
    var SR_START_OPACITY = {{ site.scroll_reveal_opacity | default: 0.4 }};
    var SR_SETTLE = {{ site.scroll_reveal_settle | default: 0.5 }};
    var SR_EASING = {{ site.scroll_reveal_easing | default: 3 }};
    var SR_SECTION_GAP = 4; // px safety gap to avoid crossing section boundaries
    var srElements = Array.from(document.querySelectorAll('.scroll-reveal'));
    var srTicking = false;
    var srCurrentOffset = new Map();

    srElements.forEach(function(el) {
      srCurrentOffset.set(el, 0);
    });

    function srUpdate() {
      var vh = window.innerHeight;
      var states = srElements.map(function(el) {
        var rect = el.getBoundingClientRect();
        var prevOffset = srCurrentOffset.get(el) || 0;
        // Measure against layout position, not the previously transformed box.
        var naturalTop = rect.top - prevOffset;
        var naturalBottom = rect.bottom - prevOffset;

        var progress = 1 - (naturalTop - vh * SR_SETTLE) / (vh * (1 - SR_SETTLE));
        progress = Math.max(0, Math.min(1, progress));
        var eased = 1 - Math.pow(1 - progress, SR_EASING);
        var offset = (1 - eased) * SR_MAX_OFFSET;

        var opacity = SR_START_OPACITY + eased * (1 - SR_START_OPACITY);
        return {
          el: el,
          naturalTop: naturalTop,
          naturalBottom: naturalBottom,
          offset: offset,
          opacity: opacity
        };
      });

      // Preserve layout order globally: no reveal element can move below
      // the element that follows it in document flow.
      for (var i = states.length - 2; i >= 0; i--) {
        var current = states[i];
        var next = states[i + 1];
        // Only apply anti-overlap clamping for elements that are vertically
        // stacked in normal flow. Grid/flex siblings can share the same row,
        // and clamping those would suppress the reveal motion for all but the
        // last item in that row.
        if (next.naturalTop >= current.naturalBottom - 1) {
          var maxOffsetBeforeNext = next.naturalTop + next.offset - current.naturalBottom - SR_SECTION_GAP;
          if (current.offset > maxOffsetBeforeNext) {
            current.offset = Math.max(0, maxOffsetBeforeNext);
          }
        }
      }

      states.forEach(function(state) {
        state.el.style.transform = 'translateY(' + state.offset + 'px)';
        state.el.style.opacity = state.opacity;
        srCurrentOffset.set(state.el, state.offset);
      });
      srTicking = false;
    }

    window.addEventListener('scroll', function() {
      if (!srTicking) {
        requestAnimationFrame(srUpdate);
        srTicking = true;
      }
    }, { passive: true });

    srUpdate();

    {% else %}
    /* ---- Fade mode: one-shot IntersectionObserver reveal ---- */
    document.documentElement.classList.add('sr-mode-fade');

    // Stagger sibling .scroll-reveal elements so grouped items cascade in
    var SR_STAGGER = 0.1;
    var processed = new Set();
    document.querySelectorAll('.scroll-reveal').forEach(function(el) {
      var parent = el.parentElement;
      if (processed.has(parent)) return;
      processed.add(parent);
      var siblings = parent.querySelectorAll(':scope > .scroll-reveal');
      if (siblings.length > 1) {
        siblings.forEach(function(sib, i) {
          sib.style.setProperty('--sr-delay', (i * SR_STAGGER) + 's');
          sib.setAttribute('data-sr-delay', '');
        });
      }
    });

    var srObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-visible');
          srObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: {{ site.scroll_reveal_threshold | default: 0.15 }},
      rootMargin: '0px 0px {{ site.scroll_reveal_margin | default: "-15%" }} 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(function(el) {
      srObserver.observe(el);
    });

    // Guarantee bottom-of-page elements always reveal
    window.addEventListener('scroll', function() {
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 2)) {
        document.querySelectorAll('.scroll-reveal:not(.sr-visible)').forEach(function(el) {
          el.classList.add('sr-visible');
          srObserver.unobserve(el);
        });
      }
    }, { passive: true });
    {% endif %}
  }
  {% endif %}

  console.log(
    `%c${CONFIG.text.console.greeting} ${CONFIG.authorName}.\n%c${CONFIG.text.console.repo} ${CONFIG.repoUrl}`,
    `color: ${CONFIG.themeColor}; font-size: 20px; font-weight: bold; font-family: sans-serif;`,
    "color: #64748b; font-size: 12px; font-family: sans-serif;"
  );

});

/* ============================================================================
   9. SERVICE WORKER REGISTRATION
   ============================================================================ */
if ('serviceWorker' in navigator && SERVICE_WORKER_URL) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register(SERVICE_WORKER_URL).catch(function(error) {
      console.warn('Service worker registration failed:', error);
    });
  });
}
