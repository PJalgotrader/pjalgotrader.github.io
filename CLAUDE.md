# CLAUDE.md

## Project Overview

Static HTML/CSS/JavaScript academic portfolio website for Pedram Jahangiry, Professional Practice Associate Professor at Utah State University. Hosted on GitHub Pages at `https://pjalgotrader.github.io`. Showcases research, teaching, interactive tools, and professional background.

## Development

**No build process.** Pure static site — no package managers, bundlers, or compilation. All files served directly.

```bash
# Local dev server
python -m http.server 8000
# or
npx serve .
```

**Deployment:** Auto-deploys from `main` branch to GitHub Pages. Push to main = live.

## Site Structure

### Pages
| File | Purpose |
|------|---------|
| `index.html` | Homepage with hero, about, highlights |
| `visualizations.html` | Links to all interactive tools |
| `teaching.html` | Course info and materials |
| `projects.html` | Research and Analytics Solutions Center |
| `contact.html` | Contact info and social links |

### Shared Infrastructure
- `styles.css` — Global styles (mobile-first, CSS Grid/Flexbox, Inter font via Google Fonts)
- `script.js` — Navigation (hamburger menu, scroll effects, active page highlighting), animations (Intersection Observer), responsive grid
- `images/pedram.jpg` — Profile photo
- Font Awesome 6.0.0 via CDN for icons

### CSS Breakpoints
- 480px (mobile), 768px (tablet), 1024px+ (desktop)

### Key JS Functions
- `initializeNavigation()` — Mobile menu, scroll effects
- `initializeAnimations()` — Intersection Observer fade-in, hover interactions
- `initializeContactForm()` — Social card hover effects
- `handleResponsiveGrid()` — Dynamic grid adjustments

## Interactive Tools (`Interactive_tools/`)

### Directory Map
```
Interactive_tools/
├── random-walk-teaching-tool.html          # Random walk + CLT demo
├── stationarity-visualizer.html            # Time series stationarity tool
├── stationarity_viz.tsx                    # Original TSX (reference only)
├── m3_ets/                                 # Exponential Smoothing suite
│   ├── ses/
│   │   ├── ses_interactive_visualization.html
│   │   └── ses_explain.txt
│   ├── holt_linear_trend/
│   │   ├── holt_linear_trend_visualization.html
│   │   └── holt_linear_explanation.txt
│   └── holt_winter/
│       ├── holt_winters_visualization.html
│       └── holt_winter_explain.txt
├── m4_arima/                               # ARIMA models
│   ├── ar-ma-visualization.html
│   └── sarima-visualization.html
├── m5_ml/                                  # Machine Learning models
│   ├── bias-variance-visualization.html
│   ├── cross-validation-visualization.html
│   ├── learning-curve-visualization.html
│   ├── gradient-descent-visualization.html
│   ├── dt-regression-visualization.html
│   └── Module 5-ML forecasting-whiteboard.pdf
├── m6_dl/                                  # Deep Learning
│   └── dnn-timeseries-visualization.html
└── m7_rnn/                                 # Recurrent Neural Networks
    ├── rnn-vs-dnn-timeseries-visualization.html
    └── Module7_UnivariateTS_DNN_RNN_intuition.ipynb
```

### Design Philosophy
All interactive tools are **standalone HTML files** — no build process, no framework dependencies, no external service reliance. Each file is self-contained with embedded data, styles, and scripts.

### Common Patterns Across All Visualizations
Every visualization follows these conventions:

**Header branding:**
- Attribution: "Created by Dr. Pedram Jahangiry | Enhanced with Claude"
- Navigation links: Website (purple), YouTube (red), GitHub (black) with SVG icons and gradient buttons
- Purple gradient background, consistent color scheme

**Technical stack (varies by module):**
- **D3.js v7** — Custom interactive charts with tooltip systems (random walk, stationarity tools)
- **Plotly.js v2.27.0** — Statistical charts (m3_ets, m4_arima, m5_ml, m6_dl, m7_rnn)
- **TensorFlow.js v4.11.0** — Browser-based model training (m6_dl, m7_rnn)
- All vanilla JavaScript, no frameworks

**Shared features:**
- Responsive design for all device types
- Interactive parameter controls for educational exploration
- Embedded datasets (primarily airline passenger data: 1949-1960, 144 monthly observations)
- Step-by-step animations and mathematical transparency where applicable
- `.txt` companion files contain teaching notes and parameter guides

### Module Summary

| Module | Topic | Key Techniques |
|--------|-------|---------------|
| m3_ets | Exponential Smoothing | SES, Holt Linear Trend, Holt-Winters. Progressive complexity (level → trend → seasonal). Plotly.js charts. |
| m4_arima | ARIMA Models | AR(1)/MA(1) building blocks, full SARIMA with (p,d,q)(P,D,Q)m controls. Default optimal: SARIMA(1,1,0)(0,1,0)₁₂. |
| m5_ml | Machine Learning | Bias-Variance Tradeoff (polynomial fitting, 500 MC draws, hybrid metrics). Cross Validation (K-Fold, Stratified, LOOCV). Learning Curves (train/val error vs training size, dynamic percentile y-cap). Gradient Descent & SGD (contour loss surface, animated optimization). Decision Tree regression with SVG tree viz, feature space plots, recursive forecasting. |
| m6_dl | Deep Learning | DNN with TensorFlow.js. Configurable layers/neurons/activations. Live training loss, architecture SVG diagram, feature importance, DNN vs Linear Regression comparison. |
| m7_rnn | Recurrent Neural Networks | RNN vs DNN comparison. Key lesson: preprocessing (log + differencing) dramatically improves RNN performance on non-stationary data. |

### Tooltip Implementation
Charts use D3.js tooltips with:
- Chart-specific IDs (`#tooltip-{chartType}`) to avoid cross-chart interference
- Hover lines/circles for data point identification
- Real-time positioning relative to chart container
- Multi-series value display

## Adding New Content

### New Pages
1. Copy HTML structure from an existing page
2. Update `<title>` and content
3. Update navigation links across all pages
4. Set active class on current page nav link

### New Interactive Visualizations
1. Create standalone HTML in `Interactive_tools/` (or a subdirectory like `m8_xyz/`)
2. Use D3.js or Plotly.js from CDN (match existing versions)
3. Include standard header branding (copy from any existing visualization)
4. Add responsive design and interactive parameter controls
5. Embed data directly in the file — no external API calls
6. Update `visualizations.html` to link to the new file
7. For teaching suites, include companion `.txt` files with parameter guides

### Converting Claude Artifacts to Standalone HTML
1. Extract core functionality from TSX/React components
2. Convert to vanilla JavaScript with D3.js or Plotly.js
3. Implement standalone CSS (no framework dependencies)
4. Add tooltip systems, branding, and responsive design
5. Test across devices
