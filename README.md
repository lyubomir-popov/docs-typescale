# Docs Type Scale

A project that uses the baseline nudge generator to create a type scale and override vanilla framework variables for precise typographic alignment.

## How the Project Works

### Main Configuration: `config/typography-config.json`

The **primary settings file** is `config/typography-config.json`. This is where you define:

- **Baseline unit** (`baselineUnit`): The fundamental spacing unit (currently 0.4375rem)
- **Font file** (`fontFile`): Path to the font file for metrics extraction
- **Typography elements** (`elements`): Array of heading and paragraph definitions with:
  - `fontSize`: Font size in rem units
  - `lineHeight`: Line height in baseline units  
  - `spaceAfter`: Space after element in baseline units

Example configuration:
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
│   └── typography-config.json    # Main configuration file (baseline nudge generator config)
├── dist/
│   ├── tokens.json               # Generated design tokens
│   ├── main.css                  # Compiled CSS with vanilla overrides
│   ├── index.html                # HTML demo with baseline grid
│   └── fonts/                    # Font files for demo
├── src/
│   ├── main.scss                 # Main SCSS file (imports other files)
│   ├── _vanilla-settings-overrides.scss   # Vanilla framework variable overrides
│   ├── _vanilla-settings-automated-overrides.scss  # Auto-generated vanilla overrides
│   └── _generated-styles.scss    # Auto-generated baseline-aligned classes
├── scripts/
│   └── watch.js                  # Watcher script that monitors config changes
└── fonts/
    └── UbuntuSans-Regular.woff  # Font file for metrics extraction
```

## Usage

### Available Scripts

- `npm run dev` - Start the development watcher (main command)
- `npm run watch` - Start the watcher to monitor typography config changes
- `npm run build` - Build once (generate tokens and compile CSS)
- `npm run generate` - Generate tokens only

### Watcher Script

The watcher script (`scripts/watch.js`) does the following:

1. **Monitors** `config/typography-config.json` for changes
2. **Generates tokens** using the baseline nudge generator
3. **Updates automated vanilla overrides** in `src/_vanilla-settings-automated-overrides.scss`
4. **Generates baseline styles** in `src/_generated-styles.scss` (completely overwritten)
5. **Compiles SCSS to CSS** with vanilla framework included

### Generated Output

The build process generates:

1. **`dist/tokens.json`** - Design tokens with calculated nudge values
2. **`dist/main.css`** - Compiled CSS with vanilla framework and type scale overrides
3. **`dist/index.html`** - Interactive demo with baseline grid overlay
4. **`src/_vanilla-settings-automated-overrides.scss`** - Updated with font family and type scale overrides
5. **`src/_generated-styles.scss`** - Completely regenerated baseline-aligned classes

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

2. **Edit the typography config:**
   Modify `config/typography-config.json` to adjust your type scale

3. **View the results:**
   - Open `dist/index.html` to see the baseline grid demo
   - Open `demo-baseline.html` to see a comprehensive usage example
   - Use `dist/main.css` in your project for the compiled styles

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
2. Update the `fontFile` path in `config/typography-config.json`
3. The watcher will automatically regenerate tokens

### Adjusting Type Scale

Edit the `elements` array in `config/typography-config.json`:

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
- **`src/_vanilla-settings-automated-overrides.scss`** - Auto-generated vanilla overrides from config
- **`src/_generated-styles.scss`** - Auto-generated baseline-aligned classes (imported last)

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

- Monitors config changes
- Regenerates tokens
- Compiles SCSS to CSS
- Provides real-time feedback

Press `Ctrl+C` to stop the watcher. 