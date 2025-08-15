# YouTube動画の更新ガイド

## 現在の実装方法

現在、YouTube.jsxファイルでは、YouTube Data APIを使わずに動画を手動で管理しています。これにより、APIキーの管理やクォータ制限を回避できます。

## 動画IDの取得方法

### 1. YouTubeチャンネルから動画IDを取得

1. [if(塾)のYouTubeチャンネル](https://www.youtube.com/@if-juku)にアクセス
2. 表示したい動画をクリック
3. ブラウザのアドレスバーからURLをコピー
4. URLから動画IDを抽出：
   - 例: `https://www.youtube.com/watch?v=0F4SIptjCDs`
   - 動画ID: `0F4SIptjCDs`（`?v=`の後の部分）

### 2. 動画情報の更新

`src/components/Sections/YouTube.jsx`ファイルの`popularVideos`配列を更新：

```javascript
const popularVideos = [
  {
    id: '動画ID',
    title: '動画タイトル',
    views: '視聴回数',
    thumbnail: 'https://i.ytimg.com/vi/動画ID/maxresdefault.jpg'
  },
  // 他の動画...
];
```

## サムネイルURLのフォーマット

YouTubeのサムネイルは以下のフォーマットで取得できます：

- 高画質: `https://i.ytimg.com/vi/動画ID/maxresdefault.jpg`
- 中画質: `https://i.ytimg.com/vi/動画ID/hqdefault.jpg`
- 低画質: `https://i.ytimg.com/vi/動画ID/mqdefault.jpg`

## 自動更新オプション（将来の実装）

### オプション1: RSS フィード（サーバーサイド必要）

```javascript
// バックエンドでRSSを取得してCORS回避
const RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID';
```

### オプション2: YouTube Data API v3

```javascript
// APIキーが必要
const API_KEY = 'YOUR_API_KEY';
const CHANNEL_ID = 'YOUR_CHANNEL_ID';
const API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=8`;
```

## 現在の動画リスト

1. **日本で一番nowい塾 if(塾)** - `0F4SIptjCDs`
2. **"誰でも通える未来型教室" 高校生が仮想空間で学ぶ学習塾** - `pH7pgybx-ao`
3. **if(塾)高崎圧倒的停滞…** - `jGvWryXcp6Y`

## 更新手順

1. YouTubeチャンネルから新しい動画のURLをコピー
2. 動画IDを抽出
3. `YouTube.jsx`の`popularVideos`配列に新しい動画オブジェクトを追加
4. コミットしてGitHubにプッシュ
5. GitHub Pagesにデプロイ

## トラブルシューティング

### サムネイルが表示されない場合

- `onError`ハンドラーが自動的に中画質サムネイルにフォールバック
- maxresdefaultが存在しない動画もあるため

### 動画が再生されない場合

- 動画IDが正しいか確認
- 動画が公開設定になっているか確認
- 埋め込みが許可されているか確認