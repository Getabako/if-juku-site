import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from './styles/theme';
import { getAssetPath } from './utils/paths';
import { disableSwiper, enableSwiper } from './utils/disableSwiper';
import postsData from './data/posts.json';

// スタイル定義 - オンライン教材用の色に変更
const MaterialsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1e37 100%);
  padding: 2rem;
  overflow-y: auto;
  height: auto;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 4rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  color: #4CAF50;
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #81C784;
    transform: translateX(-5px);
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #4CAF50, #81C784);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const FilterButton = styled(motion.button)<{ $active: boolean }>`
  padding: 0.8rem 1.5rem;
  border: 2px solid ${props => props.$active ? '#4CAF50' : 'rgba(76, 175, 80, 0.3)'};
  background: ${props => props.$active ? 'rgba(76, 175, 80, 0.2)' : 'transparent'};
  color: ${props => props.$active ? '#81C784' : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 25px;
  font-size: 1rem;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(76, 175, 80, 0.1);
    border-color: #4CAF50;
    color: white;
    transform: scale(1.05);
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
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
    border-color: #4CAF50;
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(129, 199, 132, 0.2));
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${PostCard}:hover & img {
    transform: scale(1.1);
  }
`;

const PostContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PostMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
`;

const PostTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostExcerpt = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const ReadMoreButton = styled.div`
  color: #4CAF50;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  ${PostCard}:hover & {
    color: #81C784;
    gap: 1rem;
  }
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  margin-bottom: 1rem;
`;

const Category = styled.span`
  background: linear-gradient(135deg, #4CAF50, #81C784);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const NoPostsMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(76, 175, 80, 0.2);
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

const MaterialsList: React.FC = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Post[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [categories, setCategories] = useState<string[]>(['すべて']);

  // コンポーネントマウント時にスワイプ機能を無効化
  useEffect(() => {
    disableSwiper();
    window.scrollTo(0, 0);
    
    // 静的HTMLを確実に非表示にする
    const staticContent = document.getElementById('static-content');
    if (staticContent) {
      staticContent.style.display = 'none';
    }
    
    // クリーンアップ関数でスワイプ機能を再有効化
    return () => {
      enableSwiper();
    };
  }, []);

  useEffect(() => {
    // Minecraft関連の記事のみを抽出（オンライン教材）
    const minecraftPosts = postsData.posts.filter((post: Post) => {
      const titleLower = post.title.toLowerCase();
      const contentLower = (post.content || '').toLowerCase();
      const categoriesLower = post.categories.map(cat => cat.toLowerCase());
      
      return titleLower.includes('minecraft') || 
             titleLower.includes('マイクラ') ||
             contentLower.includes('minecraft') ||
             contentLower.includes('マイクラ') ||
             categoriesLower.some(cat => cat.includes('minecraft') || cat.includes('マイクラ'));
    });

    setMaterials(minecraftPosts);
    setFilteredMaterials(minecraftPosts);

    // カテゴリーを抽出
    const allCategories = new Set<string>();
    minecraftPosts.forEach((post: Post) => {
      post.categories.forEach(cat => allCategories.add(cat));
    });
    setCategories(['すべて', ...Array.from(allCategories)]);
  }, []);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'すべて') {
      setFilteredMaterials(materials);
    } else {
      setFilteredMaterials(materials.filter(post => 
        post.categories.includes(category)
      ));
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  return (
    <MaterialsContainer>
      <ContentWrapper>
        <BackLink to="/">← ホームに戻る</BackLink>
        
        <Header>
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            オンライン教材
          </Title>
          <Subtitle>Minecraftを使った楽しいプログラミング学習</Subtitle>
        </Header>

        <FilterContainer>
          {categories.map((category) => (
            <FilterButton
              key={category}
              $active={selectedCategory === category}
              onClick={() => handleCategoryFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </FilterButton>
          ))}
        </FilterContainer>

        {filteredMaterials.length === 0 ? (
          <NoPostsMessage>
            選択したカテゴリーの教材はまだありません
          </NoPostsMessage>
        ) : (
          <PostsGrid>
            {filteredMaterials.map((post, index) => (
              <PostCard
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {post.featuredImage && (
                  <PostImage>
                    <img 
                      src={getAssetPath(post.featuredImage.replace(/^\//, ''))} 
                      alt={post.title}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </PostImage>
                )}
                
                <PostContent>
                  <PostMeta>
                    <span>📅 {formatDate(post.date)}</span>
                    <span>✍️ {post.author}</span>
                  </PostMeta>
                  
                  <PostTitle>{post.title}</PostTitle>
                  
                  {post.excerpt && (
                    <PostExcerpt>
                      {post.excerpt.length > 100 
                        ? `${post.excerpt.substring(0, 100)}...` 
                        : post.excerpt}
                    </PostExcerpt>
                  )}
                  
                  {post.categories && post.categories.length > 0 && (
                    <Categories>
                      {post.categories.slice(0, 3).map((category, idx) => (
                        <Category key={idx}>{category}</Category>
                      ))}
                    </Categories>
                  )}
                  
                  <ReadMoreButton>
                    続きを読む →
                  </ReadMoreButton>
                </PostContent>
              </PostCard>
            ))}
          </PostsGrid>
        )}
      </ContentWrapper>
    </MaterialsContainer>
  );
};

export default MaterialsList;