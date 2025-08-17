#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// posts.jsonを読み込む
const postsData = require('../src/data/posts.json');

// buildディレクトリのパス
const buildDir = path.join(__dirname, '..', 'build');
const materialsDir = path.join(buildDir, 'materials');

// materialsディレクトリを作成
if (!fs.existsSync(materialsDir)) {
  fs.mkdirSync(materialsDir, { recursive: true });
}

// Minecraft関連の記事を抽出
const minecraftPosts = postsData.posts.filter(post => {
  const titleLower = post.title.toLowerCase();
  const contentLower = (post.content || '').toLowerCase();
  const categoriesLower = post.categories.map(cat => cat.toLowerCase());
  
  return titleLower.includes('minecraft') || 
         titleLower.includes('マイクラ') ||
         contentLower.includes('minecraft') ||
         contentLower.includes('マイクラ') ||
         categoriesLower.some(cat => cat.includes('minecraft') || cat.includes('マイクラ'));
});

// HTMLテンプレート
const createMaterialsIndexHTML = () => {
  const postsHTML = minecraftPosts.map(post => {
    const date = new Date(post.date);
    const formattedDate = date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });

    const featuredImage = post.featuredImage ? 
      `/if-juku-site${post.featuredImage.startsWith('/') ? post.featuredImage : '/' + post.featuredImage}` : '';

    return `
      <article class="post-card" onclick="window.location.href='/if-juku-site/post/${post.id}/'">
        ${featuredImage ? `
          <div class="post-image">
            <img src="${featuredImage}" alt="${post.title}" onerror="this.style.display='none'">
          </div>
        ` : ''}
        <div class="post-content">
          <div class="post-meta">
            <span>📅 ${formattedDate}</span>
            <span>✍️ ${post.author}</span>
          </div>
          <h2 class="post-title">${post.title}</h2>
          ${post.excerpt ? `
            <p class="post-excerpt">${post.excerpt.substring(0, 100)}...</p>
          ` : ''}
          ${post.categories && post.categories.length > 0 ? `
            <div class="categories">
              ${post.categories.slice(0, 3).map(cat => 
                `<span class="category">${cat}</span>`
              ).join('')}
            </div>
          ` : ''}
          <div class="read-more">続きを読む →</div>
        </div>
      </article>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="if(塾) - Minecraftを使った楽しいプログラミング学習教材" />
    <title>オンライン教材 - if(塾)</title>
    <link href="/if-juku-site/static/css/main.20399cdb.css" rel="stylesheet">
    <style>
      body { 
        margin: 0; 
        background: linear-gradient(135deg, #0a0e27 0%, #1a1e37 100%);
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        min-height: 100vh;
      }
      .materials-container {
        min-height: 100vh;
        padding: 2rem;
      }
      .content-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        padding-bottom: 4rem;
      }
      .header {
        text-align: center;
        margin-bottom: 4rem;
      }
      .back-links {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
      }
      .back-link {
        color: #4CAF50;
        text-decoration: none;
        font-size: 1rem;
        transition: all 0.3s ease;
      }
      .back-link:hover {
        color: #81C784;
        transform: translateX(-5px);
      }
      .blog-link {
        color: #8a2387;
      }
      .blog-link:hover {
        color: #f27121;
      }
      .title {
        font-size: 3rem;
        font-weight: bold;
        background: linear-gradient(135deg, #4CAF50, #81C784);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 1rem;
      }
      .subtitle {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.7);
      }
      .posts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
      }
      .post-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(76, 175, 80, 0.2);
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        flex-direction: column;
      }
      .post-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
        border-color: #4CAF50;
      }
      .post-image {
        width: 100%;
        height: 200px;
        background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(129, 199, 132, 0.2));
        overflow: hidden;
      }
      .post-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      .post-card:hover .post-image img {
        transform: scale(1.1);
      }
      .post-content {
        padding: 1.5rem;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .post-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.85rem;
      }
      .post-title {
        font-size: 1.3rem;
        font-weight: bold;
        color: white;
        margin: 0 0 1rem 0;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .post-excerpt {
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
        margin-bottom: 1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex: 1;
      }
      .categories {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      .category {
        background: linear-gradient(135deg, #4CAF50, #81C784);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
      }
      .read-more {
        color: #4CAF50;
        font-weight: bold;
        transition: all 0.3s ease;
      }
      .post-card:hover .read-more {
        color: #81C784;
        transform: translateX(5px);
      }
      .no-posts {
        text-align: center;
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.2rem;
        padding: 4rem 2rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 20px;
        border: 1px solid rgba(76, 175, 80, 0.2);
      }
      @media (max-width: 768px) {
        .title {
          font-size: 2rem;
        }
        .subtitle {
          font-size: 1rem;
        }
        .posts-grid {
          grid-template-columns: 1fr;
        }
        .back-links {
          flex-direction: column;
          gap: 1rem;
        }
      }
    </style>
    <script type="text/javascript">
      // 静的コンテンツの表示制御
      (function() {
        // 初期状態で静的コンテンツを非表示
        var style = document.createElement('style');
        style.textContent = '#static-content { display: none !important; }';
        document.head.appendChild(style);
        
        document.addEventListener('DOMContentLoaded', function() {
          var staticContent = document.getElementById('static-content');
          var rootElement = document.getElementById('root');
          
          if (staticContent && rootElement) {
            var checkCount = 0;
            var maxChecks = 30; // 3秒間チェック
            
            var checkReactLoaded = setInterval(function() {
              checkCount++;
              
              // Reactアプリがロードされたかチェック
              if (rootElement.children.length > 0 && rootElement.querySelector('.App')) {
                // Reactアプリがロードされた
                clearInterval(checkReactLoaded);
              } else if (checkCount >= maxChecks) {
                // タイムアウト - 静的コンテンツを表示
                style.textContent = '';
                staticContent.style.display = 'block';
                clearInterval(checkReactLoaded);
              }
            }, 100);
          }
        });
      })();
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    
    <!-- 静的コンテンツ -->
    <div id="static-content" class="materials-container">
        <div class="content-wrapper">
          <div class="back-links">
            <a href="/if-juku-site/" class="back-link">← ホームに戻る</a>
            <a href="/if-juku-site/blog/" class="back-link blog-link">📝 ブログ記事を見る</a>
          </div>
          
          <div class="header">
            <h1 class="title">オンライン教材</h1>
            <p class="subtitle">Minecraftを使った楽しいプログラミング学習</p>
          </div>

          ${minecraftPosts.length === 0 ? `
            <div class="no-posts">
              教材はまだありません
            </div>
          ` : `
            <div class="posts-grid">
              ${postsHTML}
            </div>
          `}
        </div>
      </div>
    </div>
    
    <div id="modal-root" style="position: fixed; inset: 0; pointer-events: none; z-index: 10000;"></div>
    <script defer src="/if-juku-site/static/js/main.ed265cc8.js"></script>
  </body>
</html>`;
};

// index.htmlファイルを生成
const indexHTML = createMaterialsIndexHTML();
const indexPath = path.join(materialsDir, 'index.html');
fs.writeFileSync(indexPath, indexHTML, 'utf8');

console.log(`Generated materials index at ${indexPath}`);
console.log(`Total materials: ${minecraftPosts.length}`);