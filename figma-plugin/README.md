# Typography Token Components - Figma Plugin v42

This Figma plugin generates typography components from your typography configuration tokens. It creates a main component with variants for each typography element (h1, h2, h3, h4, h5, h6, p).

## Features

- **Automatic Component Generation**: Creates Figma components from your typography config
- **Variable Font Weight Support**: Uses bound variables to apply precise numeric font weights (450, 200, 250, etc.)
- **Variant Support**: Each typography element becomes a variant of the main component
- **Auto Layout**: Wraps text in auto layout containers with proper spacing
- **Baseline Alignment**: Applies correct nudge top values for baseline alignment
- **Configurable**: Supports both default and editorial typography configurations

## How to Install

1. **Development Mode** (for testing):
   - Open Figma
   - Go to Plugins > Development > New Plugin
   - Choose "Import plugin from manifest"
   - Select the `manifest.json` file from this folder

2. **Production Mode** (for distribution):
   - Package the plugin using Figma's plugin development tools
   - Install the packaged plugin

## How to Use

1. **Open the Plugin**: Go to Plugins > Typography Token Components
2. **Select Configuration**: Choose between "Default" or "Editorial" typography config
3. **Choose Font Family**: Enter the font family name (default: Ubuntu Sans)
4. **Select Paragraph Size**: Choose between 14px or 16px for paragraph text (default: 16px)
5. **Add Sample Text**: Enter text to display in the components
6. **Generate**: Click "Generate Typography Components"

## What Gets Created

For each typography element in your config, the plugin creates:

- **Text Node**: With the specified font size and line height
- **Auto Layout Container**: With proper padding for baseline alignment
- **Component Variant**: Named after the element identifier (h1, h2, etc.)
- **Font Weight Variable**: A number variable bound to the text node's fontWeight property

## Configuration Structure

The plugin uses pre-calculated pixel values from your `tokens.json` file:
- `identifier`: Element name (h1, h2, p, etc.)
- `fontSize`: Font size in pixels (converted from rem values)
- `lineHeight`: Line height in pixels (converted from rem values)
- `spaceAfter`: Space after in pixels (converted from rem values)
- `nudgeTop`: Pre-calculated nudge top value for baseline alignment
- `fontWeight`: **Precise numeric font weight** (450, 200, 250, etc.) applied via bound variables
- `fontStyle`: Font style (normal, italic)

## Calculations

The plugin uses values from your `tokens.json` file:
- **Font Size**: Pre-calculated from rem values (e.g., 2rem = 32px)
- **Line Height**: Pre-calculated from rem values (e.g., 3rem = 48px)
- **Nudge Top**: Pre-calculated baseline alignment value
- **Space After**: Pre-calculated from rem values (e.g., 0.5rem = 8px)

## Example Output

With default config and h1:
- Font Size: 32px (2rem * 16px)
- Line Height: 48px (3rem * 16px)
- Nudge Top: 4.62px (from tokens.json)
- Space After: 8px (0.5rem * 16px)
- Font Weight: 450 (applied via bound variable)

With paragraph size = 16px:
- Paragraph Font Size: 16px (user-selected)
- Line Height: 24px (1.5rem * 16px)
- Nudge Top: 6.56px (from tokens.json)
- Space After: 16px (1rem * 16px)
- Font Weight: 400 (applied via bound variable)

## Data Source

The plugin uses values from your `src/default/tokens.json` file:
- **Default Config**: Uses the "default" configuration based on your tokens
- **Editorial Config**: Uses the "editorial" configuration for alternative styling
- **Font Family**: Defaults to "Ubuntu Sans" to match your project

## Variable Font Weight Implementation

The plugin now uses Figma's variable system to apply precise numeric font weights:

### How It Works

1. **Create Number Variable**: For each typography element, creates a number variable with the exact font weight value
2. **Bind to Text Node**: Uses `setBoundVariable("fontWeight", variableId)` to bind the variable to the text node's fontWeight property
3. **Variable Collection**: Creates a "Typography" variable collection to organize the font weight variables

### Variable Naming

Variables are named using the pattern: `font-weight-{element}-{weight}`
- Example: `font-weight-h1-450`, `font-weight-p-400`

### Fallback Behavior

If variable binding fails (e.g., font doesn't support variable weights), the plugin:
1. Stores the intended weight in plugin data for reference
2. Continues with the loaded font style
3. Logs the error for debugging

## Example Weight Values

```json
{
  "fontWeight": 450,  // Applied as variable font weight
  "fontWeight": 200,  // Applied as variable font weight
  "fontWeight": 250,  // Applied as variable font weight
  "fontWeight": 300,  // Applied as variable font weight
  "fontWeight": 400,  // Applied as variable font weight
  "fontWeight": 550   // Applied as variable font weight
}
```

## Troubleshooting

- **Font Not Found**: Make sure the font family is available in Figma
- **Weight Not Applied**: Check if the font supports variable weights. If not, the weight will be stored in plugin data
- **Variable Binding Failed**: The plugin will fall back to storing the weight in plugin data
- **Component Not Created**: Check that the baseline unit is a positive number
- **Layout Issues**: Verify that the typography config is valid JSON

## Development

To modify the plugin:
1. Edit `code.js` for the main logic
2. Edit `ui.html` for the user interface
3. Update `manifest.json` for plugin metadata
4. Test in Figma's development mode

## Version History

- **v42**: **NEW** - Implemented bound variable approach for precise numeric font weights using Figma's variable system
- **v41**: Reverted to named font weights since Figma's `fontWeight` property is readonly
- **v40**: Attempted to use `setRangeFontWeight()` method (not available)
- **v39**: Attempted to set `fontWeight` property directly (readonly)
- **v38**: Initial variable font weight support (had issues with weight application) 