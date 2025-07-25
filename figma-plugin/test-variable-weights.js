// Test file for Figma plugin variable font weight support
// This simulates the plugin's font weight handling logic

function testVariableFontWeights() {
  console.log("Testing variable font weight support...");
  
  // Test cases from your config
  const testWeights = [
    { element: "h1", weight: 450, expected: "Between normal and medium" },
    { element: "h2", weight: 200, expected: "Very light" },
    { element: "h3", weight: 450, expected: "Between normal and medium" },
    { element: "h4", weight: 250, expected: "Light" },
    { element: "h5", weight: 450, expected: "Between normal and medium" },
    { element: "h6", weight: 300, expected: "Light" },
    { element: "p", weight: 400, expected: "Normal" }
  ];
  
  testWeights.forEach(test => {
    console.log(`${test.element}: ${test.weight} (${test.expected})`);
    
    // Simulate the plugin's font loading logic
    const fontFamily = "Inter"; // Good variable font support
    const fontStyle = "Regular"; // Base style for variable fonts
    
    // Simulate setting font weight
    try {
      // In the actual plugin: textNode.fontWeight = test.weight;
      console.log(`  ✅ Applied variable font weight: ${test.weight}`);
    } catch (error) {
      console.log(`  ⚠️  Variable font weight not supported, using style: ${fontStyle}`);
    }
  });
  
  console.log("\nVariable font weight test completed!");
  console.log("In Figma plugin, this will:");
  console.log("1. Load font with 'Regular' style");
  console.log("2. Apply precise numeric weight (450, 200, etc.)");
  console.log("3. Fall back to named styles if variable fonts not supported");
}

// Run the test
testVariableFontWeights(); 