figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate-components') {
    await generateTypographyComponents(msg.config, msg.baselineUnit, msg.fontFamily, msg.paragraphSize, msg.sampleText);
  }
};

async function generateTypographyComponents(config, baselineUnit, fontFamily, paragraphSize, sampleText) {
  try {
    // Load the font - try different style variations
    let loadedFontStyle = null;
    let loadedFontFamily = fontFamily;
    const fontStyles = ["Regular", "Normal", "400", ""];
    
    // Debug: Log the font family we're trying to load
    figma.notify(`Attempting to load font: ${fontFamily}`);
    
    // First try the specified font family
    for (const style of fontStyles) {
      try {
        await figma.loadFontAsync({ family: fontFamily, style: style });
        loadedFontStyle = style;
        figma.notify(`Successfully loaded: ${fontFamily} ${style}`);
        break;
      } catch (error) {
        figma.notify(`Failed to load: ${fontFamily} ${style} - ${error.message}`);
        // Try next style
        continue;
      }
    }
    
    // If the specified font family failed, try fallback fonts
    if (!loadedFontStyle) {
      figma.notify(`Font ${fontFamily} not found, trying fallback fonts...`);
      const fallbackFonts = ["Inter", "Arial", "Helvetica", "Roboto"];
      
      for (const fallbackFont of fallbackFonts) {
        for (const style of fontStyles) {
          try {
            await figma.loadFontAsync({ family: fallbackFont, style: style });
            loadedFontStyle = style;
            loadedFontFamily = fallbackFont;
            figma.notify(`Successfully loaded fallback: ${fallbackFont} ${style}`);
            break;
          } catch (error) {
            figma.notify(`Failed fallback: ${fallbackFont} ${style} - ${error.message}`);
            continue;
          }
        }
        if (loadedFontStyle) break;
      }
    }
    
    // If still no font loaded, throw error
    if (!loadedFontStyle) {
      throw new Error(`Could not load font: ${fontFamily} or any fallback fonts. Please make sure a font is available in Figma.`);
    }
    
    // Ensure the font is fully loaded before proceeding
    await figma.loadFontAsync({ family: loadedFontFamily, style: loadedFontStyle });
    figma.notify(`Font ${loadedFontFamily} ${loadedFontStyle} is ready for use`);
    
    // Create separate components for each typography element
    const components = [];
    
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
      
      // Calculate margin-bottom: spaceAfter - nudgeTop
      const marginBottom = spaceAfter - nudgeTop;
      
      // Create the text node AFTER font is loaded
      const textNode = figma.createText();
      textNode.fontName = { family: loadedFontFamily, style: loadedFontStyle };
      textNode.fontSize = fontSize;
      textNode.lineHeight = { value: lineHeight, unit: "PIXELS" };
      textNode.characters = sampleText; // Set characters AFTER font is set
      
      // Debug: Log which font is being applied
      figma.notify(`Creating component for: ${element.identifier} with ${loadedFontFamily} ${loadedFontStyle}`);
      
      // Create the auto layout container
      const container = figma.createFrame();
      container.name = `${element.identifier} Container`;
      container.layoutMode = "VERTICAL";
      container.primaryAxisSizingMode = "AUTO";
      container.counterAxisSizingMode = "AUTO";
      container.paddingTop = nudgeTop;
      container.paddingBottom = marginBottom;
      
      // Add the text node to the container
      container.appendChild(textNode);
      
      // Create the component
      const component = figma.createComponent();
      component.name = element.identifier;
      component.appendChild(container);
      
      components.push(component);
    }
    
    // Create a main component with variants
    const mainComponent = figma.createComponent();
    mainComponent.name = "Typography Text";
    
    // Set up the component properties for variants
    mainComponent.setProperties({
      "Typography Style": {
        type: "VARIANT",
        value: config.elements[0].identifier
      }
    });
    
    // Add the first component as the main component's content
    const firstComponent = components[0];
    const firstClone = firstComponent.clone();
    mainComponent.appendChild(firstClone);
    
    // Create variants by adding the other components
    for (let i = 1; i < components.length; i++) {
      const component = components[i];
      const clone = component.clone();
      clone.name = config.elements[i].identifier;
      
      // Set the variant property
      clone.setProperties({
        "Typography Style": config.elements[i].identifier
      });
      
      // Add to the main component
      mainComponent.appendChild(clone);
    }
    
    // Position the main component in the center of the viewport
    const center = figma.viewport.center;
    mainComponent.x = center.x - mainComponent.width / 2;
    mainComponent.y = center.y - mainComponent.height / 2;
    
    // Select the main component
    figma.currentPage.selection = [mainComponent];
    figma.viewport.scrollAndZoomIntoView([mainComponent]);
    
    figma.notify(`Generated typography component with ${config.elements.length} variants!`);
    
  } catch (error) {
    figma.notify(`Error: ${error.message}`, { error: true });
  }
} 