figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate-components') {
    await generateTypographyComponents(msg.config, msg.baselineUnit, msg.fontFamily, msg.paragraphSize);
  }
};

async function generateTypographyComponents(config, baselineUnit, fontFamily, paragraphSize) {
  try {
    // Debug: Log the font family we're trying to load
    figma.notify(`Attempting to load font: ${fontFamily}`);
    
    // Create the main auto-layout container
    const mainContainer = figma.createFrame();
    mainContainer.name = "Typography Components";
    mainContainer.layoutMode = "VERTICAL";
    mainContainer.primaryAxisSizingMode = "AUTO"; // Let width be determined by content
    mainContainer.counterAxisSizingMode = "AUTO"; // This makes height hug contents
    mainContainer.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]; // White background
    mainContainer.itemSpacing = 0; // No spacing between components
    
    // Create components for each typography element
    for (let i = 0; i < config.elements.length; i++) {
      const element = config.elements[i];
      
      // Use pre-calculated pixel values from tokens.json
      let fontSize = element.fontSize;
      // Override paragraph font size based on user selection
      if (element.identifier === 'p') {
        fontSize = paragraphSize;
      }
      
      const lineHeight = element.lineHeight;
      const nudgeTop = element.nudgeTop;
      const spaceAfter = element.spaceAfter;
      const fontWeight = element.fontWeight || 400; // Default to 400 if not specified
      const fontStyle = element.fontStyle || "normal";
      
      // Calculate margin-bottom: spaceAfter - nudgeTop
      const marginBottom = spaceAfter - nudgeTop;
      
      // Create meaningful text for this element
      const configName = element.fontSize === 36 ? "editorial" : "docs";
      const text = `This is an ${element.identifier} from the ${configName} type scale: fs/lh: ${fontSize}/${lineHeight}px, weight ${fontWeight}`;
      
      // Load appropriate font style based on weight
      let loadedFontStyle = "Regular";
      let loadedFontFamily = fontFamily;
      
      // Map weight to standard font style names that Figma supports
      let targetStyle = "Regular";
      if (fontWeight <= 100) targetStyle = "Thin";
      else if (fontWeight <= 200) targetStyle = "ExtraLight";
      else if (fontWeight <= 300) targetStyle = "Light";
      else if (fontWeight <= 400) targetStyle = "Regular";
      else if (fontWeight <= 500) targetStyle = "Medium";
      else if (fontWeight <= 600) targetStyle = "SemiBold";
      else if (fontWeight <= 700) targetStyle = "Bold";
      else if (fontWeight <= 800) targetStyle = "ExtraBold";
      else targetStyle = "Black";
      
      // For weight 200, try multiple light style names
      let styleAttempts = [targetStyle, "Regular"];
      if (fontWeight <= 200) {
        styleAttempts = ["ExtraLight", "UltraLight", "Light", "Regular"];
      }
      
      let fontLoaded = false;
      for (const style of styleAttempts) {
        try {
          await figma.loadFontAsync({ family: fontFamily, style: style });
          loadedFontStyle = style;
          figma.notify(`Successfully loaded: ${fontFamily} ${style} for weight ${fontWeight}`);
          fontLoaded = true;
          break;
        } catch (error) {
          // Try next style
          continue;
        }
      }
      
      // If the specified font family failed, try fallback fonts
      if (!fontLoaded) {
        figma.notify(`Font ${fontFamily} not found, trying fallback fonts...`);
        const fallbackFonts = ["Inter", "Arial", "Helvetica", "Roboto"];
        
        for (const fallbackFont of fallbackFonts) {
          try {
            await figma.loadFontAsync({ family: fallbackFont, style: "Regular" });
            loadedFontStyle = "Regular";
            loadedFontFamily = fallbackFont;
            figma.notify(`Successfully loaded fallback: ${fallbackFont} Regular`);
            fontLoaded = true;
            break;
          } catch (error) {
            figma.notify(`Failed fallback: ${fallbackFont} Regular - ${error.message}`);
            continue;
          }
        }
      }
      
      // If still no font loaded, throw error
      if (!fontLoaded) {
        throw new Error(`Could not load font: ${fontFamily} or any fallback fonts. Please make sure a font is available in Figma.`);
      }
      
      // Create the text node AFTER font is loaded
      const textNode = figma.createText();
      textNode.fontName = { family: loadedFontFamily, style: loadedFontStyle };
      textNode.fontSize = fontSize;
      textNode.lineHeight = { value: lineHeight, unit: "PIXELS" };
      textNode.characters = text; // Set characters AFTER font is set
      
      // Try to set font weight using plugin data (for reference)
      textNode.setPluginData("intendedFontWeight", fontWeight.toString());
      
      // Debug: Log which font is being applied
      figma.notify(`Creating component for: ${element.identifier} with ${loadedFontFamily} ${loadedFontStyle}, intended weight ${fontWeight}`);
      
      // Create the component directly with text
      const component = figma.createComponent();
      component.name = element.identifier;
      component.layoutMode = "VERTICAL";
      component.primaryAxisSizingMode = "AUTO"; // This makes it hug content height
      component.counterAxisSizingMode = "AUTO"; // Let width be determined by content
      component.paddingTop = nudgeTop;
      component.paddingBottom = marginBottom;
      component.fills = []; // Remove white background from individual components
      
      // Add the text node directly to the component
      component.appendChild(textNode);
      
      // Add the component directly to the main container
      mainContainer.appendChild(component);
    }
    
    // Position the main container in the center of the viewport
    const center = figma.viewport.center;
    mainContainer.x = center.x - mainContainer.width / 2;
    mainContainer.y = center.y - mainContainer.height / 2;
    
    // Select the main container
    figma.currentPage.selection = [mainContainer];
    figma.viewport.scrollAndZoomIntoView([mainContainer]);
    
    figma.notify(`Generated Typography components in auto-layout container!`);
    
  } catch (error) {
    figma.notify(`Error: ${error.message}`, { error: true });
  }
} 