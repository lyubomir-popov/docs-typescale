# Docs Type Scale

A project that uses the baseline nudge generator to create multiple typescale examples and override vanilla framework variables for precise typographic alignment.

## How the Project Works

### Multiple Typescale Configurations

The project now supports **multiple typescale configurations** for different use cases:

- **Default Typescale** (`config/typography-config.json`): Optimized for technical documentation
- **Editorial Typescale** (`config/typography-config-editorial.json`): Designed for long-form content

### Main Configuration: `config/typography-config-[name].json`

Each typescale has its own configuration file following the pattern `config/typography-config-[name].json`. This is where you define:

- **Baseline unit** (`baselineUnit`): The fundamental spacing unit
- **Font file** (`fontFile`): Path to the font file for metrics extraction
- **Typography elements** (`elements`): Array of heading and paragraph definitions with:
  - `fontSize`: Font size in rem units
  - `lineHeight`: Line height in baseline units  
  - `spaceAfter`: Space after element in baseline units

Example configurations:

**Default (Documentation):**
```json
{
  "baselineUnit": 0.4375,
  "fontFile": "../fonts/UbuntuSans-Regular.woff",
  "elements": [
    {
      "identifier": "h1",
      "fontSize": 2,
      "lineHeight": 6,
      "spaceAfter": 1
    },
    {
      "identifier": "p",
      "fontSize": 1,
      "lineHeight": 3,
      "spaceAfter": 2
    }
  ]
}
```

**Editorial (Long-form):**
```json
{
  "baselineUnit": 0.5,
  "fontFile": "../fonts/UbuntuSans-Regular.woff",
  "elements": [
    {
      "identifier": "h1",
      "fontSize": 2.5,
      "lineHeight": 6,
      "spaceAfter": 2
    },
    {
      "identifier": "p",
      "fontSize": 1.125,
      "lineHeight": 4,
      "spaceAfter": 2
    }
  ]
}
```

### Spacing Control: Line 61 in `src/main.scss`

**Paragraph + Heading spacing** is controlled on **line 61** in `src/main.scss`:

```scss
// Increase spacing of headings following a paragraph
h1, h2, h3, h4, h5, h6 {
    &::before {
        position: relative;
        display: block;
        content: '';
        height: $baseline-unit * 1;  // This controls the spacing
    }
}
```

This adds a `::before` pseudo-element to all headings that creates additional spacing when headings follow paragraphs. The spacing is calculated as `$baseline-unit * 1` (currently 0.4375rem).

## Setup

This project uses two main dependencies:

- **vanilla-framework**: CSS framework for consistent design patterns
- **@lyubomir-popov/baseline-nudge-generator**: Generates precise baseline nudges for typography alignment

## Installation

The dependencies are already installed as dev dependencies:

```bash
npm install --save-dev vanilla-framework @lyubomir-popov/baseline-nudge-generator chokidar sass
```

## Project Structure

```
docs-typescale/
├── config/
│   ├── typography-config.json              # Default typescale (documentation)
│   └── typography-config-editorial.json   # Editorial typescale (long-form)
├── dist/
│   ├── tokens/                            # Generated design tokens per config
│   │   ├── default-tokens.json
│   │   └── editorial-tokens.json
│   ├── css/                               # Compiled CSS per config
│   │   ├── default.css
│   │   └── editorial.css
│   ├── demos/                             # Demo HTML files per config
│   │   ├── typography-default.html
│   │   └── typography-editorial.html
│   └── index.html                         # Main demo index page
├── src/
│   ├── main.scss                          # Main SCSS file (imports other files)
│   ├── _vanilla-settings-overrides.scss   # Manual vanilla framework variable overrides
│   └── generated/                         # Auto-generated files per config
│       ├── _vanilla-settings-automated-overrides-default.scss
│       ├── _vanilla-settings-automated-overrides-editorial.scss
│       ├── _generated-styles-default.scss
│       └── _generated-styles-editorial.scss
├── scripts/
│   ├── watch.js                           # Watcher script that monitors config changes
│   └── build-config.js                    # Script to build specific configs
└── fonts/
    └── UbuntuSans-Regular.woff           # Font file for metrics extraction
```

## Usage

### Available Scripts

- `npm run dev` - Start the development watcher (main command)
- `npm run watch` - Start the watcher to monitor typography config changes
- `npm run build` - Build all configs once (generate tokens and compile CSS)
- `npm run generate` - Generate tokens for default config only
- `npm run generate:default` - Generate tokens for default config
- `npm run generate:editorial` - Generate tokens for editorial config
- `npm run build:default` - Build CSS for default config only
- `npm run build:editorial` - Build CSS for editorial config only
- `npm run demo:default` - Open default demo in browser
- `npm run demo:editorial` - Open editorial demo in browser

### Watcher Script

The watcher script (`scripts/watch.js`) does the following:

1. **Monitors** all `config/typography-config-*.json` files for changes
2. **Generates tokens** for each config using the baseline nudge generator
3. **Updates automated vanilla overrides** in `src/generated/_vanilla-settings-automated-overrides-[name].scss`
4. **Generates baseline styles** in `src/generated/_generated-styles-[name].scss`
5. **Compiles SCSS to CSS** for each config with appropriate variables
6. **Generates demo HTML** for each config in `dist/demos/typography-[name].html`

### Generated Output

The build process generates for each config:

1. **`dist/tokens/[name]-tokens.json`** - Design tokens with calculated nudge values
2. **`dist/css/[name].css`** - Compiled CSS with vanilla framework and type scale overrides
3. **`dist/demos/typography-[name].html`** - Interactive demo with baseline grid overlay
4. **`src/generated/_vanilla-settings-automated-overrides-[name].scss`** - Updated with font family and type scale overrides
5. **`src/generated/_generated-styles-[name].scss`** - Completely regenerated baseline-aligned classes

### Vanilla Framework Integration

The generated SCSS overrides vanilla framework variables:

- `$font-family-base` - Font family override
- `$font-size-h1` through `$font-size-h6` - Type scale overrides
- Custom baseline-aligned classes for each element

## Getting Started

1. **Start the development watcher:**
   ```bash
   npm run dev
   ```

2. **View the demos:**
   - Open `dist/index.html` to see all available demos
   - Open `dist/demos/typography-default.html` for the default typescale
   - Open `dist/demos/typography-editorial.html` for the editorial typescale

3. **Edit the typography configs:**
   - Modify `config/typography-config.json` to adjust the default typescale
   - Modify `config/typography-config-editorial.json` to adjust the editorial typescale

## Adding New Typescales

To add a new typescale:

1. **Create a new config file:**
   ```bash
   cp config/typography-config.json config/typography-config-[name].json
   ```

2. **Edit the new config file** with your desired typography settings

3. **The watcher will automatically:**
   - Generate tokens for the new config
   - Create corresponding SCSS files
   - Build CSS for the new config
   - Generate a demo HTML file

4. **Add npm scripts** (optional):
   ```json
   {
     "scripts": {
       "generate:[name]": "npx @lyubomir-popov/baseline-nudge-generator generate config/typography-config-[name].json",
       "build:[name]": "node scripts/build-config.js [name]",
       "demo:[name]": "open dist/demos/typography-[name].html"
     }
   }
   ```

## Responsive Typography Features

The main SCSS file includes responsive typography features based on vanilla framework PR #5521:

- **Responsive font sizes** using `calc()` functions
- **Font size ratio** for larger screens (1.125x)
- **Responsive typography mixin** for custom implementations
- **Baseline grid utilities** for visual alignment
- **Vanilla framework variable overrides** for consistent typography

### Responsive Variables

```scss
$fs-start-size: 0.75rem;  // 12px
$fs-end-size: 0.875rem;   // 14px
$fs-breakpoint: 1800px;   // End breakpoint
$fs-vw-slope: 0.1428vw;   // Calculated slope
$fs-calculation: calc($fs-start-size + $fs-vw-slope);
```

## Baseline Nudge Generator

The baseline nudge generator calculates precise CSS nudges needed to align text to a baseline grid. It:

- Extracts font metrics from TTF/WOFF files
- Calculates exact padding-top values for baseline alignment
- Generates design tokens for use in CSS frameworks
- Creates interactive HTML demos with baseline grid overlay

## Customization

### Changing Fonts

1. Replace the font file in `fonts/`
2. Update the `fontFile` path in the config files
3. The watcher will automatically regenerate tokens

### Adjusting Type Scale

Edit the `elements` array in any config file:

- `fontSize`: Font size in rem units
- `lineHeight`: Line height in baseline units
- `spaceAfter`: Space after element in baseline units

### Adjusting Paragraph + Heading Spacing

To modify the spacing between paragraphs and headings, edit line 61 in `src/main.scss`:

```scss
height: $baseline-unit * 1;  // Change the multiplier (1) to adjust spacing
```

### File Structure

The SCSS is organized into modular files:

- **`src/main.scss`** - Main file that imports everything in the correct order
- **`src/_vanilla-settings-overrides.scss`** - Manual vanilla framework variable overrides (imported first)
- **`src/generated/_vanilla-settings-automated-overrides-[name].scss`** - Auto-generated vanilla overrides from config
- **`src/generated/_generated-styles-[name].scss`** - Auto-generated baseline-aligned classes (imported last)

### Vanilla Framework Variables

The generated SCSS overrides these vanilla framework variables:

- `$font-family-base`
- `$font-size-h1` through `$font-size-h6`
- `$font-size-base`

### Baseline-Aligned Classes

The watcher generates baseline-aligned classes for each typography element:

- `.h1-baseline` through `.h6-baseline`
- `.p-baseline`

These classes include precise padding-top values for baseline grid alignment and are completely regenerated each time.

## Development

The watcher script automatically:

- Monitors all config changes
- Regenerates tokens for each config
- Compiles SCSS to CSS for each config
- Provides real-time feedback

Press `Ctrl+C` to stop the watcher. 