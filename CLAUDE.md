# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Signhify Agency is a performance marketing agency website built as a static HTML single-page application. The site showcases services, portfolio, pricing, and includes AI chatbot functionality for lead generation.

## Development Commands

### Local Development
No build step required - this is a pure static HTML site. Simply open `index.html` in a browser or serve it with any static file server:

```bash
# Option 1: Python simple HTTP server
python -m http.server 8000

# Option 2: Node.js http-server (if installed)
npx http-server -p 8000

# Option 3: VS Code Live Server extension
# Open index.html and click "Go Live"
```

### Code Quality
```bash
# Run auto-fix scripts to validate HTML structure
# Windows:
scripts/auto-fix.bat

# Unix/Linux/macOS:
bash scripts/auto-fix.sh
```

### Deployment
```bash
# Deploy to Vercel (push to main branch triggers automatic deployment via GitHub Actions)
git add . && git commit -m "your message" && git push origin main

# Manual Vercel deployment if needed:
vercel --prod
```

## Architecture & Structure

### File Organization
```
.
├── index.html              # Main landing page with full site content
├── admin-panel.html        # Simple admin interface (gradient background, basic styling)
├── gamma_portfolio.html    # Alternate/large portfolio page (not linked from main nav)
├── vercel.json             # Vercel deployment configuration (outputDirectory: ".")
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD: validates HTML and deploys to Vercel on push to main
├── assets/
│   └── images/             # All image assets (logos, portfolio screenshots, banners)
└── scripts/
    ├── auto-fix.bat        # Windows HTML validation script
    └── auto-fix.sh         # Unix HTML validation script
```

### Tech Stack
- **Pure HTML/CSS/JavaScript**: No framework, bundler, or build system
- **Inline CSS**: All styles in `<style>` blocks within HTML files
- **Vanilla JS**: Client-side interactivity (theme toggle, chatbot, scroll reveals, form handling)
- **Vercel**: Static hosting with automatic deploys from GitHub Actions
- **SEO**: Open Graph, Twitter Cards, JSON-LD structured data embedded

### Key Site Sections (index.html)
1. **Navigation**: Fixed navbar with theme toggle (dark/light) and CTA
2. **Hero**: Value proposition + live performance mock metrics
3. **Marquee**: Scrolling text banner of services
4. **Services**: 6 service cards (Meta Ads, Google Ads, Lead Funnels, Telegram, Web Dev, AI Analytics)
5. **Pricing**: 5 tier cards with prices (Digital Marketing ₹9,999/mo, Design ₹5,999, Web Dev ₹7,999, SEO ₹8,999/mo, Social Media Custom)
6. **Portfolio**: Project showcases including featured Gymflow SaaS, WhatsApp CRM, Telegram landing pages, custom dev projects
7. **About/Profile**: Education, certifications, experience
8. **Contact**: Email, WhatsApp, LinkedIn links + lead capture form
9. **CTA**: Build Your SaaS section
10. **Footer**: Copyright and branding
11. **Chatbot**: Fixed-position AI assistant with simple keyword-matching responses

### Styling Patterns
- **CSS Variables**: `:root` for colors (dark mode default), `[data-theme="light"]` overrides
- **Color scheme**: Green (#00ff87), Blue (#4d9fff), Purple (#a855f7), Orange (#ff6b35) accents on dark background
- **Typography**: Plus Jakarta Sans (body), Space Grotesk (headings) via Google Fonts
- **Effects**: Ambient gradients, cursor glow, scroll reveal animations, card hover transforms
- **Responsive**: Mobile-first breakpoints at 960px and 600px (hamburger menu)

### JavaScript Functionality
- **Theme Toggle**: Persists to localStorage, affects CSS custom properties
- **Chatbot**: Simple keyword-response system, opens/closes via toggle button
- **Form Handling**: Lead form redirects to WhatsApp with pre-filled message
- **Scroll Reveal**: IntersectionObserver adds `.visible` class to `.reveal` elements
- **Smooth Scroll**: Anchor links with `scrollIntoView({behavior: 'smooth'})`
- **Cursor Glow**: Follows mouse position with fixed div
- **Nav Background**: Dynamic opacity based on scroll position

## Important Notes

- **Single-page site**: All content is in `index.html`. The other HTML files (`admin-panel.html`, `gamma_portfolio.html`) appear to be standalone pages not integrated into main navigation.
- **External links**: Portfolio links point to live Vercel deployments and Google Drive files. Check these links are active before modifying.
- **Lead form**: Currently uses WhatsApp URL scheme to send inquiries - no backend storage. Consider adding email service or database if needed.
- **Structured data**: JSON-LD for ProfessionalService and Gymflow SaaS app - update when service details change.
- **No tests**: Site has no automated tests; validation is limited to HTML syntax checks in CI/CD.
- **Deployment**: Automatic on push to `main` branch via GitHub Actions using Vercel. The repository currently tracks `main` as the deployment branch; `master` is the current local branch per git status.
- **Images**: Optimize images before adding (current assets include large PNGs and JPGs). Use WebP where possible.
- **Chatbot**: Very basic keyword matching - not connected to actual AI API. Consider upgrading to Claude/OpenAI API for real intelligence.
