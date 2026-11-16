# Pedram's Newsletter

A weekly email: the ten things that mattered in AI, plus Pedram's latest teaching material, interactive visualizations, YouTube videos and news on the job market. The ten AI items are what the newsletter bot writes; Pedram adds the rest by hand.

**Name:** always "Pedram's Newsletter" (renamed from "PJ AI Newsletter" on 2026-11-16). Issue titles, `og:title` and the `<h1>` read `Pedram's Newsletter: Week of Nov 9-13, 2026`.

## Adding a new issue

### 1. Prepare images

Create a folder `images/YYYY-MM-DD/` for the issue date.

For each of the 10 items:
- Find the main official source URL (e.g., Anthropic, OpenAI, Google announcement)
- Fetch its Open Graph image (`og:image` or `twitter:image` meta tag)
- Download and resize to max 1200px width
- Compress to under 250KB (convert to WebP or optimized JPG)
- Save as `XX-descriptive-name.webp` (e.g., `01-anthropic-agents.webp`)
- If no suitable image exists, use a CSS placeholder (see item 09 in the first issue)

**File naming:**
- Use two-digit item numbers: `01`, `02`, ..., `10`
- Use descriptive kebab-case names
- Prefer `.webp` format for best compression

### 2. Copy and update the issue page

1. **Copy the latest issue page** (e.g., `2026-10-09.html`) as a template
2. **Update the frontmatter**:
   - Change filename to new date (YYYY-MM-DD format)
   - Update title, meta tags, and Open Graph tags with new date/description
   - Set `og:image` and `twitter:image` to item 1's image absolute URL
3. **Update the hero**:
   - Replace the date range
   - Replace the ten bullets in `<ul class="theme-list">`: exactly **10 short bullets, one per item, in item order**, each one line of about 4 to 10 words (under ~65 characters). No intro paragraph and no closing "theme" sentence; the hero is the title, the date line and the ten bullets
4. **Update "In this issue" list**:
   - Replace all 10 item headlines and anchor links
5. **For each of the 10 items**:
   - Update item number (01–10)
   - Replace headline (h3)
   - Update image src to `images/YYYY-MM-DD/XX-name.webp`
   - Set meaningful alt text
   - Update image credit link
   - Replace "What happened" paragraph
   - Rewrite "Why it matters" callout for public audience
   - Update "Worth exploring" badge (yes/maybe/no) and text
   - Update source links
6. **Update closing section**:
   - Replace "If you try one thing" content
7. **Leave out the "From Pedram" block**: some issues carry a block between `<!-- FROM-PEDRAM:START` and `<!-- FROM-PEDRAM:END -->` (it may sit near the top or the bottom of the page). It holds Pedram's own news, added by hand after the issue is published. When you copy an issue as a template, **delete that whole block** from the new page, and never create, edit or move one yourself. Your issue is only the ten AI items, the closing and the signup card.
8. **Keep the signup card**: the `<section class="subscribe">` block just before `</main>` stays exactly as it is in the template, including the Kit form `action` URL. Styles live in `styles.css` and the behaviour in `initializeSubscribe()` in `script.js`. If the `action` isn't a Kit `/forms/<id>/subscriptions` URL, the card hides itself.

### 3. Add entry to newsletter.html

1. Open `../newsletter.html`
2. Add the new row at the **top** of the `.newsletter-list` div, above the current latest issue
3. Remove the `latest` class and the `Latest` badge from the previous first item; the new row carries both
4. Structure for each row:

```html
<a href="newsletter/YYYY-MM-DD.html" class="newsletter-list-item latest">
    <div class="newsletter-list-thumb">
        <img src="newsletter/images/YYYY-MM-DD/01-filename.webp" alt="Week of [date range]" width="80" height="80">
    </div>
    <div class="newsletter-list-content">
        <div class="newsletter-list-meta">
            <span class="newsletter-list-badge">Latest</span>
            <span class="newsletter-list-date">[Date range, e.g. Oct 12–16, 2026]</span>
        </div>
        <h3 class="newsletter-list-title">[Issue headline]</h3>
        <p class="newsletter-list-desc">[One-line teaser, max 2 lines will show]</p>
    </div>
</a>
```

The list is reverse chronological: newest at top. Each row is compact (~100px tall) with:
- Small 80x80px thumbnail from item 1
- Date badge and "Latest" pill on newest issue only
- Title and short teaser (auto-truncates to 2 lines on desktop, 1 line on mobile)

## File structure

```
newsletter/
├── README.md (this file)
├── images/
│   └── 2026-10-09/
│       ├── 01-anthropic-agents.webp
│       ├── 02-openai-gpt6.webp
│       └── ...
├── 2026-10-09.html (first issue)
└── [future issues].html
```

## Style notes

- Keep the same head structure (fonts, styles.css, favicon, Font Awesome)
- Maintain consistent navigation with `../` paths for assets
- Use the newsletter-specific CSS classes from styles.css
- Include proper Open Graph meta tags for social sharing (especially Twitter cards)
- All "Why it matters" and "Worth exploring" sections should speak to a general public audience
- Use CSS placeholders for items without suitable images (see item 09 example)
- **No em dashes** (`—` or `&mdash;`) anywhere: not in titles, copy, captions or code. Use a comma, colon, full stop or brackets instead. Titles read `Issue name | Pedram Jahangiry`; section labels read `&sect; 01 &middot; Label`

## "From Pedram" extras (added by hand, not by the newsletter bot)

Pedram's own news (a new YouTube video, an app release, a talk, a tool worth trying) goes into a published issue as a compact strip right after the hero, before "In this issue": a `<section class="nl-extras" id="from-pedram">` wrapped in the `FROM-PEDRAM:START` / `FROM-PEDRAM:END` comments.

- Inside: `.nl-extras-box`, a `.nl-extras-label` ("From Pedram · also this week"), then a `ul.nl-extras-list` with one `a.nl-extra` row per item: `.nl-extra-thumb` (an `img` or a small `svg.plate-art` drawing), `.nl-extra-body` holding `.nl-extra-kind` (kind · topic), `.nl-extra-title` and a one-line `.nl-extra-desc`, then a `.nl-extra-go` arrow (↗ external, → on the site). One to four rows.
- Images go in the issue's `images/YYYY-MM-DD/` folder, named `extra-*.webp`, 800×450 for video thumbnails.
- Add the extras **before** the Kit email goes out, so subscribers get them too.
- An issue with no extras has no block at all.

## Image optimization tips

**Quick Python script** (requires `requests`, `beautifulsoup4`, `pillow`):
```python
# See /tmp/fetch_og_images.py from the initial issue for a working example
# Downloads og:image, resizes to 1200px max width, compresses to WebP under 250KB
```

**Manual approach:**
1. View page source, search for `og:image` or `twitter:image`
2. Download the image URL
3. Resize: `magick input.jpg -resize 1200x\> output.webp`
4. Or use online tools like Squoosh.app
