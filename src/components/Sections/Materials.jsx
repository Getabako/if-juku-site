import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

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
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const ScrollContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
`;

const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const ScrollingWrapper = styled.div`
  display: flex;
  gap: 2rem;
  animation: ${scrollAnimation} 30s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const BlogCard = styled(motion.article)`
  flex: 0 0 350px;
  background: rgba(26, 26, 26, 0.95);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  transition: transform ${theme.animations.duration.normal};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 40px rgba(0, 255, 255, 0.4);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: 0 0 280px;
    padding: 1.5rem;
  }
`;

const BlogTitle = styled.h3`
  font-size: 1.4rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 1rem;
  font-family: ${theme.fonts.secondary};
  text-shadow: ${theme.colors.glow.blue};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogDate = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const BlogExcerpt = styled.p`
  color: ${theme.colors.text.primary};
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMoreButton = styled.span`
  color: ${theme.colors.secondary.main};
  font-weight: bold;
  display: inline-block;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    text-shadow: 0 0 10px ${theme.colors.secondary.main};
  }
`;

const ViewAllButton = styled(motion.button)`
  background: linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark});
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.text.primary};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px ${theme.colors.primary.main};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const Materials = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  // サンプルブログデータ
  const samplePosts = [
    {
      id: 1,
      title: "プログラミング基礎講座：変数とデータ型",
      date: "2025-08-15",
      excerpt: "プログラミングの基本となる変数とデータ型について学びましょう。初心者にも分かりやすく解説します。"
    },
    {
      id: 2,
      title: "AI入門：機械学習の基本概念",
      date: "2025-08-10",
      excerpt: "AIと機械学習の基本的な概念を理解し、実際のプログラムで体験してみましょう。"
    },
    {
      id: 3,
      title: "Web開発入門：HTML & CSS の基本",
      date: "2025-08-05",
      excerpt: "Webサイト制作の基本となるHTMLとCSSを学んで、自分だけのWebページを作ってみよう。"
    },
    {
      id: 4,
      title: "マインクラフトで学ぶプログラミング思考",
      date: "2025-07-30",
      excerpt: "マインクラフトを使ってプログラミング的思考を身につける方法を紹介します。"
    },
    {
      id: 5,
      title: "Pythonで作るゲーム開発入門",
      date: "2025-07-25",
      excerpt: "Pythonを使って簡単なゲームを作りながらプログラミングを学びます。"
    },
    {
      id: 6,
      title: "データベース入門：SQLの基礎",
      date: "2025-07-20",
      excerpt: "データベースとSQLの基本を学んで、データを効率的に管理する方法を身につけよう。"
    }
  ];

  useEffect(() => {
    // 無限スクロールのために配列を複製
    setBlogPosts([...samplePosts, ...samplePosts]);
  }, []);

  const handleViewAll = () => {
    window.location.href = '/blog/materials';
  };

  const handleCardClick = (postId) => {
    window.location.href = `/post/${postId}`;
  };

  return (
    <MaterialsContainer id="materials">
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          オンライン教材
        </SectionTitle>
        
        <ScrollContainer>
          <ScrollingWrapper>
            {blogPosts.map((post, index) => (
              <BlogCard
                key={`${post.id}-${index}`}
                onClick={() => handleCardClick(post.id)}
                whileHover={{ y: -5 }}
                className="cyber-frame"
              >
                <BlogTitle>{post.title}</BlogTitle>
                <BlogDate>{post.date}</BlogDate>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <ReadMoreButton>続きを読む →</ReadMoreButton>
              </BlogCard>
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
      </ContentWrapper>
    </MaterialsContainer>
  );
};

export default Materials;