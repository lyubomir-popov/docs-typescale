const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chokidar = require('chokidar');

// Ensure chokidar is installed
try {
  require('chokidar');
} catch (e) {
  console.log('Installing chokidar for file watching...');
  execSync('npm install --save-dev chokidar', { stdio: 'inherit' });
}

const CONFIG_DIR = 'config';
const TOKENS_DIR = 'dist/tokens';
const GENERATED_STYLES_DIR = 'src';
const CSS_OUTPUT_DIR = 'dist/css';
const DEMO_OUTPUT_DIR = 'dist/demos';

// Ensure output directories exist
function ensureDirectories() {
  const dirs = [TOKENS_DIR, GENERATED_STYLES_DIR, CSS_OUTPUT_DIR, DEMO_OUTPUT_DIR];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

function getConfigFiles() {
  const configPath = path.join(process.cwd(), CONFIG_DIR);
  if (!fs.existsSync(configPath)) {
    return [];
  }
  
  return fs.readdirSync(configPath)
    .filter(file => file.startsWith('typography-config') && file.endsWith('.json'))
    .map(file => path.join(CONFIG_DIR, file));
}

function getConfigName(configPath) {
  const filename = path.basename(configPath, '.json');
  // Extract the name part after "typography-config-"
  const match = filename.match(/typography-config-(.+)/);
  return match ? match[1] : 'default';
}

function generateTokens(configPath) {
  try {
    const configName = getConfigName(configPath);
    console.log(`🔄 Generating tokens for ${configName} from ${configPath}...`);
    execSync(`npx @lyubomir-popov/baseline-nudge-generator generate ${configPath}`, { stdio: 'inherit' });
    console.log(`✅ Tokens generated successfully for ${configName}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to generate tokens for ${configPath}:`, error.message);
    return false;
  }
}

function createVanillaOverrides(configPath) {
  try {
    const configName = getConfigName(configPath);
    const tokensPath = path.join(TOKENS_DIR, `${configName}-tokens.json`);
    
    if (!fs.existsSync(tokensPath)) {
      console.error(`❌ Tokens file not found for ${configName}. Run the generator first.`);
      return false;
    }

    const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
    
    // Ensure the config directory exists
    const configDir = path.join(GENERATED_STYLES_DIR, configName);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    
    // Update vanilla overrides file
    updateVanillaOverrides(tokens, configName);
    
    // Generate baseline-aligned styles file
    generateBaselineStyles(tokens, configName);
    
    // Compile SCSS to CSS
    console.log(`🔄 Compiling SCSS to CSS for ${configName}...`);
    const mainScssFile = `src/${configName}/main.scss`;
    const cssOutputPath = path.join(CSS_OUTPUT_DIR, `${configName}.css`);
    execSync(`npx sass --load-path=node_modules ${mainScssFile}:${cssOutputPath} --style=compressed`, { stdio: 'inherit' });
    console.log(`✅ CSS compiled successfully for ${configName}`);
    
    // Generate demo HTML
    generateDemoHTML(configName, cssOutputPath);
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to create vanilla overrides for ${configPath}:`, error.message);
    return false;
  }
}

function updateVanillaOverrides(tokens, configName) {
  try {
    const automatedOverridesPath = path.join(GENERATED_STYLES_DIR, configName, `_vanilla-settings-automated-overrides.scss`);
    
    // Generate automated overrides content completely from scratch
    let automatedContent = `// =============================================================================
// AUTOMATED VANILLA SETTINGS OVERRIDES - ${configName.toUpperCase()}
// =============================================================================
// This file is auto-generated from config/typography-config-${configName}.json
// Do not edit manually - changes will be overwritten

// Generated from baseline nudge generator tokens
// Last updated: ${new Date().toISOString()}

// Font family from config
$font-family-base: '${tokens.font}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

// Baseline unit from config
$baseline-unit: ${parseFloat(tokens.baselineUnit)}rem;

// Typography scale overrides from config
`;

    fs.writeFileSync(automatedOverridesPath, automatedContent);
    console.log(`✅ Automated vanilla settings overrides updated for ${configName}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to update automated vanilla overrides for ${configName}:`, error.message);
    return false;
  }
}

function generateBaselineStyles(tokens, configName) {
  try {
    // Generate baseline-aligned styles content
    let stylesContent = `// =============================================================================
// GENERATED STYLES - ${configName.toUpperCase()}
// =============================================================================
// This file is auto-generated by the baseline nudge generator
// Do not edit manually - changes will be overwritten

// Generated from baseline nudge generator tokens
// Last updated: ${new Date().toISOString()}

// Override vanilla framework heading styles with baseline-aligned versions
`;

    // Generate baseline-aligned classes for each element
    Object.entries(tokens.elements).forEach(([element, styles]) => {
      const fontSize = parseFloat(styles.fontSize);
      const lineHeight = parseFloat(styles.lineHeight);
      const spaceAfter = parseFloat(styles.spaceAfter);
      const nudgeTop = parseFloat(styles.nudgeTop);
      const marginBottom = spaceAfter - nudgeTop;

      // Generate full CSS rules that override vanilla framework defaults
      stylesContent += `${element} {
  font-size: ${fontSize}rem;
  line-height: ${lineHeight}rem;
  font-weight: ${styles.fontWeight};
  padding-top: ${nudgeTop}rem;
  margin-bottom: ${marginBottom}rem;
  margin-top: 0;
  font-family: $font-family-base;
}

`;
    });

    const generatedStylesPath = path.join(GENERATED_STYLES_DIR, configName, `_generated-styles.scss`);
    fs.writeFileSync(generatedStylesPath, stylesContent);
    console.log(`✅ Generated styles updated for ${configName}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to generate baseline styles for ${configName}:`, error.message);
    return false;
  }
}

function generateDemoHTML(configName, cssPath) {
  try {
    const demoContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Typography Demo - ${configName.charAt(0).toUpperCase() + configName.slice(1)}</title>
    <link rel="stylesheet" href="../css/${configName}.css">
    <style>
        body {
            margin: 0;
            padding: 2rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .demo-container {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
        }
        .baseline-grid {
            background: linear-gradient(to top, rgba(255, 0, 0, 0.15), rgba(255, 0, 0, 0.15) 1px, transparent 1px, transparent);
            background-size: 100% var(--baseline-unit, 0.5rem);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 1;
        }
        .content {
            position: relative;
            z-index: 2;
        }
        .toggle-grid {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            padding: 0.5rem 1rem;
            background: #333;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .toggle-grid:hover {
            background: #555;
        }
    </style>
</head>
<body>
    <button class="toggle-grid" onclick="toggleGrid()">Toggle Baseline Grid</button>
    
    <div class="demo-container">
        <div class="baseline-grid" id="baseline-grid"></div>
        <div class="content">
            <h1>Typography Demo - ${configName.charAt(0).toUpperCase() + configName.slice(1)}</h1>
            
            <p>This is a demonstration of the ${configName} typescale. The baseline grid overlay shows how text aligns to the baseline grid.</p>
            
            <h2>Heading Level 2</h2>
            <p>This paragraph demonstrates the spacing and alignment between headings and paragraphs. The baseline grid ensures consistent vertical rhythm throughout the document.</p>
            
            <h3>Heading Level 3</h3>
            <p>Each heading level has been carefully calibrated to maintain proper spacing and alignment. The baseline unit provides a consistent foundation for all typography.</p>
            
            <h4>Heading Level 4</h4>
            <p>Notice how all text elements align perfectly to the baseline grid. This creates a harmonious visual rhythm that improves readability and overall design quality.</p>
            
            <h5>Heading Level 5</h5>
            <p>The spacing between elements is calculated based on the baseline unit, ensuring consistent vertical rhythm. This approach works well for both short and long-form content.</p>
            
            <h6>Heading Level 6</h6>
            <p>This typescale is designed specifically for ${configName} content. The font sizes, line heights, and spacing have been optimized for this particular use case.</p>
            
            <h2>Another Section</h2>
            <p>You can toggle the baseline grid overlay using the button in the top-right corner. This helps visualize how the typography aligns to the baseline grid.</p>
            
            <h3>Technical Details</h3>
            <p>The baseline grid is calculated using the baseline unit from the configuration. Each text element includes precise padding-top values to ensure perfect alignment.</p>
        </div>
    </div>

    <script>
        function toggleGrid() {
            const grid = document.getElementById('baseline-grid');
            grid.style.display = grid.style.display === 'none' ? 'block' : 'none';
        }
    </script>
</body>
</html>`;

    const demoPath = path.join(DEMO_OUTPUT_DIR, `typography-${configName}.html`);
    fs.writeFileSync(demoPath, demoContent);
    console.log(`✅ Demo HTML generated for ${configName}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to generate demo HTML for ${configName}:`, error.message);
    return false;
  }
}

function processConfig(configPath) {
  console.log(`\n🔄 Processing typography config: ${configPath}`);
  
  if (generateTokens(configPath)) {
    createVanillaOverrides(configPath);
  }
  
  console.log(`✅ Processing complete for ${configPath}\n`);
}

function processAllConfigs() {
  console.log('\n🔄 Processing all typography configs...');
  
  const configFiles = getConfigFiles();
  if (configFiles.length === 0) {
    console.log('❌ No typography config files found in config/ directory');
    return;
  }
  
  configFiles.forEach(configPath => {
    processConfig(configPath);
  });
  
  console.log('✅ All configs processed\n');
}

// Check if build-only mode is requested
const isBuildOnly = process.argv.includes('--build-only');

if (isBuildOnly) {
  console.log('🔨 Building all configs once...');
  ensureDirectories();
  processAllConfigs();
  process.exit(0);
}

// Set up file watcher
console.log('👀 Watching for changes in typography config and SCSS files...');
console.log('📁 Watching config/ directory and src/ directories');

ensureDirectories();

// Watch all relevant files for both demos
const watchPaths = [
  path.join(process.cwd(), CONFIG_DIR, 'typography-config-*.json'),
  path.join(process.cwd(), 'src/default/*.scss'),
  path.join(process.cwd(), 'src/editorial/*.scss'),
  path.join(process.cwd(), 'src/default/main.scss'),
  path.join(process.cwd(), 'src/editorial/main.scss')
];

const watcher = chokidar.watch(watchPaths, {
  persistent: true,
  ignoreInitial: false,
  usePolling: true,
  interval: 1000
});

watcher.on('change', (filePath) => {
  console.log(`📝 File changed: ${filePath}`);
  
  // Determine which configs need to be rebuilt
  const configFiles = getConfigFiles();
  if (configFiles.length === 0) {
    console.log('❌ No typography config files found in config/ directory');
    return;
  }
  
  // Rebuild all configs when any file changes
  console.log('🔄 Rebuilding all demos...');
  configFiles.forEach(configPath => {
    processConfig(configPath);
  });
  console.log('✅ All demos rebuilt\n');
});

watcher.on('add', (filePath) => {
  console.log(`📝 New file added: ${filePath}`);
  
  // Rebuild all configs when any file is added
  const configFiles = getConfigFiles();
  if (configFiles.length > 0) {
    console.log('🔄 Rebuilding all demos...');
    configFiles.forEach(configPath => {
      processConfig(configPath);
    });
    console.log('✅ All demos rebuilt\n');
  }
});

watcher.on('error', (error) => {
  console.error('❌ Watcher error:', error);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping watcher...');
  watcher.close();
  process.exit(0);
});

console.log('🚀 Watcher started. Press Ctrl+C to stop.'); 