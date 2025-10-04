#!/usr/bin/env node
/**
 * Generate favicon files from logo.png
 * Run: node generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

const inputFile = path.join(__dirname, 'static', 'logo.png');
const outputDir = path.join(__dirname, 'static');

async function generateFavicons() {
  console.log('🎨 Generating favicon files from logo.png...\n');

  if (!fs.existsSync(inputFile)) {
    console.error('❌ Error: logo.png not found in static folder');
    process.exit(1);
  }

  for (const { name, size } of sizes) {
    const outputFile = path.join(outputDir, name);
    
    try {
      await sharp(inputFile)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputFile);
      
      console.log(`✅ Created ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Failed to create ${name}:`, error.message);
    }
  }

  // Create ICO file (using 32x32 as base)
  const icoFile = path.join(outputDir, 'favicon.ico');
  try {
    await sharp(inputFile)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFile(icoFile);
    console.log(`✅ Created favicon.ico (32x32)`);
  } catch (error) {
    console.error(`❌ Failed to create favicon.ico:`, error.message);
  }

  console.log('\n🎉 All favicon files generated successfully!');
  console.log('\nGenerated files:');
  console.log('  - favicon.ico');
  console.log('  - favicon-16x16.png');
  console.log('  - favicon-32x32.png');
  console.log('  - apple-touch-icon.png');
  console.log('  - android-chrome-192x192.png');
  console.log('  - android-chrome-512x512.png');
  console.log('\n✨ Your logo will now appear in the browser tab!');
}

generateFavicons().catch(console.error);
