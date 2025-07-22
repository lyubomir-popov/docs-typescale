const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get config name from command line argument
const configName = process.argv[2];

if (!configName) {
  console.error('❌ Please provide a config name (e.g., node scripts/build-config.js default)');
  process.exit(1);
}

// Ensure output directories exist
const CSS_OUTPUT_DIR = 'dist/css';
if (!fs.existsSync(CSS_OUTPUT_DIR)) {
  fs.mkdirSync(CSS_OUTPUT_DIR, { recursive: true });
}

// Build SCSS for specific config
function buildConfig(configName) {
  try {
    console.log(`🔄 Building CSS for ${configName} config...`);
    
    const cssOutputPath = path.join(CSS_OUTPUT_DIR, `${configName}.css`);
    const scssVariable = `typescale-config:${configName}`;
    
    execSync(`npx sass --load-path=node_modules src/main.scss:${cssOutputPath} --style=compressed --variable=${scssVariable}`, { stdio: 'inherit' });
    
    console.log(`✅ CSS built successfully for ${configName}: ${cssOutputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to build CSS for ${configName}:`, error.message);
    return false;
  }
}

// Build the specified config
buildConfig(configName); 