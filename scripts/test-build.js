#!/usr/bin/env node

/**
 * Build verification script
 * Tests the production build for common issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Testing production build...\n');

// Test 1: Build the project
console.log('1. Building project...');
try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build successful\n');
} catch (error) {
    console.error('❌ Build failed');
    process.exit(1);
}

// Test 2: Check if dist directory exists
console.log('2. Checking build output...');
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
    console.log('✅ Dist directory exists');

    // Check for essential files
    const essentialFiles = ['index.html', 'assets'];
    const missingFiles = essentialFiles.filter(file =>
        !fs.existsSync(path.join(distPath, file))
    );

    if (missingFiles.length === 0) {
        console.log('✅ Essential files present');
    } else {
        console.error(`❌ Missing files: ${missingFiles.join(', ')}`);
        process.exit(1);
    }
} else {
    console.error('❌ Dist directory not found');
    process.exit(1);
}

// Test 3: Check bundle sizes
console.log('\n3. Analyzing bundle sizes...');
const assetsPath = path.join(distPath, 'assets');
if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    const cssFiles = files.filter(file => file.endsWith('.css'));

    console.log(`📦 JavaScript files: ${jsFiles.length}`);
    console.log(`🎨 CSS files: ${cssFiles.length}`);

    // Check for large bundles
    const largeBundles = [];
    files.forEach(file => {
        const filePath = path.join(assetsPath, file);
        const stats = fs.statSync(filePath);
        const sizeInMB = stats.size / (1024 * 1024);

        if (sizeInMB > 1) {
            largeBundles.push({ file, size: sizeInMB.toFixed(2) });
        }
    });

    if (largeBundles.length > 0) {
        console.log('⚠️  Large bundles detected:');
        largeBundles.forEach(({ file, size }) => {
            console.log(`   ${file}: ${size}MB`);
        });
    } else {
        console.log('✅ Bundle sizes look good');
    }
}

// Test 4: Check HTML structure
console.log('\n4. Validating HTML structure...');
const indexPath = path.join(distPath, 'index.html');
const htmlContent = fs.readFileSync(indexPath, 'utf8');

const requiredElements = [
    '<meta charset="UTF-8"',
    '<meta name="viewport"',
    '<title>',
    '<meta name="description"',
    'id="root"'
];

const missingElements = requiredElements.filter(element =>
    !htmlContent.includes(element)
);

if (missingElements.length === 0) {
    console.log('✅ HTML structure valid');
} else {
    console.error(`❌ Missing HTML elements: ${missingElements.join(', ')}`);
    process.exit(1);
}

// Test 5: Check for source maps in production
console.log('\n5. Checking for source maps...');
const hasSourceMaps = files.some(file => file.endsWith('.map'));
if (!hasSourceMaps) {
    console.log('✅ No source maps in production build');
} else {
    console.log('⚠️  Source maps found in production build');
}

console.log('\n🎉 Build verification completed successfully!');
console.log('\nNext steps:');
console.log('- Test the build locally: npm run preview');
console.log('- Deploy to Netlify: drag dist folder to netlify.com/drop');
console.log('- Or use Docker: docker build -t portfolio .');