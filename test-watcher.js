const chokidar = require('chokidar');
const path = require('path');

console.log('🧪 Testing file watcher...');
console.log('📁 Watching config/typography-config.json');

const watcher = chokidar.watch('config/typography-config.json', {
  persistent: true,
  ignoreInitial: false,
  usePolling: true,
  interval: 1000
});

watcher.on('change', (filePath) => {
  console.log(`✅ File changed: ${filePath}`);
  console.log(`⏰ Time: ${new Date().toISOString()}`);
});

watcher.on('error', (error) => {
  console.error('❌ Watcher error:', error);
});

console.log('🚀 Test watcher started. Modify config/typography-config.json to test...');
console.log('🛑 Press Ctrl+C to stop');

process.on('SIGINT', () => {
  console.log('\n🛑 Stopping test watcher...');
  watcher.close();
  process.exit(0);
}); 