// Simple Node.js test to verify the built package
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing React NLForm Library Build...\n');

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
    console.error('❌ dist directory not found. Run npm run build first.');
    process.exit(1);
}

// Check required files
const requiredFiles = [
    'index.js',
    'index.esm.js', 
    'index.d.ts',
    'NLForm.d.ts',
    'types.d.ts'
];

console.log('📁 Checking built files:');
requiredFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        console.log(`✅ ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
    } else {
        console.log(`❌ ${file} - MISSING`);
    }
});

// Try to require the built package
try {
    console.log('\n📦 Testing CommonJS import:');
    const pkg = require('./dist/index.js');
    console.log('✅ CommonJS import successful');
    console.log('   Exports:', Object.keys(pkg));
} catch (error) {
    console.error('❌ CommonJS import failed:', error.message);
}

// Check TypeScript definitions
try {
    console.log('\n🔤 Checking TypeScript definitions:');
    const typesDef = fs.readFileSync(path.join(distPath, 'index.d.ts'), 'utf8');
    if (typesDef.includes('export') && typesDef.includes('NLForm')) {
        console.log('✅ TypeScript definitions look good');
    } else {
        console.log('❌ TypeScript definitions may be incomplete');
    }
} catch (error) {
    console.error('❌ TypeScript definitions error:', error.message);
}

// Test package.json
console.log('\n📋 Package configuration:');
const packageJson = require('./package.json');
console.log(`   Name: ${packageJson.name}`);
console.log(`   Version: ${packageJson.version}`);
console.log(`   Main: ${packageJson.main}`);
console.log(`   Module: ${packageJson.module}`);
console.log(`   Types: ${packageJson.types}`);

console.log('\n🎉 Library build verification complete!');
console.log('\n📝 Next steps:');
console.log('   1. Open test.html in a browser to test the components');
console.log('   2. Create a React app and install this package locally');
console.log('   3. Run: npm pack && npm install ../react-nlform-*.tgz');
console.log('   4. When ready to publish: npm publish');