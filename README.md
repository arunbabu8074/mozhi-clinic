# മൊഴി — Counseling & Therapy Centre Website

A premium static website for Mozhi Counseling & Therapy Centre, Chennai.

---

## Folder Structure

```
mozhi/
├── index.html                   ← Main homepage
├── README.md                    ← This file
│
├── assets/
│   ├── css/
│   │   ├── style.css            ← Master stylesheet (imports all partials)
│   │   ├── variables.css        ← CSS custom properties, reset, utilities
│   │   ├── nav.css              ← Navigation (sticky, mobile hamburger)
│   │   ├── hero.css             ← Hero section + animations
│   │   ├── sections.css         ← About, Services, Approach, Contact, Footer
│   │   └── responsive.css       ← Media queries (tablet + mobile)
│   │
│   ├── js/
│   │   └── script.js            ← Scroll effects, hamburger, form → WhatsApp
│   │
│   └── images/
│       ├── logo.svg             ← Full-colour logo (for light backgrounds)
│       └── logo-white.svg       ← White logo variant (for dark backgrounds)
│
└── pages/                       ← Reserved for future subpages
```

---

## Setup

No build step required. This is a plain HTML/CSS/JS project.

### Run locally

Open `index.html` directly in your browser, **or** use a local server
(recommended to avoid font/asset path issues):

```bash
# Python 3
cd mozhi
python3 -m http.server 8080
# → Open http://localhost:8080
```

Or with Node:
```bash
npx serve .
```

---

## Customisation

### 1. Replace the logo
- Design your own logo and export as SVG
- Save as `assets/images/logo.svg` (light bg version)
- Save as `assets/images/logo-white.svg` (dark bg version)

### 2. Update contact details
In `index.html`, search for:
- `+91 XXXXX XXXXX` → Replace with real phone number
- `91XXXXXXXXXX` → Replace with WhatsApp number (no spaces, include country code)
- `Chennai, Tamil Nadu` → Update if location changes

In `assets/js/script.js`, update:
```js
const WHATSAPP_NUMBER = '91XXXXXXXXXX'; // ← Your real WhatsApp number
```

### 3. Colors & fonts
All design tokens are in `assets/css/variables.css`:
```css
--sage:       #8FAF94;   /* Primary accent */
--warm-white: #FAFAF7;   /* Page background */
--ink:        #1E1E1E;   /* Primary text / dark sections */
```

### 4. Add pages
Place additional HTML files in the `pages/` folder:
- `pages/about.html`
- `pages/services.html`
- etc.

---

## Browser Support

- Chrome / Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari / Chrome (iOS & Android)

---

## Deployment

Since this is a static site, it can be hosted on:
- **Netlify** — drag & drop the `mozhi/` folder
- **Vercel** — `vercel deploy`
- **GitHub Pages** — push to a repo and enable Pages
- Any shared hosting (cPanel, etc.) — upload via FTP

---

*Built with care for Mozhi Counseling & Therapy Centre · Chennai · 2026*
