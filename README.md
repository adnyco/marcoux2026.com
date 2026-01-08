# Marcoux 2026 — Campaign Website (GitHub Pages)

Minimal, typography-forward, judicial-appropriate campaign website for **Aaron Marcoux**, candidate for **Washburn County Circuit Court Judge**.  
**Election Day:** April 7, 2026.

---

## What’s in this repo

Recommended structure:

/
├─ index.html
├─ favicon.ico
├─ favicon.png
├─ aaron-marcoux-washburn-county-circuit-court-judge-2026.jpg
└─ README.md


This site is intentionally simple: a single HTML page with embedded CSS (no build tools, no frameworks).

---

## Live deployment (GitHub Pages)

1. Push this repo to GitHub.
2. Go to **Settings → Pages**
3. **Source:** Deploy from a branch  
4. **Branch:** `main` / `(root)`
5. Save.

Your site will publish at:
- `https://<github-username>.github.io/<repo-name>/`

If you’re using a custom domain (marcoux2026.com), point it to GitHub Pages and set the custom domain in the Pages settings.

---

## Custom domain notes (Cloudflare + GitHub Pages)

**Typical setup:**
- In GitHub Pages settings, set **Custom domain**: `marcoux2026.com`
- In Cloudflare DNS:
  - `A` records for apex (`marcoux2026.com`) → GitHub Pages IPs (GitHub provides these)
  - `CNAME` for `www` → `<github-username>.github.io`

Then enable HTTPS in GitHub Pages after DNS resolves.

> Keep Cloudflare proxying (orange cloud) **off** initially if you run into HTTPS/redirect weirdness; turn it on once stable.

---

## Forms (Formspree)

This site uses Formspree endpoints:

- **Yard sign requests:** `https://formspree.io/f/xqearygr`  
- **Contact form:** `https://formspree.io/f/xzdznjyz`

All visible fields are required. Each form includes a `_subject` hidden field to make inbox triage easier.

**Important:** Formspree may require you to verify the receiving email / confirm the form endpoints in the Formspree dashboard before submissions are delivered.

---

## Social links + sharing

Footer includes:
- Facebook: https://www.facebook.com/MarcouxForJudge/
- Instagram: https://www.instagram.com/marcouxforjudge/
- Facebook share link (shares the canonical homepage URL)

No tracking pixels, no third-party widgets.

---

## SEO + metadata

The page includes:
- Descriptive `<title>` and `<meta name="description">`
- Canonical tag: `https://marcoux2026.com/`
- Open Graph + Twitter Card metadata (share image optional)
- JSON-LD structured data (Person) with social profiles
- `theme-color` for better mobile browser presentation
- Semantic landmarks (`header`, `nav`, `main`, `footer`)
- Single `<h1>` for proper hierarchy

**Optional upgrade:** Add a social share image at `/og-image.jpg` and uncomment the `og:image` / `twitter:image` meta tags.

---

## Accessibility

- “Skip to content” link
- Keyboard-friendly focus outlines (`:focus-visible`)
- Semantic structure and accessible form labels
- High-contrast sections and clear typographic hierarchy

---

## Updating content

This is a single-file site. Most changes live in `index.html`.

Common updates:
- **Hero subhead / election date:** HERO section
- **Bio content:** ABOUT section
- **Priorities bullets:** PRIORITIES section
- **Form labels / copy:** YARD SIGNS + CONTACT sections
- **Footer disclaimer:** FOOTER section (keep required paid-for language accurate)

---

## Assets checklist

Place these files at the repo root:
- `favicon.ico`
- `favicon.png`
- `aaron-marcoux-washburn-county-circuit-court-judge-2026.jpg`

If the headshot isn’t loading:
- Confirm the filename matches exactly (case-sensitive on GitHub Pages)
- Confirm it’s in the root (not a folder)
- Hard refresh (`Cmd+Shift+R`)

---

## License / usage

Campaign website content and design intended for the Marcoux 2026 campaign.  
Update any committee/treasurer disclaimer language to match current Wisconsin campaign requirements and campaign filings.
