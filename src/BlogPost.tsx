import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from './styles/theme';
import { getAssetPath } from './utils/paths';
import { disableSwiper, enableSwiper } from './utils/disableSwiper';
import postsData from './data/posts.json';

// スタイル定義
const BlogPostContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const BackLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  color: ${theme.colors.primary.main};
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: ${theme.colors.secondary.main};
    transform: translateX(-5px);
  }
`;

const Article = styled(motion.article)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const Header = styled.header`
  padding: 3rem 3rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Category = styled.span`
  background: linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const Content = styled.div`
  padding: 3rem;
  color: white;
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Excerpt = styled.div`
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  background: rgba(138, 35, 135, 0.1);
  border-left: 4px solid ${theme.colors.primary.main};
  border-radius: 8px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Body = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 2.5rem 0 1.5rem;
    color: ${theme.colors.primary.main};
    border-bottom: 2px solid rgba(138, 35, 135, 0.3);
    padding-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 2rem 0 1rem;
    color: ${theme.colors.secondary.main};
  }
  
  p {
    margin: 1.5rem 0;
  }
  
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
    
    li {
      margin: 0.8rem 0;
    }
  }
  
  blockquote {
    margin: 2rem 0;
    padding: 1.5rem;
    background: rgba(25, 118, 210, 0.1);
    border-left: 4px solid ${theme.colors.secondary.main};
    border-radius: 8px;
    font-style: italic;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2rem 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  a {
    color: ${theme.colors.primary.main};
    text-decoration: underline;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${theme.colors.secondary.main};
    }
  }
  
  code {
    background: rgba(0, 0, 0, 0.3);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 0.9em;
  }
  
  pre {
    background: rgba(0, 0, 0, 0.5);
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 2rem 0;
    
    code {
      background: none;
      padding: 0;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: white;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: ${theme.colors.primary.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: white;
  text-align: center;
`;

const ErrorButton = styled(motion.button)`
  background: linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main});
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(138, 35, 135, 0.4);
  }
`;

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

  // コンポーネントマウント時にスワイプ機能を無効化とスクロール位置リセット
  useEffect(() => {
    disableSwiper();
    window.scrollTo(0, 0);
    
    // クリーンアップ関数でスワイプ機能を再有効化
    return () => {
      enableSwiper();
    };
  }, []);

  useEffect(() => {
    const loadPost = () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const postId = parseInt(id);
        if (isNaN(postId)) {
          setError('無効な記事IDです');
          setLoading(false);
          return;
        }
        
        // posts.jsonから記事を検索
        const foundPost = postsData.posts.find((p: any) => p.id === postId);
        
        if (!foundPost) {
          setError('記事が見つかりませんでした');
          setLoading(false);
          return;
        }
        
        setPost(foundPost);
        
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

  // コンテンツ内の画像URLを変換
  const convertContentImages = (content: string): string => {
    if (!content) return '';
    
    // WordPressの画像URLをGitHub Pages用に変換
    let convertedContent = content.replace(
      /https?:\/\/[^\/]+\/wp-content\/uploads\/(\d{4})\/(\d{2})\/([^"'\s]+)/g,
      (match, year, month, filename) => getAssetPath(`${year}/${month}/${filename}`)
    );
    
    // 相対パスの画像も変換
    convertedContent = convertedContent.replace(
      /src="\/(\d{4})\/(\d{2})\/([^"]+)"/g,
      (match, year, month, filename) => `src="${getAssetPath(`${year}/${month}/${filename}`)}"`
    );
    
    return convertedContent;
  };

  if (loading) {
    return (
      <BlogPostContainer>
        <ContentWrapper>
          <LoadingContainer>
            <LoadingSpinner />
            <p style={{ marginTop: '1rem' }}>記事を読み込み中...</p>
          </LoadingContainer>
        </ContentWrapper>
      </BlogPostContainer>
    );
  }

  if (error || !post) {
    return (
      <BlogPostContainer>
        <ContentWrapper>
          <ErrorContainer>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>エラー</h2>
            <p>{error || '記事が見つかりませんでした'}</p>
            <ErrorButton
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              戻る
            </ErrorButton>
          </ErrorContainer>
        </ContentWrapper>
      </BlogPostContainer>
    );
  }

  return (
    <BlogPostContainer>
      <ContentWrapper>
        <BackLinks>
          <BackLink to="/">← ホームに戻る</BackLink>
          <BackLink to="/blog">← 記事一覧に戻る</BackLink>
        </BackLinks>
        
        <Article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Header>
            <Title>{post.title}</Title>
            <Meta>
              <MetaItem>📅 {formatDate(post.date)}</MetaItem>
              <MetaItem>✍️ {post.author}</MetaItem>
            </Meta>
            {post.categories && post.categories.length > 0 && (
              <Categories>
                {post.categories.map((category, index) => (
                  <Category key={index}>{category}</Category>
                ))}
              </Categories>
            )}
          </Header>

          {post.featuredImage && (
            <FeaturedImage>
              <img 
                src={getAssetPath(post.featuredImage.replace(/^\//, ''))} 
                alt={post.title}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </FeaturedImage>
          )}

          <Content>
            {post.excerpt && (
              <Excerpt>
                <p>{post.excerpt}</p>
              </Excerpt>
            )}
            
            <Body dangerouslySetInnerHTML={{ __html: convertContentImages(post.content) }} />
          </Content>
        </Article>
      </ContentWrapper>
    </BlogPostContainer>
  );
};

export default BlogPost;