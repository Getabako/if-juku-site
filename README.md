# if(塾) - AIと起業が学べる未来型教室

## プロジェクト概要
- **名前**: if(塾)公式サイト
- **目標**: 現代的でインタラクティブな塾のランディングページ
- **特徴**: 
  - React + TypeScriptによるモダンなSPA
  - GitHub Pages対応のサブパスルーティング
  - アニメーション豊富なUI/UX
  - レスポンシブデザイン

## URLs
- **Production**: https://getabako.github.io/if-juku-site/
- **GitHub**: https://github.com/Getabako/if-juku-site
- **ブログ一覧**: https://getabako.github.io/if-juku-site/blog/
- **ブログ記事**: https://getabako.github.io/if-juku-site/post/[記事ID]/

## デプロイ情報
- **デプロイブランチ**: gh-pages
- **自動デプロイ**: mainブランチへのプッシュで自動的にGitHub Actionsがデプロイ
- **ビルドコマンド**: `npm run build` (静的HTMLも同時生成)

## 最近の更新内容 (2025-01-15)

### YouTubeセクションの改善
- ✅ 架空の動画から実際のif(塾)チャンネルの動画に置き換え
- ✅ 動画カードクリック時の挙動を変更：
  - Before: モーダルで埋め込み再生（音声のみ再生される問題あり）
  - After: 直接YouTubeページに遷移して動画再生
- ✅ 実際の動画IDとタイトルを設定
- ✅ 動画更新ガイドをドキュメント化

### 実装済みの主要機能
- ✅ Materialsセクション: Minecraft関連記事のスクロールカード表示（右→左）
- ✅ Newsセクション: 非Minecraft記事のスクロールカード表示（左→右）  
- ✅ YouTubeセクション: チャンネル動画のスクロールカード表示
- ✅ Coursesセクション: 背景画像の更新（liberal.png, ideal.png）
- ✅ GitHub Pages サブパス対応（/if-juku-site）
- ✅ PUBLIC_URL環境変数の適切な処理

## データアーキテクチャ
- **フロントエンド**: React 18 + TypeScript
- **スタイリング**: styled-components + Tailwind CSS
- **アニメーション**: Framer Motion
- **ルーティング**: React Router v6
- **デプロイ**: GitHub Pages (gh-pages branch)

## ユーザーガイド

### YouTube動画の更新方法
1. YouTubeチャンネルから動画URLをコピー
2. URLから動画ID（?v=以降）を抽出
3. `src/components/Sections/YouTube.jsx`の`popularVideos`配列を更新
4. ビルドしてデプロイ

詳細は`docs/youtube-video-update-guide.md`を参照

### ローカル開発
```bash
npm install
npm start          # 開発サーバー起動
npm run build      # 本番ビルド
npm run deploy     # GitHub Pagesへデプロイ
```

## デプロイメント
- **Platform**: GitHub Pages
- **Status**: ✅ Active
- **Tech Stack**: React + TypeScript + styled-components
- **Last Updated**: 2025-01-15

## プロジェクト構造
```
webapp/
├── src/
│   ├── components/
│   │   └── Sections/      # 各セクションコンポーネント
│   ├── utils/
│   │   └── paths.js       # PUBLIC_URL処理
│   └── data/
│       └── posts.json     # ブログ記事データ
├── public/
│   └── images/            # 画像アセット
├── docs/
│   └── youtube-video-update-guide.md
└── scripts/
    └── check-images.js    # 画像パス検証
```

## 今後の改善案
- [ ] YouTube Data API統合（自動更新）
- [ ] ブログ記事のCMS統合
- [ ] お問い合わせフォームの実装
- [ ] 多言語対応
- [ ] パフォーマンス最適化