# PJ AI Newsletter

A weekly roundup of the ten most important things that happened in AI.

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
   - Replace date range and theme line
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

### 3. Add entry to newsletter.html

1. Open `../newsletter.html`
2. Add a new content card at the **top** of the issues list (reverse chronological)
3. Include:
   - Thumbnail image from item 1
   - Date range in the card-label
   - Headline/teaser (h3)
   - Short description (p)
   - Link to new issue page

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
