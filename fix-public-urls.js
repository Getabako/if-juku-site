const fs = require('fs');
const path = require('path');

// 修正が必要なファイルのリスト
const filesToFix = [
  'src/components/Navigation/CyberNav.jsx',
  'src/components/Navigation/MobileNav.jsx',
  'src/components/Sections/BusinessInquiry.jsx',
  'src/components/Sections/Challenge.jsx',
  'src/components/Sections/ChallengeForBeginner.jsx',
  'src/components/Sections/Flow.jsx',
  'src/components/Sections/Issues.jsx',
  'src/components/Sections/Materials.jsx',
  'src/components/Sections/Members.jsx',
  'src/components/Sections/Message.jsx',
  'src/components/Sections/PowerUp.jsx',
  'src/components/Sections/Services.jsx'
];

// インポート文を追加する関数
function addImportStatement(content) {
  const importStatement = "import { getAssetPath } from '../../utils/paths';";
  
  // すでにインポートがある場合はスキップ
  if (content.includes(importStatement)) {
    return content;
  }
  
  // 最後のimport文の後に追加
  const lines = content.split('\n');
  let lastImportIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) {
      lastImportIndex = i;
    }
  }
  
  if (lastImportIndex !== -1) {
    lines.splice(lastImportIndex + 1, 0, importStatement);
  }
  
  return lines.join('\n');
}

// process.env.PUBLIC_URLの使用箇所を置き換える関数
function replacePublicUrls(content) {
  // パターン1: `${process.env.PUBLIC_URL}/2024/...` or `${process.env.PUBLIC_URL}/2025/...`
  content = content.replace(
    /\$\{process\.env\.PUBLIC_URL\}\/(202[45]\/[^`}]+)/g,
    "getAssetPath('$1')"
  );
  
  // パターン2: process.env.PUBLIC_URL + '/2024/...' or process.env.PUBLIC_URL + '/2025/...'
  content = content.replace(
    /process\.env\.PUBLIC_URL\s*\+\s*['"]\/?(202[45]\/[^'"]+)['"]/g,
    "getAssetPath('$1')"
  );
  
  return content;
}

// 各ファイルを処理
filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // process.env.PUBLIC_URLが使われているかチェック
  if (content.includes('process.env.PUBLIC_URL')) {
    console.log(`Processing: ${filePath}`);
    
    // インポート文を追加
    content = addImportStatement(content);
    
    // URLを置き換え
    const newContent = replacePublicUrls(content);
    
    if (content !== newContent) {
      fs.writeFileSync(fullPath, newContent, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`ℹ️ No changes needed: ${filePath}`);
    }
  } else {
    console.log(`⏭️ Skipped: ${filePath} (no PUBLIC_URL usage)`);
  }
});

console.log('\n✨ Done! All files have been processed.');