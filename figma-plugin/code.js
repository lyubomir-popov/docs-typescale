figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate-components') {
    await generateTypographyComponents(msg.config, msg.baselineUnit, msg.fontFamily, msg.configType);
  }
};

async function generateTypographyComponents(config, baselineUnit, fontFamily, configType) {
  try {
    // Debug: Log the font family we're trying to load
    figma.notify(`Attempting to load font: ${fontFamily}`);
    
    // Create the main auto-layout container
    const mainContainer = figma.createFrame();
    mainContainer.name = `Type scale – ${configType}`;
    mainContainer.layoutMode = "VERTICAL";
    mainContainer.primaryAxisSizingMode = "AUTO"; // Let width be determined by content
    mainContainer.counterAxisSizingMode = "AUTO"; // This makes height hug contents
    mainContainer.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]; // White background
    mainContainer.itemSpacing = 0; // No spacing between components
    
    // Create components for each typography element
    for (let i = 0; i < config.elements.length; i++) {
      const element = config.elements[i];
      
      // Use pre-calculated pixel values from tokens.json
      const fontSize = element.fontSize;
      const lineHeight = element.lineHeight;
      const nudgeTop = element.nudgeTop;
      const spaceAfter = element.spaceAfter;
      const fontWeight = element.fontWeight || 400; // Default to 400 if not specified
      const fontStyle = element.fontStyle || "normal";
      
      // Calculate bottom padding: spaceAfter - nudgeTop
      const paddingBottom = spaceAfter - nudgeTop;
      
      // Create meaningful text for this element
      const text = `This is an ${element.identifier} from the ${configType} type scale: fs/lh: ${fontSize}/${lineHeight}px, weight ${fontWeight}`;
      
      // Load font with Regular style first (for variable font support)
      let loadedFontStyle = "Regular";
      let loadedFontFamily = fontFamily;
      let fontLoaded = false;
      
      // Try to load the font with Regular style
      try {
        await figma.loadFontAsync({ family: fontFamily, style: "Regular" });
        loadedFontStyle = "Regular";
        figma.notify(`Successfully loaded: ${fontFamily} Regular for weight ${fontWeight}`);
        fontLoaded = true;
      } catch (error) {
        // If Regular fails, try fallback styles
        const styleAttempts = ["Regular", "Normal", "Light", "Medium"];
        
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
      
      // NEW APPROACH: Try variable binding using the colleague's method
      let weightApplied = false;
      
      try {
        // Step 1: Get or create variable collection
        const collections = await figma.variables.getLocalVariableCollectionsAsync();
        let collection = collections.find((c) => c.name === "Typography Variables");
        
        if (!collection) {
          collection = figma.variables.createVariableCollection("Typography Variables");
        }
        
        // Step 2: Create or get existing font weight variable
        const existingVariables = await figma.variables.getLocalVariablesAsync("FLOAT");
        let fontWeightVar = existingVariables.find(
          (v) => v.name === `FontWeight${fontWeight}` && v.variableCollectionId === collection.id
        );
        
        if (!fontWeightVar) {
          // Create new variable if it doesn't exist
          fontWeightVar = figma.variables.createVariable(
            `FontWeight${fontWeight}`,
            collection,
            "FLOAT"
          );
        }
        
        // Set the value
        const defaultModeId = collection.modes[0].modeId;
        fontWeightVar.setValueForMode(defaultModeId, fontWeight);
        
        // Step 3: Bind the font weight to the variable using setBoundVariable
        textNode.setBoundVariable("fontWeight", fontWeightVar);
        
        figma.notify(`✅ Applied variable font weight ${fontWeight} to ${element.identifier}`);
        weightApplied = true;
      } catch (variableError) {
        figma.notify(`❌ Variable binding failed for ${element.identifier}: ${variableError.message}`);
        
        // Fallback to named styles
        let styleAttempts = [];
        
        if (fontWeight <= 100) {
          styleAttempts = ["Thin", "UltraLight", "ExtraLight", "Light", "Regular"];
        } else if (fontWeight <= 200) {
          styleAttempts = ["ExtraLight", "UltraLight", "Light", "Regular"];
        } else if (fontWeight <= 300) {
          styleAttempts = ["Light", "Regular"];
        } else if (fontWeight <= 400) {
          styleAttempts = ["Regular", "Normal"];
        } else if (fontWeight <= 500) {
          styleAttempts = ["Medium", "Regular"];
        } else if (fontWeight <= 600) {
          styleAttempts = ["SemiBold", "Medium", "Bold"];
        } else if (fontWeight <= 700) {
          styleAttempts = ["Bold", "SemiBold", "Medium"];
        } else if (fontWeight <= 800) {
          styleAttempts = ["ExtraBold", "Bold", "SemiBold"];
        } else {
          styleAttempts = ["Black", "ExtraBold", "Bold"];
        }
        
        for (const style of styleAttempts) {
          try {
            await figma.loadFontAsync({ family: loadedFontFamily, style: style });
            textNode.fontName = { family: loadedFontFamily, style: style };
            figma.notify(`Applied ${style} style for weight ${fontWeight} to ${element.identifier}`);
            weightApplied = true;
            break;
          } catch (styleError) {
            // Try next style
            continue;
          }
        }
      }
      
      // Store intended weight in plugin data for reference
      textNode.setPluginData("intendedFontWeight", fontWeight.toString());
      textNode.setPluginData("weightApplied", weightApplied.toString());
      
      if (!weightApplied) {
        figma.notify(`Warning: Could not apply font weight ${fontWeight} to ${element.identifier}. Using default style.`);
      }
      
      // Create the component directly with text
      const component = figma.createComponent();
      component.name = element.identifier;
      component.layoutMode = "VERTICAL";
      component.primaryAxisSizingMode = "AUTO"; // This makes it hug content height
      component.counterAxisSizingMode = "AUTO"; // Let width be determined by content
      component.paddingTop = nudgeTop;
      component.paddingBottom = paddingBottom;
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
    
    figma.notify(`Generated Typography components with variable font weights!`);
    
  } catch (error) {
    figma.notify(`Error: ${error.message}`, { error: true });
  }
} 