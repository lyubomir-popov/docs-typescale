# Docs Type Scale

A project that uses the baseline nudge generator to create multiple typescale examples and override vanilla framework variables for precise typographic alignment.

## Type Scale Calculator

This project includes a unified type scale calculator that demonstrates both continuous mathematical formulas and classic typographic scales.

### Shell Script Usage

The `unified-type-scale.sh` script provides two approaches to type scale calculation:

#### Continuous Formula
Uses the mathematical formula `f(i) = f(0) × pow(ratio, i/n)` with discrete octaves:

```bash
./unified-type-scale.sh continuous <f0> <ratio> <n> [rounding]
```

**Example:**
```bash
./unified-type-scale.sh continuous 6 2 30 round
```

This calculates 30 members using the continuous formula with ratio=2, starting from 6, rounded to integers.

#### Classic Typographic Scale
Uses discrete octaves with harmonic ratios (7/6, 4/3, 3/2, 7/4):

```bash
./unified-type-scale.sh classic <f0> <n> [rounding]
```

**Example:**
```bash
./unified-type-scale.sh classic 6 30 round
```

### Rounding Options

- `none` - No rounding (4 decimal places)
- `floor` - Round down to integer
- `round` - Round to nearest integer
- `0.5` - Round to nearest 0.5 (default)

### Web Examples

The `dist/demos/` folder contains interactive web examples:

- **`type-scale-calculator.html`** - Interactive calculator with real-time comparisons
- **`type-scale-demo.html`** - Visual demonstration of scales applied to typography
- **`type-scale-examples.html`** - Index page linking to all examples

### Key Differences

- **Continuous Formula**: Uses mathematical progression within discrete octaves
- **Classic Scale**: Uses specific harmonic ratios (7/6, 4/3, 3/2, 7/4) within octaves
- Both approaches use the same octave structure (5 members per octave)
- Values are within margin of error when using the same parameters

## How the Project Works

### Multiple Typescale Configurations

The project now supports **multiple typescale configurations** for different use cases:

- **Default Typescale** (`config/typography-config.json`): Optimized for technical documentation
- **Editorial Typescale** (`config/typography-config-editorial.json`): Designed for long-form content

### Main Configuration: `config/typography-config-[name].json`

Each typescale has its own configuration file following the pattern `config/typography-config-[name].json`. This is where you define:

- **Baseline unit** (`baselineUnit`): The fundamental spacing unit
- **Font files** (`fontFiles`): Array of font file definitions with family and path
- **Typography elements** (`elements`): Array of heading and paragraph definitions with:
  - `fontSize`: Font size in rem units
  - `lineHeight`: Line height in baseline units  
  - `spaceAfter`: Space after element in baseline units
  - `fontWeight`: **Variable font weight** (100-900, supports precise values like 450, 200, 250)
  - `fontStyle`: Font style (normal, italic)
  - `fontFamily`: Font family reference

Example configurations:

**Default (Documentation):**
```json
{
  "baselineUnit": 0.5,
  "fontFiles": [
    {
      "family": "sans",
      "path": "../fonts/UbuntuSans-Regular.woff"
    }
  ],
  "elements": [
    {
      "identifier": "h1",
      "fontSize": 2,
      "lineHeight": 6,
      "spaceAfter": 1,
      "fontFamily": "sans",
      "fontWeight": 450,
      "fontStyle": "normal"
    },
    {
      "identifier": "p",
      "fontSize": 0.875,
      "lineHeight": 2.5,
      "spaceAfter": 2,
      "fontFamily": "sans",
      "fontWeight": 400,
      "fontStyle": "normal"
    }
  ]
}
```

**Editorial (Long-form):**
```json
{
  "baselineUnit": 0.5,
  "fontFiles": [
    {
      "family": "sans",
      "path": "../fonts/UbuntuSans-Regular.woff"
    }
  ],
  "elements": [
    {
      "identifier": "h1",
      "fontSize": 2.5,
      "lineHeight": 6,
      "spaceAfter": 2,
      "fontFamily": "sans",
      "fontWeight": 600,
      "fontStyle": "normal"
    },
    {
      "identifier": "p",
      "fontSize": 1.125,
      "lineHeight": 4,
      "spaceAfter": 2,
      "fontFamily": "sans",
      "fontWeight": 400,
      "fontStyle": "normal"
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
│   ├── main-default.scss                  # Main SCSS file for default typescale
│   ├── main-editorial.scss                # Main SCSS file for editorial typescale
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
- `npm run generate` - Generate tokens for both docs and editorial configs
- `npm run generate:docs` - Generate tokens for docs config
- `npm run generate:editorial` - Generate tokens for editorial config
- `npm run build:docs` - Build CSS for docs config only
- `npm run build:editorial` - Build CSS for editorial config only
- `npm run demo:docs` - Open docs demo in browser
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
   - Open `dist/demos/typography-docs.html` for the docs typescale
   - Open `dist/demos/typography-editorial.html` for the editorial typescale

3. **Edit the typography configs:**
   - Modify `config/typography-config-docs.json` to adjust the docs typescale
   - Modify `config/typography-config-editorial.json` to adjust the editorial typescale

## Benefits of Separate Main SCSS Files

Each typescale now has its own dedicated main SCSS file:

- **`src/main-default.scss`** - For the default documentation typescale
- **`src/main-editorial.scss`** - For the editorial long-form typescale

This approach provides several advantages:

1. **Simultaneous Development** - You can work on both typescales independently without conflicts
2. **Clear Separation** - Each typescale has its own complete SCSS structure
3. **Independent Compilation** - Each can be compiled separately without affecting the other
4. **Easier Debugging** - Issues in one typescale don't affect the other
5. **Better Organization** - Clear file structure makes it easy to understand which files belong to which typescale

## Adding New Typescales

To add a new typescale:

1. **Create a new config file:**
   ```bash
   cp config/typography-config-docs.json config/typography-config-[name].json
   ```

2. **Create a new main SCSS file:**
   ```bash
   cp src/docs/main.scss src/[name]/main.scss
   ```

3. **Edit the new files:**
   - Update the config file with your desired typography settings
   - Update the main SCSS file to import the correct generated files for your config

4. **The watcher will automatically:**
   - Generate tokens for the new config
   - Create corresponding SCSS files in `src/generated/`
   - Build CSS for the new config
   - Generate a demo HTML file

5. **Add npm scripts** (optional):
   ```json
   {
     "scripts": {
       "generate:[name]": "npx @lyubomir-popov/baseline-nudge-generator generate config/typography-config-[name].json",
       "build:[name]": "sass --load-path=node_modules src/main-[name].scss:dist/css/[name].css --style=compressed",
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

## Variable Font Weight Support

This project fully supports **variable font weights** with precise numeric values (100-900). Unlike traditional font weights limited to named values (light, normal, bold), variable fonts allow for:

- **Precise weight control**: Values like 450, 200, 250, 350, etc.
- **Smooth transitions**: Any weight between 100-900
- **Better typography**: More nuanced weight variations for better hierarchy

### Variable Font Weight Examples

```json
{
  "fontWeight": 450,  // Between normal (400) and medium (500)
  "fontWeight": 200,  // Very light weight
  "fontWeight": 250,  // Light weight
  "fontWeight": 350,  // Between light (300) and normal (400)
  "fontWeight": 600,  // Semi-bold
  "fontWeight": 700   // Bold
}
```

### Browser Support

Variable font weights work in all modern browsers that support CSS `font-weight` with numeric values. The generated CSS uses the exact weight values from your config without any conversion.

## Baseline Nudge Generator

The baseline nudge generator calculates precise CSS nudges needed to align text to a baseline grid. It:

- Extracts font metrics from TTF/WOFF files
- Calculates exact padding-top values for baseline alignment
- Generates design tokens for use in CSS frameworks
- Creates interactive HTML demos with baseline grid overlay
- **Supports variable font weights** with precise numeric values

## Customization

### Changing Fonts

1. Replace the font file in `fonts/`
2. Update the `fontFile` path in the config files
3. The watcher will automatically regenerate tokens

### Adjusting Type Scale

Edit the `elements` array in any config file:

- `fontSize`: Font size in rem units
- `lineHeight`: Line height in baseline units (supports fractional values like 2.5)
- `spaceAfter`: Space after element in baseline units (supports fractional values)

**Note:** The baseline-nudge-generator now supports fractional line heights and spacing values (multiples of 0.5), allowing for more precise typographic control.

### Adjusting Paragraph + Heading Spacing

To modify the spacing between paragraphs and headings, edit line 61 in `src/main.scss`:

```scss
height: $baseline-unit * 1;  // Change the multiplier (1) to adjust spacing
```

### File Structure

The SCSS is organized into modular files:

- **`src/main-[name].scss`** - Dedicated main file for each typescale (e.g., `main-default.scss`, `main-editorial.scss`)
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