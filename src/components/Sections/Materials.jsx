import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { getAssetPath } from '../../utils/paths';
import postsData from '../../data/posts.json';

const MaterialsContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
  padding: 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const scrollRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const ScrollContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 2rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100px;
    background: linear-gradient(to right, ${theme.colors.background.primary}, transparent);
    z-index: 2;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100px;
    background: linear-gradient(to left, ${theme.colors.background.primary}, transparent);
    z-index: 2;
    pointer-events: none;
  }
`;

const ScrollingWrapper = styled.div`
  display: flex;
  animation: ${scrollRight} 30s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const PostCard = styled(motion.div)`
  min-width: 300px;
  height: 200px;
  margin: 0 1rem;
  background: linear-gradient(135deg, rgba(138, 35, 135, 0.1), rgba(25, 118, 210, 0.1));
  border: 1px solid rgba(138, 35, 135, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(138, 35, 135, 0.3);
    border-color: ${theme.colors.primary.main};
    background: linear-gradient(135deg, rgba(138, 35, 135, 0.2), rgba(25, 118, 210, 0.2));
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #8a2387, #e94057, #f27121);
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 0.3;
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 100px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const PostTitle = styled.h3`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PostDate = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-top: auto;
`;

const ViewAllButton = styled(motion.button)`
  background: linear-gradient(135deg, #8a2387, #e94057);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(138, 35, 135, 0.4);
  }
`;

const Materials = () => {
  const navigate = useNavigate();
  const [minecraftPosts, setMinecraftPosts] = useState([]);

  useEffect(() => {
    // Minecraft関連の記事をフィルタリング
    const filtered = postsData.posts.filter(post => 
      post.categories && post.categories.some(cat => 
        cat.toLowerCase().includes('minecraft')
      )
    );
    
    // 最新順にソート
    const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // スクロール用に複製して連結
    setMinecraftPosts([...sorted, ...sorted]);
  }, []);

  const handleCardClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleViewAll = () => {
    navigate('/materials');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <MaterialsContainer id="materials">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="twinkling-text"
      >
        オンライン教材
      </SectionTitle>
      
      {minecraftPosts.length > 0 ? (
        <>
          <ScrollContainer>
            <ScrollingWrapper>
              {minecraftPosts.map((post, index) => (
                <PostCard
                  key={`${post.id}-${index}`}
                  onClick={() => handleCardClick(post.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {post.featuredImage && (
                    <PostImage bgImage={getAssetPath(post.featuredImage.replace(/^\//, ''))} />
                  )}
                  <PostTitle>{post.title}</PostTitle>
                  <PostDate>{formatDate(post.date)}</PostDate>
                </PostCard>
              ))}
            </ScrollingWrapper>
          </ScrollContainer>
          
          <ViewAllButton
            onClick={handleViewAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            すべての教材を見る
          </ViewAllButton>
        </>
      ) : (
        <p style={{ color: 'white', textAlign: 'center' }}>記事を読み込み中...</p>
      )}
    </MaterialsContainer>
  );
};

export default Materials;