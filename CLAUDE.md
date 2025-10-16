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
- Plotly.js v2.27.0 for exponential smoothing visualizations (m3_ets directory)

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
├── m3_ets/                             # Exponential smoothing methods directory
│   ├── ses/
│   │   ├── ses_interactive_visualization.html    # Simple Exponential Smoothing
│   │   └── ses_explain.txt                       # Teaching notes and parameter guide
│   ├── holt_linear_trend/
│   │   ├── holt_linear_trend_visualization.html  # Holt's Linear Trend Method
│   │   └── holt_linear_explanation.txt           # Teaching notes and parameter guide
│   └── holt_winter/
│       ├── holt_winters_visualization.html       # Holt-Winters Seasonal Method
│       └── holt_winter_explain.txt               # Teaching notes and parameter guide
├── m4_arima/                           # ARIMA models directory
│   ├── ar-ma-visualization.html                  # AR(1) & MA(1) Models Interactive Visualization
│   └── sarima-visualization.html                 # SARIMA Model with Airline Passenger Data
├── m5_ml/                              # Machine Learning models directory
│   ├── dt-regression-visualization.html          # Decision Tree Regression for Time Series
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

## Exponential Smoothing Teaching Suite (m3_ets)

### Overview
The `m3_ets/` directory contains a comprehensive suite of three interactive visualizations for teaching exponential smoothing methods progressively:

1. **Simple Exponential Smoothing (SES)** - Level-only smoothing
2. **Holt's Linear Trend Method** - Level + Trend components  
3. **Holt-Winters Seasonal Method** - Level + Trend + Seasonal components

### Educational Design Philosophy
- **Progressive Complexity**: Students learn SES → Holt → Holt-Winters to understand how each method builds upon the previous
- **Parameter Focus**: Each visualization emphasizes understanding α, β*, and γ parameters through interactive controls
- **Mathematical Transparency**: Step-by-step calculations shown during animation to demystify the algorithms
- **Real Data**: Uses classic airline passenger dataset to demonstrate model limitations and appropriate applications

### Technical Implementation

#### Visualization Technology
- **Plotly.js v2.27.0** for interactive charts with professional quality
- **Vanilla JavaScript** for educational controls and step-by-step animation
- **Consistent Styling** across all three methods for seamless learning progression
- **Responsive Design** ensuring accessibility across all devices

#### Key Features Per Visualization

**Simple Exponential Smoothing (SES)**:
- Interactive α parameter control (0.01 to 0.99)
- Real-time level evolution chart starting from ℓ₀ at time 0
- Step-by-step animation showing forecast equation: ŷ_{t+h|t} = ℓ_t
- Educational insights on when α approaches 1.0 (model inadequacy signal)
- Parameter guide explaining stability vs responsiveness trade-offs

**Holt's Linear Trend Method**:
- Dual parameter controls: α (level) and β* (trend)
- Multi-chart display: main forecast + level evolution + trend evolution
- Demonstrates forecast equation: ŷ_{t+h|t} = ℓ_t + h·b_t
- Shows component independence and initialization effects
- Parameter combinations guide (high α + low β*, etc.)

**Holt-Winters Seasonal Method**:
- Triple parameter controls: α (level), β* (trend), γ (seasonal)
- Four-chart interface: main forecast + level + trend + seasonal factors
- Complete forecast equation: ŷ_{t+h|t} = ℓ_t + h·b_t + s_{t+h-m(k+1)}
- Deseasonalization process visualization
- Seasonal pattern evolution and adaptation controls

#### Consistent Header Branding
All visualizations include standardized academic branding:
- **Attribution**: "Created by Dr. Pedram Jahangiry | Enhanced with Claude"
- **Navigation Links**: Website, YouTube Channel, GitHub Profile with hover effects
- **Professional Styling**: Gradient backgrounds, consistent color schemes
- **Academic Integration**: Links back to main portfolio site

#### Interactive Parameter Guides
Each visualization includes comprehensive parameter education sections:
- **Color-coded explanations** for different parameter ranges
- **Mathematical intuition** behind exponential weighting
- **Practical implications** of parameter choices
- **Warning signals** for inappropriate model selection
- **Visual examples** of parameter effects on forecasting behavior

### Educational Impact
- **Hands-on Learning**: Students manipulate parameters and immediately see effects
- **Mathematical Understanding**: Equations come alive through step-by-step animation
- **Model Selection Skills**: Clear demonstration of when each method is appropriate
- **Parameter Tuning Intuition**: Understanding trade-offs between stability and responsiveness
- **Professional Presentation**: Publication-quality visualizations suitable for academic use

### File Organization
Each method maintains consistent structure:
- **HTML Visualization**: Complete standalone educational tool
- **Text Guide**: Detailed teaching notes and parameter explanations
- **Consistent Naming**: Clear file naming for easy navigation and maintenance

## ARIMA Models Suite (m4_arima)

### Overview
The `m4_arima/` directory contains interactive visualizations for teaching ARIMA (AutoRegressive Integrated Moving Average) models, the foundation of modern time series forecasting:

1. **AR(1) & MA(1) Models** - Building blocks of ARIMA
2. **SARIMA Model** - Seasonal ARIMA with airline passenger data

### Educational Design Philosophy
- **Progressive Learning**: Students learn AR and MA components before SARIMA
- **Parameter Focus**: Interactive controls for all ARIMA parameters (p,d,q) and seasonal parameters (P,D,Q,m)
- **Real Data Examples**: Classic datasets demonstrating appropriate model applications
- **Mathematical Transparency**: Clear equations and forecasting logic

### Technical Implementation

#### Visualization Technology
- **Plotly.js v2.27.0** for professional interactive charts
- **Vanilla JavaScript** with educational approximations of SARIMA forecasting
- **Custom Canvas rendering** for AR/MA visualizations
- **Responsive Design** ensuring accessibility across all devices

#### Key Features Per Visualization

**AR(1) & MA(1) Models Visualization**:
- Interactive parameter controls for φ (phi) and θ (theta)
- Dual-model comparison showing AR uses past values vs MA uses past errors
- Real-time forecast generation with adjustable horizon
- Educational insights on stationarity and invertibility conditions
- Visual demonstration of how forecasts decay to mean differently

**SARIMA Model Visualization (Airline Passengers)**:
- Classic airline passenger dataset (1949-1960, 144 monthly observations)
- Full SARIMA parameter controls: (p,d,q)(P,D,Q)ₘ
- Default to optimal model: **SARIMA(1,1,0)(0,1,0)₁₂**
- Interactive demonstration of:
  - **d**: Regular differencing for trend removal
  - **D**: Seasonal differencing for seasonality removal
  - **p**: AR(1) short-term autocorrelation
  - **P, Q**: Seasonal AR/MA effects
- Forecast horizon adjustable from 12-60 months
- Real-time model notation display

#### Educational Parameter Effects
The SARIMA visualization demonstrates:
- **d=0**: Flat forecast (no trend projection)
- **d=1**: Linear trend continuation (optimal)
- **d=2**: Smoother trend
- **D=0**: Seasonal pattern decays over time
- **D=1**: Seasonal growth continues (optimal)
- **P>0**: Amplifies seasonal peaks/troughs
- **Q>0**: Smooths seasonal fluctuations
- **p>0**: Adds short-term AR "momentum"
- **q>0**: Overall forecast smoothing

#### Optimal Model Explanation
**SARIMA(1,1,0)(0,1,0)₁₂** is optimal for airline data because:
- **Parsimonious**: Uses minimal parameters (principle of parsimony)
- **d=1**: First differencing removes upward trend
- **D=1**: Seasonal differencing removes 12-month cycles
- **p=1**: Captures short-term autocorrelation
- **P=0, Q=0**: Seasonal differencing alone handles seasonality efficiently

### Consistent Header Branding
All ARIMA visualizations include standardized academic branding:
- **Attribution**: "Created by Dr. Pedram Jahangiry | Enhanced with Claude"
- **Navigation Links**: Website, YouTube Channel, GitHub Profile with hover effects
- **Professional Styling**: Purple gradient backgrounds, consistent color schemes
- **Academic Integration**: Links back to main portfolio site

## Machine Learning Models Suite (m5_ml)

### Overview
The `m5_ml/` directory contains interactive visualizations for teaching machine learning models applied to time series forecasting:

1. **Decision Tree Regression** - Understanding how tree-based models partition feature space for forecasting

### Educational Design Philosophy
- **Visual Understanding**: Interactive tree structure visualization showing decision nodes and leaf predictions
- **Feature Space Exploration**: 2D scatter plot with decision boundaries to visualize how trees partition data
- **Multi-step Forecasting**: Demonstrates recursive forecasting and its limitations with tree-based models
- **Parameter Sensitivity**: Interactive controls for tree depth and forecast horizon

### Technical Implementation

#### Visualization Technology
- **Plotly.js v2.27.0** for interactive scatter plots and time series charts
- **SVG rendering** for custom tree structure visualization
- **Vanilla JavaScript** with custom Decision Tree implementation from scratch
- **Responsive Design** with dynamic tree sizing based on depth

#### Key Features

**Decision Tree Regression Visualization**:
- **Interactive tree depth control** (1-10 levels) to explore model complexity
- **Forecast horizon control** (1-36 months) for multi-step ahead predictions
- **Tree structure visualization** with interactive hover tooltips showing:
  - Decision nodes: Split conditions and feature descriptions
  - Leaf nodes: Final predictions with detailed explanations
  - Visual feedback on hover (brightening and border highlighting)
- **Feature space plot** showing Lag_1 vs Lag_2 with decision boundaries:
  - Red dashed lines for Lag_1 splits (vertical boundaries)
  - Blue dashed lines for Lag_2 splits (horizontal boundaries)
  - Color-coded scatter points by passenger count
- **Time series forecast plot** displaying:
  - Actual historical data (blue solid line)
  - In-sample predictions (pink dashed line)
  - Future forecasts (red dotted line)
- **Dynamic tree sizing**: Automatically adjusts node size, spacing, and font for deeper trees

#### Educational Insights
The visualization demonstrates key limitations of Decision Trees for time series:
- **Constant leaf predictions**: Each region outputs a single average value
- **No trend extrapolation**: Cannot predict beyond training data range
- **Flat long-term forecasts**: Recursive predictions converge to constant values
- **Feature engineering needs**: Requires careful lag selection and data transformation

#### Interactive Tooltip System
- **Fixed positioning** tooltips that follow mouse cursor
- **Node-specific information**:
  - Decision nodes: Split threshold, feature description, branch directions
  - Leaf nodes: Prediction value with explanation of averaging process
- **Visual feedback**: Nodes brighten on hover with thicker borders
- **High z-index** (10000) ensures tooltips always visible

### Consistent Header Branding
All ML visualizations include standardized academic branding:
- **Attribution**: "Created by Dr. Pedram Jahangiry | Enhanced with Claude"
- **Navigation Links**: SVG icons with gradient buttons for Website (purple), YouTube (red), GitHub (black)
- **Professional Styling**: Purple gradient backgrounds, consistent color schemes
- **Academic Integration**: Links back to main portfolio site

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
- Create standalone HTML files in the `Interactive_tools/` directory or appropriate subdirectory
- Use D3.js or Plotly.js from established CDNs based on visualization complexity
  - **D3.js v7**: For custom interactive charts with advanced tooltip systems
  - **Plotly.js v2.27.0**: For professional statistical visualizations with multiple chart types
- Follow the existing styling patterns and responsive design principles
- Implement consistent header branding with attribution and navigation links
- Include comprehensive parameter guides with educational content
- Add proper error handling and educational controls
- Update `visualizations.html` to link to the new local file with appropriate descriptions
- Test interactive features and responsiveness across different devices
- For educational visualizations, include step-by-step animations and mathematical transparency
- Organize complex visualization suites in subdirectories (e.g., `m3_ets/` for exponential smoothing)

## GitHub Pages Deployment

The site auto-deploys from the main branch to GitHub Pages. No special deployment process is needed - changes pushed to main are automatically live.

### URL Structure
- Primary domain: `https://pjalgotrader.github.io`
- All pages accessible via direct URLs (e.g., `/teaching.html`)
- Interactive tools accessible at `/Interactive_tools/[filename].html`
- Static assets served from root directory
- Links in `visualizations.html` point to local Interactive_tools files for reliability