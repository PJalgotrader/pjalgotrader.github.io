# PJ AI Newsletter

A weekly roundup of the ten most important things that happened in AI.

## Adding a new issue

1. **Copy the latest issue page** (e.g., `2026-10-09.html`) as a template
2. **Update the content**:
   - Change the date in the filename (YYYY-MM-DD format)
   - Update the title, meta tags, and Open Graph tags with the new date and description
   - Replace the intro paragraph and all 10 items with the new content
   - Update the "If you try one thing" section
3. **Add an entry to newsletter.html**:
   - Open `../newsletter.html`
   - Add a new content card at the **top** of the issues list (reverse chronological order)
   - Include: date range, headline/teaser, and link to the new issue page

## File structure

```
newsletter/
├── README.md (this file)
├── 2026-10-09.html (first issue)
└── [future issues].html
```

## Style notes

- Keep the same head structure (fonts, styles.css, favicon, Font Awesome)
- Maintain consistent navigation with `../` paths for assets
- Use the existing content-card and about-text styles from styles.css
- Include meta tags for good Open Graph/Twitter card previews
- All "Why it matters" and "Worth exploring" sections should speak to a general public audience
