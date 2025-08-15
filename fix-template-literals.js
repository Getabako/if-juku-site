const fs = require('fs');
const path = require('path');

// 修正が必要なファイル
const filesToFix = [
  'src/components/Sections/Members.jsx',
  'src/components/Sections/PowerUp.jsx',
  'src/components/Sections/Services.jsx'
];

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // パターン1: `getAssetPath('...')` を getAssetPath('...') に置き換え
  content = content.replace(/`getAssetPath\('([^']+)'\)`/g, "getAssetPath('$1')");
  
  // パターン2: `getAssetPath("...")` を getAssetPath("...") に置き換え  
  content = content.replace(/`getAssetPath\("([^"]+)"\)`/g, 'getAssetPath("$1")');
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Fixed: ${filePath}`);
});

console.log('\n✨ Done! All template literals have been fixed.');