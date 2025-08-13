import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './BlogPost.css';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  link: string;
  date: string;
  author: string;
  categories: string[];
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const postId = parseInt(id);
        if (isNaN(postId)) {
          setError('無効な記事IDです');
          return;
        }
        
        // インデックスから記事を検索
        const indexModule = await import('../data/posts/index.json');
        const allPosts = indexModule.default.posts;
        const postMeta = allPosts.find((p: any) => p.id === postId);
        
        if (!postMeta) {
          setError('記事が見つかりませんでした');
          return;
        }
        
        // カテゴリ別の詳細データを読み込み
        try {
          const postModule = await import(`../data/posts/${postMeta.category}/${postId}.json`);
          setPost(postModule.default);
        } catch (err) {
          console.error(`Failed to load post details for ${postId}:`, err);
          setError('記事の詳細データの読み込みに失敗しました');
        }
        
      } catch (err) {
        console.error('Error loading post:', err);
        setError('記事の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-loading">
          <div className="loading-spinner"></div>
          <p>記事を読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-container">
        <div className="blog-post-error">
          <h2>エラー</h2>
          <p>{error || '記事が見つかりませんでした'}</p>
          <button onClick={() => navigate(-1)} className="back-button">
            戻る
          </button>
        </div>
      </div>
    );
  }

  // 画像URLを変換する関数
  const convertImageUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    
    // WordPressのURLから年月とファイル名を抽出
    const match = url.match(/\/(\d{4})\/(\d{2})\/([^\/]+)$/);
    if (match) {
      const [, year, month, filename] = match;
      return `/${year}/${month}/${filename}`;
    }
    
    // 既に相対パスの場合はそのまま返す
    if (url.startsWith('/')) {
      return url;
    }
    
    return url;
  };

  // コンテンツ内の画像URLを変換
  const convertContentImages = (content: string): string => {
    if (!content) return '';
    
    // img src属性のURLを変換
    return content.replace(/https?:\/\/[^\/]+\/wp-content\/uploads\/(\d{4})\/(\d{2})\/([^"'\s]+)/g, '/$1/$2/$3');
  };

  return (
    <div className="blog-post-container">
      <div className="blog-post-header">
        <Link to="/" className="back-to-home">← ホームに戻る</Link>
        <Link to="/blog" className="back-to-list">← 記事一覧に戻る</Link>
      </div>
      
      <article className="blog-post">
        <header className="blog-post-header-content">
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <span className="blog-post-date">{formatDate(post.date)}</span>
            <span className="blog-post-author">by {post.author}</span>
            <div className="blog-post-categories">
              {post.categories.map((category, index) => (
                <span key={index} className="blog-post-category">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </header>

        {post.featuredImage && convertImageUrl(post.featuredImage) && (
          <div className="blog-post-image">
            <img src={convertImageUrl(post.featuredImage)!} alt={post.title} />
          </div>
        )}

        <div className="blog-post-content">
          <div className="blog-post-excerpt">
            <p>{post.excerpt}</p>
          </div>
          
          <div className="blog-post-body">
            <div dangerouslySetInnerHTML={{ __html: convertContentImages(post.content) }} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;