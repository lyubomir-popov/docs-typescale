# Docs Type Scale

A project that uses the baseline nudge generator to create a type scale and override vanilla framework variables for precise typographic alignment.

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
│   └── typography-config.json    # Baseline nudge generator configuration
├── dist/
│   ├── tokens.json               # Generated design tokens
│   ├── main.css                  # Compiled CSS with vanilla overrides
│   ├── index.html                # HTML demo with baseline grid
│   └── fonts/                    # Font files for demo
├── src/
│   ├── main.scss                 # Main SCSS file (imports other files)
│   ├── _vanilla-settings-overrides.scss   # Vanilla framework variable overrides
│   └── _generated-styles.scss    # Auto-generated baseline-aligned classes
├── scripts/
│   └── watch.js                  # Watcher script
└── fonts/
    └── FiraSans-Regular.ttf     # Font file for metrics extraction
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
3. **Updates vanilla overrides** in `src/_vanilla-settings-overrides.scss`
4. **Generates baseline styles** in `src/_generated-styles.scss` (completely overwritten)
5. **Compiles SCSS to CSS** with vanilla framework included

### Typography Configuration

The `config/typography-config.json` file defines your type scale:

```json
{
  "baselineUnit": 0.5,
  "fontFile": "../fonts/FiraSans-Regular.ttf",
  "elements": [
    {
      "identifier": "h1",
      "fontSize": 5.25,
      "lineHeight": 10,
      "spaceAfter": 3
    },
    {
      "identifier": "p",
      "fontSize": 1,
      "lineHeight": 3,
      "spaceAfter": 3
    }
  ]
}
```

### Generated Output

The build process generates:

1. **`dist/tokens.json`** - Design tokens with calculated nudge values
2. **`dist/main.css`** - Compiled CSS with vanilla framework and type scale overrides
3. **`dist/index.html`** - Interactive demo with baseline grid overlay
4. **`src/_vanilla-settings-overrides.scss`** - Updated with font family and type scale overrides
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
   - Open `demo.html` to see a comprehensive usage example
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
$font-size-base: calc(0.8rem + 0.2vw);
$font-size-largescreen: 1.125rem;
$font-size-ratio--largescreen: 1.125;
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

### File Structure

The SCSS is organized into modular files:

- **`src/main.scss`** - Main file that imports everything in the correct order
- **`src/_vanilla-settings-overrides.scss`** - Vanilla framework variable overrides (imported first)
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