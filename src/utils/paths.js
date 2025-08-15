// GitHub Pages用のパス解決ヘルパー
export const getPublicUrl = () => {
  // process.env.PUBLIC_URLが空または'./'の場合は'/if-juku-site'を使用
  const url = process.env.PUBLIC_URL;
  if (!url || url === '.' || url === './') {
    return '/if-juku-site';
  }
  return url;
};

// アセットへのパスを生成
export const getAssetPath = (path) => {
  // パスが/で始まる場合は削除
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${getPublicUrl()}/${cleanPath}`;
};