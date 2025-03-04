
const fs = require('fs');
const path = require('path');
const uglifyJS = require('uglify-js');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Read the connectionMap.js file
const connectionMapPath = path.join(__dirname, 'src', 'standalone', 'connectionMap.js');
const connectionMapCode = fs.readFileSync(connectionMapPath, 'utf8');

// Minify the code for production
const minified = uglifyJS.minify(connectionMapCode);

if (minified.error) {
  console.error('Error minifying the code:', minified.error);
  process.exit(1);
}

// Write the minified version
fs.writeFileSync(path.join(distDir, 'connectionMap.min.js'), minified.code);

// Copy the original file too
fs.copyFileSync(connectionMapPath, path.join(distDir, 'connectionMap.js'));

// Copy the HTML file (for demonstration)
const htmlPath = path.join(__dirname, 'src', 'standalone', 'index.html');
fs.copyFileSync(htmlPath, path.join(distDir, 'index.html'));

// Update the script reference in the HTML file to use the local version
const htmlContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const updatedHtml = htmlContent.replace('src="connectionMap.js"', 'src="connectionMap.min.js"');
fs.writeFileSync(path.join(distDir, 'index.html'), updatedHtml);

console.log('Standalone files built successfully in the dist/ directory!');
console.log('- connectionMap.js: Unminified version for debugging');
console.log('- connectionMap.min.js: Minified version for production');
console.log('- index.html: Demo page');
