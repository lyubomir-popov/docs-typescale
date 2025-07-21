const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

console.log('🧪 Testing SCSS file watcher...');
console.log('📁 Current directory:', process.cwd());
console.log('📁 Watching src/main.scss specifically');

// Check if the file exists
const scssPath = path.join(process.cwd(), 'src/main.scss');
console.log('📄 File path:', scssPath);
console.log('📄 File exists:', fs.existsSync(scssPath));

const watcher = chokidar.watch(scssPath, {
  persistent: true,
  ignoreInitial: false,
  usePolling: true,
  interval: 1000
});

watcher.on('change', (filePath) => {
  console.log(`✅ SCSS file changed: ${filePath}`);
  console.log(`⏰ Time: ${new Date().toISOString()}`);
});

watcher.on('error', (error) => {
  console.error('❌ Watcher error:', error);
});

console.log('🚀 Test SCSS watcher started. Modify src/main.scss to test...');
console.log('🛑 Press Ctrl+C to stop');

process.on('SIGINT', () => {
  console.log('\n🛑 Stopping test watcher...');
  watcher.close();
  process.exit(0);
}); 