# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML/CSS/JavaScript academic portfolio website for Pedram Jahangiry, Professional Practice Associate Professor at Utah State University. The site is hosted on GitHub Pages and showcases research, teaching, interactive tools, and professional background.

## Development Commands

### Local Development Server
Since this is a static site, serve it locally using one of these methods:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if available)
npx serve .
```

Then visit `http://localhost:8000` in your browser.

### No Build Process
This is a pure static site with no build tools, package managers, or compilation steps. All files are served directly as written.

## Site Architecture

### Multi-Page Structure
- `index.html` - Homepage with hero section, about, and highlights
- `visualizations.html` - Interactive tools and data visualizations  
- `teaching.html` - Course information and teaching materials
- `projects.html` - Research projects and Analytics Solutions Center work
- `contact.html` - Contact information and social links
- `Interactive_tools/` - Directory containing standalone HTML visualizations

### Shared Components
All pages follow a consistent structure:
- Fixed navigation bar with responsive hamburger menu
- Shared footer with social links and copyright
- Common styling from `styles.css`
- Shared JavaScript functionality from `script.js`

### Navigation System
The navigation is implemented in `script.js` with:
- Mobile-responsive hamburger menu
- Active page highlighting
- Smooth scrolling for anchor links
- Scroll-based navbar styling changes
- Click-outside-to-close functionality

## Technical Implementation

### CSS Architecture
- Mobile-first responsive design
- CSS Grid and Flexbox for layouts
- Custom CSS properties for consistency
- Breakpoints: 480px (mobile), 768px (tablet), 1024px+ (desktop)
- Inter font family from Google Fonts
- Font Awesome icons via CDN

### JavaScript Functionality
Key functions in `script.js`:
- `initializeNavigation()` - Handles mobile menu and scroll effects
- `initializeAnimations()` - Intersection Observer for fade-in effects and hover interactions
- `initializeContactForm()` - Social card hover effects
- `handleResponsiveGrid()` - Dynamic grid adjustments

### External Dependencies (CDN)
- Google Fonts (Inter font family)
- Font Awesome 6.0.0 for icons
- D3.js v7 for data visualizations (visualizations.html only)

### Image Assets
- `images/pedram.jpg` - Profile photo used on homepage
- All images should be optimized for web use

## Interactive Features

### Visualizations Page
Uses D3.js for interactive data visualizations. The page loads D3.js from CDN and implements custom visualizations for educational purposes.

### Animation System
- Intersection Observer API for scroll-triggered animations
- CSS transitions for smooth hover effects
- Card hover animations with transform effects
- Page load animation system

### Responsive Behavior
- Grid layouts automatically adjust based on screen size
- Navigation switches to hamburger menu on mobile
- Typography scales appropriately across devices
- Touch-friendly interface elements

## Interactive Visualizations Management

### Interactive_tools Directory Structure
The `Interactive_tools/` folder contains standalone HTML files for interactive educational visualizations:

```
Interactive_tools/
├── random-walk-teaching-tool.html      # Random walk visualizer with CLT demonstration
├── stationarity-visualizer.html        # Time series stationarity teaching tool
└── [original].tsx                      # Original TSX files (kept for reference)
```

### Standalone HTML Approach
**Design Philosophy**: All interactive tools are implemented as standalone HTML files to:
- Maintain static site architecture (no build process required)
- Ensure long-term reliability and independence from external services
- Provide professional presentation integrated with the academic portfolio
- Enable full customization and branding consistency

### Visualization Features
Each standalone visualization includes:
- **D3.js integration** for interactive charts with hover tooltips
- **Professional styling** matching the main site design
- **Responsive design** for all device types
- **Educational controls** for parameter adjustment
- **Academic branding** with author attribution and site links
- **Independent tooltip systems** for multi-chart interfaces

### Converting Claude Artifacts to Standalone HTML
When migrating visualizations from Claude artifacts:

1. **Extract core functionality** from TSX/React components
2. **Convert to vanilla JavaScript** using D3.js for charts
3. **Implement standalone styling** using CSS (avoid framework dependencies)
4. **Add interactive tooltips** with chart-specific positioning
5. **Integrate branding** (header links, attribution, styling consistency)
6. **Test responsiveness** across devices and screen sizes
7. **Update visualizations.html** links to point to local files

### Tooltip Implementation Details
Interactive charts use D3.js with:
- **Chart-specific tooltips** (`#tooltip-{chartType}`) to avoid cross-chart interference
- **Hover lines and circles** for precise data point identification
- **Real-time positioning** calculated relative to each chart container
- **Multi-series support** showing all series values at the current time point
- **Smooth show/hide animations** for professional user experience

## Content Management

### Adding New Pages
When creating new pages:
1. Copy the HTML structure from an existing page
2. Update the `<title>` and page-specific content
3. Ensure navigation links are updated in all pages
4. Add appropriate active class to current page nav link

### Updating Styles
- Global styles are in `styles.css`
- Use existing CSS custom properties for consistency
- Follow the established naming conventions
- Test responsive behavior across breakpoints

### Interactive Tools
When adding new interactive visualizations:
- Create standalone HTML files in the `Interactive_tools/` directory
- Use D3.js from the established CDN for charts and interactivity
- Follow the existing styling patterns and responsive design principles
- Implement chart-specific tooltips to avoid cross-chart interference
- Include proper error handling and educational controls
- Add academic branding (header links, attribution)
- Update `visualizations.html` to link to the new local file
- Test interactive features across different devices

## GitHub Pages Deployment

The site auto-deploys from the main branch to GitHub Pages. No special deployment process is needed - changes pushed to main are automatically live.

### URL Structure
- Primary domain: `https://pjalgotrader.github.io`
- All pages accessible via direct URLs (e.g., `/teaching.html`)
- Interactive tools accessible at `/Interactive_tools/[filename].html`
- Static assets served from root directory
- Links in `visualizations.html` point to local Interactive_tools files for reliability