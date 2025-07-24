# Typography Token Components - Figma Plugin

This Figma plugin generates typography components from your typography configuration tokens. It creates a main component with variants for each typography element (h1, h2, h3, h4, h5, h6, p).

## Features

- **Automatic Component Generation**: Creates Figma components from your typography config
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

## Configuration Structure

The plugin uses pre-calculated pixel values from your `tokens.json` file:
- `identifier`: Element name (h1, h2, p, etc.)
- `fontSize`: Font size in pixels (converted from rem values)
- `lineHeight`: Line height in pixels (converted from rem values)
- `spaceAfter`: Space after in pixels (converted from rem values)
- `nudgeTop`: Pre-calculated nudge top value for baseline alignment

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

With paragraph size = 16px:
- Paragraph Font Size: 16px (user-selected)
- Line Height: 24px (1.5rem * 16px)
- Nudge Top: 6.56px (from tokens.json)
- Space After: 16px (1rem * 16px)

## Data Source

The plugin uses values from your `src/default/tokens.json` file:
- **Default Config**: Uses the "default" configuration based on your tokens
- **Editorial Config**: Uses the "editorial" configuration for alternative styling
- **Font Family**: Defaults to "Ubuntu Sans" to match your project

## Troubleshooting

- **Font Not Found**: Make sure the font family is available in Figma
- **Component Not Created**: Check that the baseline unit is a positive number
- **Layout Issues**: Verify that the typography config is valid JSON

## Development

To modify the plugin:
1. Edit `code.js` for the main logic
2. Edit `ui.html` for the user interface
3. Update `manifest.json` for plugin metadata
4. Test in Figma's development mode 