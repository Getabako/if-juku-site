const fs = require('fs');
const path = require('path');

function checkImagePaths() {
  const srcDir = path.join(__dirname, '..', 'src');
  const publicDir = path.join(__dirname, '..', 'public');
  const errors = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.includes('node_modules')) {
        walkDir(filePath);
      } else if (file.endsWith('.jsx') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.ts')) {
        checkFile(filePath);
      }
    }
  }
  
  function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for image paths without process.env.PUBLIC_URL
    const imagePathRegex = /['"`]\/2025\/(02|03|04|07|08)\//g;
    const matches = content.match(imagePathRegex);
    if (matches) {
      const lines = content.split('\n');
      matches.forEach(match => {
        const lineNum = lines.findIndex(line => line.includes(match)) + 1;
        if (!lines[lineNum - 1].includes('process.env.PUBLIC_URL')) {
          errors.push({
            file: filePath.replace(path.join(__dirname, '..'), ''),
            line: lineNum,
            issue: `Image path ${match} should use process.env.PUBLIC_URL`
          });
        }
      });
    }
    
    // Check if referenced images exist
    const publicUrlRegex = /\${process\.env\.PUBLIC_URL}(\/[^'"`]+\.(png|jpg|jpeg|gif|mp4|webm))/gi;
    const publicMatches = [...content.matchAll(publicUrlRegex)];
    publicMatches.forEach(match => {
      const imagePath = match[1];
      const fullPath = path.join(publicDir, imagePath);
      if (!fs.existsSync(fullPath)) {
        const lineNum = content.substring(0, match.index).split('\n').length;
        errors.push({
          file: filePath.replace(path.join(__dirname, '..'), ''),
          line: lineNum,
          issue: `Referenced image does not exist: ${imagePath}`
        });
      }
    });
  }
  
  walkDir(srcDir);
  
  if (errors.length > 0) {
    console.error('❌ Image path issues found:');
    errors.forEach(error => {
      console.error(`  ${error.file}:${error.line} - ${error.issue}`);
    });
    process.exit(1);
  } else {
    console.log('✅ All image paths are correctly configured!');
  }
}

checkImagePaths();