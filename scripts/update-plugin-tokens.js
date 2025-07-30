#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_TOKENS_FILE = 'src/docs/tokens.json';
const EDITORIAL_TOKENS_FILE = 'src/editorial/tokens.json';
const UI_FILE = 'figma-plugin/ui.html';

function updatePluginTokens() {
  try {
    const pluginTokens = {
      docs: null,
      editorial: null
    };

    // Read docs tokens
    if (fs.existsSync(DOCS_TOKENS_FILE)) {
      const docsTokens = JSON.parse(fs.readFileSync(DOCS_TOKENS_FILE, 'utf8'));
      pluginTokens.docs = {
        baselineUnit: docsTokens.baselineUnit,
        elements: {}
      };
      
      Object.keys(docsTokens.elements).forEach(key => {
        const element = docsTokens.elements[key];
        pluginTokens.docs.elements[key] = {
          fontSize: element.fontSize,
          lineHeight: element.lineHeight,
          fontWeight: element.fontWeight,
          fontStyle: element.fontStyle,
          spaceAfter: element.spaceAfter,
          nudgeTop: element.nudgeTop
        };
      });
      console.log('✅ Loaded docs tokens');
    } else {
      console.log('⚠️  Docs tokens not found, skipping...');
    }

    // Read editorial tokens
    if (fs.existsSync(EDITORIAL_TOKENS_FILE)) {
      const editorialTokens = JSON.parse(fs.readFileSync(EDITORIAL_TOKENS_FILE, 'utf8'));
      pluginTokens.editorial = {
        baselineUnit: editorialTokens.baselineUnit,
        elements: {}
      };
      
      Object.keys(editorialTokens.elements).forEach(key => {
        const element = editorialTokens.elements[key];
        pluginTokens.editorial.elements[key] = {
          fontSize: element.fontSize,
          lineHeight: element.lineHeight,
          fontWeight: element.fontWeight,
          fontStyle: element.fontStyle,
          spaceAfter: element.spaceAfter,
          nudgeTop: element.nudgeTop
        };
      });
      console.log('✅ Loaded editorial tokens');
    } else {
      console.log('⚠️  Editorial tokens not found, skipping...');
    }

    // Read the UI file
    const uiFilePath = path.resolve(UI_FILE);
    if (!fs.existsSync(uiFilePath)) {
      console.error(`❌ UI file not found: ${uiFilePath}`);
      process.exit(1);
    }

    let uiContent = fs.readFileSync(uiFilePath, 'utf8');
    
    // Create the new TOKENS_DATA string
    const newTokensData = `    const TOKENS_DATA = ${JSON.stringify(pluginTokens, null, 6)};`;

    // Find and replace the existing TOKENS_DATA
    const tokensDataRegex = /const TOKENS_DATA = \{[\s\S]*?\};/;
    
    if (!tokensDataRegex.test(uiContent)) {
      console.error('❌ Could not find TOKENS_DATA in UI file');
      process.exit(1);
    }

    const updatedContent = uiContent.replace(tokensDataRegex, newTokensData);
    
    // Write the updated content back
    fs.writeFileSync(uiFilePath, updatedContent, 'utf8');
    
    console.log('✅ Updated embedded tokens data in Figma plugin');
    console.log(`📁 Updated: ${uiFilePath}`);
    
    // Show what changed
    if (pluginTokens.docs) {
      console.log('\n📋 Docs elements:');
      Object.keys(pluginTokens.docs.elements).forEach(key => {
        const element = pluginTokens.docs.elements[key];
        console.log(`  ${key}: ${element.fontSize}/${element.lineHeight}, weight ${element.fontWeight}`);
      });
    }
    
    if (pluginTokens.editorial) {
      console.log('\n📋 Editorial elements:');
      Object.keys(pluginTokens.editorial.elements).forEach(key => {
        const element = pluginTokens.editorial.elements[key];
        console.log(`  ${key}: ${element.fontSize}/${element.lineHeight}, weight ${element.fontWeight}`);
      });
    }

  } catch (error) {
    console.error('❌ Error updating plugin tokens:', error.message);
    process.exit(1);
  }
}

// Run the update
updatePluginTokens(); 