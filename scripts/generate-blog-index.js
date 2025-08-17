#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// posts.jsonを読み込む
const postsData = require('../src/data/posts.json');

// buildディレクトリのパス
const buildDir = path.join(__dirname, '..', 'build');
const blogDir = path.join(buildDir, 'blog');

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

// ブログ一覧HTMLを生成
const createBlogIndexHTML = () => {
  // 記事を日付順にソート（新しい順）
  const sortedPosts = [...postsData.posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const postCards = sortedPosts.map(post => {
    const featuredImage = post.featuredImage ? 
      (post.featuredImage.startsWith('/') ? `/if-juku-site${post.featuredImage}` : post.featuredImage) : '';
    
    return `
      <a href="/if-juku-site/post/${post.id}" class="blog-card">
        ${featuredImage ? `
        <div class="blog-card-image">
          <img src="${featuredImage}" alt="${escapeHtml(post.title)}" />
        </div>
        ` : ''}
        <div class="blog-card-content">
          <h3 class="blog-card-title">${escapeHtml(post.title)}</h3>
          <p class="blog-card-excerpt">${escapeHtml(post.excerpt || '').substring(0, 150)}...</p>
          <div class="blog-card-meta">
            <span class="blog-card-date">📅 ${new Date(post.date).toLocaleDateString('ja-JP')}</span>
            ${post.categories && post.categories.length > 0 ? 
              `<span class="blog-card-category">${escapeHtml(post.categories[0])}</span>` : ''}
          </div>
        </div>
      </a>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="if(塾)のブログ記事一覧" />
    <title>ブログ - if(塾)</title>
    <link href="/if-juku-site/static/css/main.20399cdb.css" rel="stylesheet">
    <style>
      body {
        margin: 0;
        background: #0a0e27;
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      }
      .blog-index-container {
        min-height: 100vh;
        padding: 2rem;
      }
      .blog-index-wrapper {
        max-width: 1400px;
        margin: 0 auto;
      }
      .blog-index-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      .blog-index-title {
        font-size: 3rem;
        font-weight: bold;
        background: linear-gradient(135deg, #8a2387, #e94057);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 1rem;
      }
      .blog-index-subtitle {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.1rem;
      }
      .blog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }
      .blog-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.3s ease;
        text-decoration: none;
        color: white;
        display: block;
        height: 100%;
      }
      .blog-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(138, 35, 135, 0.3);
        border-color: #8a2387;
      }
      .blog-card-image {
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: linear-gradient(135deg, rgba(138, 35, 135, 0.1), rgba(25, 118, 210, 0.1));
      }
      .blog-card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      .blog-card:hover .blog-card-image img {
        transform: scale(1.05);
      }
      .blog-card-content {
        padding: 1.5rem;
      }
      .blog-card-title {
        font-size: 1.3rem;
        font-weight: bold;
        margin-bottom: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .blog-card-excerpt {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .blog-card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.6);
      }
      .blog-card-category {
        background: linear-gradient(135deg, #8a2387, #e94057);
        color: white;
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.8rem;
      }
      .home-link {
        display: inline-block;
        color: #8a2387;
        text-decoration: none;
        margin-bottom: 2rem;
        transition: color 0.3s;
      }
      .home-link:hover {
        color: #e94057;
      }
      @media (max-width: 768px) {
        .blog-index-title {
          font-size: 2rem;
        }
        .blog-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <script type="text/javascript">
      // 静的コンテンツを即座に非表示にする
      document.addEventListener('DOMContentLoaded', function() {
        var staticContent = document.getElementById('static-content');
        if (staticContent) {
          // Reactアプリのロードを待つ
          var checkReactLoaded = setInterval(function() {
            var rootElement = document.getElementById('root');
            if (rootElement && rootElement.children.length > 0) {
              staticContent.style.display = 'none';
              clearInterval(checkReactLoaded);
            }
          }, 100);
          
          // 3秒後には確実に非表示にする
          setTimeout(function() {
            staticContent.style.display = 'none';
            clearInterval(checkReactLoaded);
          }, 3000);
        }
      });
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    
    <!-- 静的コンテンツ -->
    <div id="static-content" class="blog-index-container" style="display: none;">
      <div class="blog-index-wrapper">
        <a href="/if-juku-site/" class="home-link">← ホームに戻る</a>
        <header class="blog-index-header">
          <h1 class="blog-index-title">ブログ</h1>
          <p class="blog-index-subtitle">if(塾)の最新情報、技術記事、お知らせなど</p>
        </header>
        <div class="blog-grid">
          ${postCards}
        </div>
      </div>
    </div>
    
    <div id="modal-root" style="position: fixed; inset: 0; pointer-events: none; z-index: 10000;"></div>
    <script defer="defer" src="/if-juku-site/static/js/main.cd221f0a.js"></script>
  </body>
</html>`;
};

// メイン処理
function generateBlogIndex() {
  console.log('🚀 ブログ一覧ページの生成を開始...');

  // buildディレクトリが存在することを確認
  if (!fs.existsSync(buildDir)) {
    console.error('❌ buildディレクトリが存在しません。');
    process.exit(1);
  }

  // blogディレクトリを作成
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
    console.log('📁 blogディレクトリを作成しました');
  }

  try {
    // index.htmlを生成
    const htmlContent = createBlogIndexHTML();
    const htmlPath = path.join(blogDir, 'index.html');
    
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log(`✅ ブログ一覧ページを生成しました: ${htmlPath}`);
    console.log(`   記事数: ${postsData.posts.length}件`);
  } catch (error) {
    console.error(`❌ ブログ一覧ページの生成に失敗: ${error.message}`);
    process.exit(1);
  }
}

// スクリプト実行
generateBlogIndex();