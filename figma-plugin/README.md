# Typography Token Components - Figma Plugin v63

This Figma plugin generates typography components from your typography configuration tokens. It creates a main component with variants for each typography element (h1, h2, h3, h4, h5, h6, p).

## Recent Improvements (v63)

**Dynamic Token Loading**: Plugin now automatically reads actual token files
- **No More Hardcoding**: Plugin data is automatically updated from `src/docs/tokens.json` and `src/editorial/tokens.json`
- **Automatic Updates**: Run `npm run generate:docs` or `npm run generate:editorial` to update the plugin
- **Always Current**: Plugin always uses the latest typography configurations
- **Seamless Workflow**: Changes to config files automatically update the plugin

## How It Works

1. **Generate Tokens**: Run `npm run generate:docs` or `npm run generate:editorial`
2. **Auto-Update Plugin**: The script automatically updates the plugin's embedded data
3. **Use in Figma**: The plugin now uses your current typography configurations

## Features

- **Automatic Component Generation**: Creates Figma components from your typography config
- **Variable Font Weight Support**: Uses bound variables to apply precise numeric font weights (450, 200, 250, etc.)
- **Variant Support**: Each typography element becomes a variant of the main component
- **Auto Layout**: Wraps text in auto layout containers with proper spacing
- **Baseline Alignment**: Applies correct nudge top values for baseline alignment
- **Configurable**: Supports both docs and editorial typography configurations
- **Dynamic Updates**: Automatically syncs with your current token files

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

1. **Generate Tokens**: Run `npm run generate:docs` or `npm run generate:editorial`
2. **Open the Plugin**: Go to Plugins > Typography Token Components
3. **Select Configuration**: Choose between "Docs" or "Editorial" typography config
4. **Choose Font Family**: Enter the font family name (default: Ubuntu Sans)
5. **Generate**: Click "Generate Typography Components"

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

With docs config and h1:
- Font Size: 32px (2rem * 16px)
- Line Height: 40px (2.5rem * 16px)
- Nudge Top: 0.62px (from tokens.json)
- Space After: 8px (0.5rem * 16px)
- Font Weight: 500 (applied via bound variable)

With editorial config and h1:
- Font Size: 42px (2.625rem * 16px)
- Line Height: 48px (3rem * 16px)
- Nudge Top: 1.1px (from tokens.json)
- Space After: 16px (1rem * 16px)
- Font Weight: 500 (applied via bound variable)

## Data Source

The plugin automatically reads from your token files:
- **Docs Config**: Uses `src/docs/tokens.json` for documentation typography
- **Editorial Config**: Uses `src/editorial/tokens.json` for long-form content
- **Font Family**: Defaults to "Ubuntu Sans" to match your project

## Variable Font Weight Implementation

The plugin now uses Figma's variable system to apply precise numeric font weights:

### How It Works

1. **Create Number Variable**: For each unique font weight, creates a number variable
2. **Bind to Text Node**: Uses `setBoundVariable("fontWeight", variable)` to bind the weight
3. **Fallback Support**: If variable binding fails, tries named font styles
4. **Plugin Data**: Stores intended weight in plugin data for reference

### Variable Font Weight Examples

```javascript
// Creates variables like:
// FontWeight450 = 450
// FontWeight200 = 200
// FontWeight550 = 550

// Then binds them to text nodes:
textNode.setBoundVariable("fontWeight", fontWeightVar);
```

### Benefits

- **Precise Control**: Exact numeric weights (450, 200, 250, etc.)
- **Variable Fonts**: Works with variable fonts like Inter, Roboto
- **Consistent**: Same weight values across all components
- **Editable**: Users can modify the variable values to adjust all instances

## Troubleshooting

### Common Issues

1. **Font Not Found**: The plugin will try fallback fonts (Inter, Arial, etc.)
2. **Variable Binding Fails**: Plugin falls back to named font styles
3. **Component Creation Fails**: Check that you have a font loaded in Figma

### Debug Information

The plugin provides detailed notifications:
- Font loading success/failure
- Variable binding status
- Component creation progress
- Error messages with specific details

## Development

To update the plugin when config files change:

1. **Update Config Files**: Modify `config/typography-config-docs.json` or `config/typography-config-editorial.json`
2. **Generate Tokens**: Run `npm run generate:docs` or `npm run generate:editorial`
3. **Auto-Update**: The script automatically updates the plugin's embedded data
4. **Test**: Run the plugin to verify the changes work correctly

## Changelog

### v63 (Latest)
- **Added**: Dynamic token loading from actual token files
- **Added**: Automatic plugin updates when running generate commands
- **Improved**: No more manual hardcoding of plugin data
- **Added**: Seamless workflow between config changes and plugin updates

### v62
- **Fixed**: Plugin data now matches current typography config files
- **Updated**: All font sizes, line heights, weights, and spacing values
- **Improved**: Better error handling and notifications

### v61
- **Added**: Variable font weight support
- **Added**: Editorial typography configuration
- **Improved**: Auto layout and baseline alignment 