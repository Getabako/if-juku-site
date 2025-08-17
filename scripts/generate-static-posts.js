#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// posts.jsonを読み込む
const postsData = require('../src/data/posts.json');

// buildディレクトリのパス
const buildDir = path.join(__dirname, '..', 'build');
const postsDir = path.join(buildDir, 'post');

// HTMLテンプレート
const createPostHTML = (post) => {
  // HTMLエンティティをエスケープ
  const escapeHtml = (text) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  };

  // 画像URLを変換
  const convertImageUrl = (url) => {
    if (!url) return '';
    // 相対パスの場合、GitHub Pages用のパスに変換
    if (url.startsWith('/')) {
      return `/if-juku-site${url}`;
    }
    return url;
  };

  // コンテンツ内の画像URLを変換
  const convertContentImages = (content) => {
    if (!content) return '';
    // img srcの変換
    return content.replace(/src="\/([^"]*)"/g, 'src="/if-juku-site/$1"');
  };

  const processedContent = convertContentImages(post.content || '');
  const featuredImage = convertImageUrl(post.featuredImage);

  return `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="${escapeHtml(post.excerpt || '')}" />
    <meta property="og:title" content="${escapeHtml(post.title)}" />
    <meta property="og:description" content="${escapeHtml(post.excerpt || '')}" />
    ${featuredImage ? `<meta property="og:image" content="${featuredImage}" />` : ''}
    <title>${escapeHtml(post.title)} - if(塾)</title>
    <link href="/if-juku-site/static/css/main.20399cdb.css" rel="stylesheet">
    <style>
      body { 
        margin: 0; 
        background: #0a0e27;
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      }
      .static-post-container {
        min-height: 100vh;
        padding: 2rem;
        overflow-y: auto;
        height: auto;
      }
      .static-post-wrapper {
        max-width: 900px;
        margin: 0 auto;
        padding-bottom: 4rem;
      }
      .static-post-back {
        display: inline-block;
        color: #8a2387;
        text-decoration: none;
        margin-bottom: 2rem;
        transition: color 0.3s;
      }
      .static-post-back:hover {
        color: #e94057;
      }
      .static-post-article {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        overflow: visible;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        margin-bottom: 2rem;
      }
      .static-post-header {
        padding: 3rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .static-post-title {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        line-height: 1.3;
      }
      .static-post-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.95rem;
      }
      .static-post-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
      }
      .static-post-category {
        background: linear-gradient(135deg, #8a2387, #e94057);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.85rem;
      }
      .static-post-content {
        padding: 3rem;
        line-height: 1.8;
        font-size: 1.1rem;
        word-wrap: break-word;
        overflow-wrap: break-word;
        color: rgba(255, 255, 255, 0.9);
      }
      .static-post-content img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 2rem 0;
      }
      .static-post-content h2 {
        color: white;
        margin-top: 2rem;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid rgba(138, 35, 135, 0.5);
      }
      .static-post-content h3 {
        color: white;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
      }
      .static-post-content p {
        margin: 1rem 0;
      }
      .static-post-content a {
        color: #8a2387;
        transition: color 0.3s;
      }
      .static-post-content a:hover {
        color: #e94057;
      }
      .static-post-content pre {
        background: rgba(0, 0, 0, 0.5);
        padding: 1.5rem;
        border-radius: 8px;
        overflow-x: auto;
        margin: 2rem 0;
      }
      .static-post-content code {
        background: rgba(0, 0, 0, 0.3);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-family: 'Monaco', 'Courier New', monospace;
        font-size: 0.9em;
      }
      @media (max-width: 768px) {
        .static-post-title {
          font-size: 1.8rem;
        }
        .static-post-header {
          padding: 2rem 1.5rem;
        }
        .static-post-content {
          padding: 2rem 1.5rem;
        }
      }
    </style>
    <script type="text/javascript">
      // SPAフォールバック - もしReactアプリがロードされていない場合のみ表示
      window.addEventListener('DOMContentLoaded', function() {
        // Reactアプリがロードされた場合、静的コンテンツを隠す
        if (window.React || document.getElementById('root').children.length > 0) {
          var staticContent = document.getElementById('static-content');
          if (staticContent) staticContent.style.display = 'none';
        }
      });
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    
    <!-- 静的コンテンツ（JavaScriptが無効な場合やSPAがロードされない場合のフォールバック） -->
    <div id="static-content" class="static-post-container">
      <div class="static-post-wrapper">
        <a href="/if-juku-site/blog" class="static-post-back">← ブログ一覧に戻る</a>
        <article class="static-post-article">
          <header class="static-post-header">
            <h1 class="static-post-title">${escapeHtml(post.title)}</h1>
            <div class="static-post-meta">
              <span>📅 ${new Date(post.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              ${post.author ? `<span>✍️ ${escapeHtml(post.author)}</span>` : ''}
            </div>
            ${post.categories && post.categories.length > 0 ? `
            <div class="static-post-categories">
              ${post.categories.map(cat => `<span class="static-post-category">${escapeHtml(cat)}</span>`).join('')}
            </div>
            ` : ''}
          </header>
          <div class="static-post-content">
            ${featuredImage ? `<img src="${featuredImage}" alt="${escapeHtml(post.title)}" />` : ''}
            ${processedContent}
          </div>
        </article>
      </div>
    </div>
    
    <div id="modal-root" style="position: fixed; inset: 0; pointer-events: none; z-index: 10000;"></div>
    <script defer="defer" src="/if-juku-site/static/js/main.cd221f0a.js"></script>
  </body>
</html>`;
};

// メイン処理
function generateStaticPosts() {
  console.log('🚀 静的ブログ記事の生成を開始...');

  // buildディレクトリが存在することを確認
  if (!fs.existsSync(buildDir)) {
    console.error('❌ buildディレクトリが存在しません。先に "npm run build" を実行してください。');
    process.exit(1);
  }

  // postディレクトリを作成
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
    console.log('📁 postディレクトリを作成しました');
  }

  // 各記事のHTMLファイルを生成
  let generatedCount = 0;
  let errorCount = 0;

  postsData.posts.forEach(post => {
    try {
      const postDir = path.join(postsDir, String(post.id));
      
      // 記事IDごとのディレクトリを作成
      if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
      }

      // index.htmlを生成
      const htmlContent = createPostHTML(post);
      const htmlPath = path.join(postDir, 'index.html');
      
      fs.writeFileSync(htmlPath, htmlContent, 'utf8');
      generatedCount++;
      
      console.log(`✅ 記事 ${post.id}: ${post.title}`);
    } catch (error) {
      console.error(`❌ 記事 ${post.id} の生成に失敗: ${error.message}`);
      errorCount++;
    }
  });

  console.log(`\n📊 生成結果:`);
  console.log(`   ✅ 成功: ${generatedCount}件`);
  console.log(`   ❌ 失敗: ${errorCount}件`);
  console.log(`   📁 出力先: ${postsDir}`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

// スクリプト実行
generateStaticPosts();