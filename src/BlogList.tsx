import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from './styles/theme';
import { getAssetPath } from './utils/paths';
import { disableSwiper, enableSwiper } from './utils/disableSwiper';
import postsData from './data/posts.json';

// スタイル定義
const BlogListContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const BackLink = styled(Link)`
  color: ${theme.colors.primary.main};
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  
  &:hover {
    color: ${theme.colors.secondary.main};
    transform: translateX(-5px);
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const CategoryButton = styled(motion.button)<{ $active: boolean }>`
  background: ${props => props.$active 
    ? `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main})`
    : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: 1px solid ${props => props.$active 
    ? 'transparent'
    : 'rgba(255, 255, 255, 0.2)'};
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 20px ${props => props.$active 
      ? 'rgba(138, 35, 135, 0.4)'
      : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled(motion.article)`
  background: linear-gradient(135deg, rgba(138, 35, 135, 0.1), rgba(25, 118, 210, 0.1));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(138, 35, 135, 0.3);
    border-color: ${theme.colors.primary.main};
    
    &::before {
      opacity: 1;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(138, 35, 135, 0.2), rgba(25, 118, 210, 0.2));
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
`;

const CardImage = styled.div<{ $bgImage?: string }>`
  width: 100%;
  height: 200px;
  background: ${props => props.$bgImage 
    ? `url(${props.$bgImage})` 
    : `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main})`};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 1;
`;

const CardTitle = styled.h2`
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const CardDate = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const CardCategory = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.85rem;
`;

const CardExcerpt = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 1rem;
`;

const ReadMore = styled.span`
  color: ${theme.colors.primary.main};
  font-weight: bold;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  ${PostCard}:hover & {
    color: ${theme.colors.secondary.main};
    transform: translateX(5px);
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

const NoPostsMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
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

interface CategoryInfo {
  minecraft: string;
  news: string;
  'if塾ブログ': string;
  'AI講座': string;
  others: string;
  [key: string]: string;
}

const categoryNames: CategoryInfo = {
  minecraft: 'Minecraft',
  news: 'お知らせ',
  'if塾ブログ': 'if塾ブログ',
  'AI講座': 'AI講座',
  others: 'その他'
};

const BlogList: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'all');

  // コンポーネントマウント時にスワイプ機能を無効化
  useEffect(() => {
    disableSwiper();
    
    // クリーンアップ関数でスワイプ機能を再有効化
    return () => {
      enableSwiper();
    };
  }, []);

  useEffect(() => {
    const loadPosts = () => {
      try {
        setLoading(true);
        
        // posts.jsonから全記事を取得
        let filteredPosts = [...postsData.posts];
        
        // カテゴリーでフィルタリング
        if (category && category !== 'all') {
          if (category === 'minecraft') {
            // Minecraft関連の記事
            filteredPosts = filteredPosts.filter((post: Post) => 
              post.categories && post.categories.some(cat => 
                cat.toLowerCase().includes('minecraft')
              )
            );
          } else {
            // その他のカテゴリー
            filteredPosts = filteredPosts.filter((post: Post) => 
              post.categories && post.categories.some(cat => 
                cat === category || cat === categoryNames[category]
              )
            );
          }
        }
        
        // 日付順にソート（新しい順）
        filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setPosts(filteredPosts);
        setError(null);
        
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('記事の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [category]);

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    if (newCategory === 'all') {
      navigate('/blog');
    } else {
      navigate(`/blog/${newCategory}`);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  const getCategoryDisplay = (post: Post): string => {
    if (!post.categories || post.categories.length === 0) return 'その他';
    
    // Minecraft関連のカテゴリーを探す
    const minecraftCat = post.categories.find(cat => 
      cat.toLowerCase().includes('minecraft')
    );
    if (minecraftCat) return 'Minecraft';
    
    // その他のカテゴリーを返す
    return post.categories[0];
  };

  const getExcerpt = (post: Post): string => {
    // HTMLタグを削除してプレーンテキストを取得
    const plainText = post.excerpt.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  };

  if (loading) {
    return (
      <BlogListContainer>
        <ContentWrapper>
          <Header>
            <BackLink to="/">← ホームに戻る</BackLink>
          </Header>
          <LoadingContainer>
            <LoadingSpinner />
            <p style={{ marginTop: '1rem' }}>記事を読み込み中...</p>
          </LoadingContainer>
        </ContentWrapper>
      </BlogListContainer>
    );
  }

  if (error) {
    return (
      <BlogListContainer>
        <ContentWrapper>
          <Header>
            <BackLink to="/">← ホームに戻る</BackLink>
          </Header>
          <ErrorContainer>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>エラー</h2>
            <p>{error}</p>
          </ErrorContainer>
        </ContentWrapper>
      </BlogListContainer>
    );
  }

  return (
    <BlogListContainer>
      <ContentWrapper>
        <Header>
          <BackLink to="/">← ホームに戻る</BackLink>
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ブログ記事一覧
          </Title>
        </Header>

        <CategoryFilter>
          <CategoryButton
            $active={selectedCategory === 'all'}
            onClick={() => handleCategoryChange('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            すべて
          </CategoryButton>
          <CategoryButton
            $active={selectedCategory === 'minecraft'}
            onClick={() => handleCategoryChange('minecraft')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Minecraft
          </CategoryButton>
          {Object.entries(categoryNames).filter(([key]) => key !== 'minecraft').map(([key, name]) => (
            <CategoryButton
              key={key}
              $active={selectedCategory === key}
              onClick={() => handleCategoryChange(key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {name}
            </CategoryButton>
          ))}
        </CategoryFilter>

        {posts.length === 0 ? (
          <NoPostsMessage>
            <p>記事が見つかりませんでした</p>
          </NoPostsMessage>
        ) : (
          <PostsGrid>
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <CardLink to={`/post/${post.id}`}>
                  <CardImage 
                    $bgImage={post.featuredImage ? getAssetPath(post.featuredImage.replace(/^\//, '')) : undefined}
                  />
                  <CardContent>
                    <CardTitle>{post.title}</CardTitle>
                    <CardMeta>
                      <CardDate>📅 {formatDate(post.date)}</CardDate>
                      <CardCategory>{getCategoryDisplay(post)}</CardCategory>
                    </CardMeta>
                    <CardExcerpt>{getExcerpt(post)}</CardExcerpt>
                    <ReadMore>
                      記事を読む →
                    </ReadMore>
                  </CardContent>
                </CardLink>
              </PostCard>
            ))}
          </PostsGrid>
        )}
      </ContentWrapper>
    </BlogListContainer>
  );
};

export default BlogList;