#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function parseRemToNumber(rem) {
	if (typeof rem === 'number') return rem;
	if (typeof rem === 'string' && rem.endsWith('rem')) {
		return parseFloat(rem.replace('rem', ''));
	}
	// Fallback: try parseFloat
	return parseFloat(rem);
}

function buildSettingsMaps(tokensJson) {
	const maps = {};
	const elements = tokensJson.elements || {};
	for (const [identifier, el] of Object.entries(elements)) {
		maps[identifier] = {
			'font-size': parseRemToNumber(el.fontSize),
			'line-height': parseRemToNumber(el.lineHeight),
			'sp-before': 0,
			'sp-after': parseRemToNumber(el.spaceAfter),
			'nudge': parseRemToNumber(el.nudgeTop || 0),
			'font-weight': typeof el.fontWeight === 'number' ? el.fontWeight : parseFloat(el.fontWeight),
			'font-style': el.fontStyle || 'normal'
		};
	}
	return maps;
}

function writeScss(outFile, maps, tokensJson) {
	let scss = `// This file is auto-generated. Do not edit by hand.\n`;

	Object.entries(maps).forEach(([identifier, map]) => {
		scss += `$settings-text-${identifier}: (\n`;
		Object.entries(map).forEach(([key, value]) => {
			let out;
			if (key === 'font-style') {
				out = JSON.stringify(String(value));
			} else if (key === 'line-height' || key === 'sp-after' || key === 'nudge') {
				out = `${value}rem`;
			} else {
				out = typeof value === 'number' ? String(value) : String(value);
			}
			scss += `  ${key}: ${out},\n`;
		});
		scss += `);\n\n`;
	});
	fs.writeFileSync(outFile, scss, 'utf8');
}

function generateFor(tokensPath, outDir) {
	if (!fs.existsSync(tokensPath)) {
		console.log(`⚠️  Tokens not found: ${tokensPath} (skipping)`);
		return;
	}
	const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
	const maps = buildSettingsMaps(tokens);
	const outFile = path.join(outDir, '_vanilla-text-settings.generated.scss');
	writeScss(outFile, maps, tokens);
	console.log(`✅ Generated ${outFile}`);
}

function main() {
	// Default generation for docs/editorial/apps tokens if present
	const pairs = [
		{ tokens: 'src/docs/tokens.json', out: 'src/docs' },
		{ tokens: 'src/editorial/tokens.json', out: 'src/editorial' },
		{ tokens: 'src/apps/tokens.json', out: 'src/apps' }
	];
	for (const p of pairs) {
		generateFor(path.resolve(p.tokens), path.resolve(p.out));
	}
}

try {
	main();
} catch (e) {
	console.error('❌ Error generating Vanilla text settings:', e.message);
	process.exit(1);
}


