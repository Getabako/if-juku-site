import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const MaterialsContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.background.primary};
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled(motion.article)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  transition: transform ${theme.animations.duration.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 255, 255, 0.4);
  }
`;

const BlogTitle = styled.h3`
  font-size: 1.4rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 1rem;
  font-family: ${theme.fonts.secondary};
  text-shadow: ${theme.colors.glow.blue};
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
`;

const ReadMoreButton = styled.button`
  background: linear-gradient(45deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark});
  border: none;
  color: ${theme.colors.background.primary};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${theme.colors.secondary.main};
  }
`;

const LoadMoreButton = styled(motion.button)`
  background: linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark});
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.text.primary};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin: 2rem auto;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px ${theme.colors.primary.main};
  }
`;

const Materials = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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
    }
  ];

  useEffect(() => {
    setBlogPosts(samplePosts);
  }, []);

  const loadMorePosts = () => {
    setLoading(true);
    // シミュレートされた読み込み遅延
    setTimeout(() => {
      const morePosts = samplePosts.map((post, index) => ({
        ...post,
        id: post.id + blogPosts.length,
        title: post.title + " (続編)",
        date: "2025-07-25"
      }));
      setBlogPosts(prev => [...prev, ...morePosts]);
      setLoading(false);
    }, 1000);
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
        
        <BlogGrid>
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="cyber-frame"
            >
              <BlogTitle>{post.title}</BlogTitle>
              <BlogDate>{post.date}</BlogDate>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <ReadMoreButton>続きを読む</ReadMoreButton>
            </BlogCard>
          ))}
        </BlogGrid>
        
        <LoadMoreButton
          onClick={loadMorePosts}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "読み込み中..." : "もっと読む"}
        </LoadMoreButton>
      </ContentWrapper>
    </MaterialsContainer>
  );
};

export default Materials;