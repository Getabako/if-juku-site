import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const NewsContainer = styled.section`
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

const scrollAnimationRTL = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
`;

const ScrollingWrapper = styled.div`
  display: flex;
  gap: 2rem;
  animation: ${scrollAnimationRTL} 30s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const NewsCard = styled(motion.article)`
  flex: 0 0 350px;
  background: rgba(26, 26, 26, 0.95);
  border: 2px solid ${theme.colors.secondary.main};
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
  transition: transform ${theme.animations.duration.normal};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 40px rgba(0, 255, 0, 0.4);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: 0 0 280px;
    padding: 1.5rem;
  }
`;

const NewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const NewsTitle = styled.h3`
  font-size: 1.4rem;
  color: ${theme.colors.secondary.main};
  margin-bottom: 1rem;
  font-family: ${theme.fonts.secondary};
  text-shadow: 0 0 10px ${theme.colors.secondary.main};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsDate = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const NewsExcerpt = styled.p`
  color: ${theme.colors.text.primary};
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsCategory = styled.span`
  display: inline-block;
  background: ${theme.colors.secondary.main};
  color: ${theme.colors.background.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ReadMoreButton = styled.span`
  color: ${theme.colors.primary.main};
  font-weight: bold;
  display: inline-block;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    text-shadow: 0 0 10px ${theme.colors.primary.main};
  }
`;

const ViewAllButton = styled(motion.button)`
  background: linear-gradient(45deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark});
  border: 2px solid ${theme.colors.secondary.main};
  color: ${theme.colors.background.primary};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px ${theme.colors.secondary.main};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const News = () => {
  const [newsPosts, setNewsPosts] = useState([]);

  // サンプルニュースデータ
  const sampleNews = [
    {
      id: 1,
      title: "2025年夏期講習の受付を開始しました",
      date: "2025-08-20",
      excerpt: "夏休み期間中の特別プログラムの受付を開始しました。AIプログラミングとゲーム開発の集中講座です。",
      category: "お知らせ"
    },
    {
      id: 2,
      title: "生徒作品がプログラミングコンテストで入賞",
      date: "2025-08-18",
      excerpt: "当塾の生徒が開発したAIチャットボットが、全国プログラミングコンテストで優秀賞を受賞しました。",
      category: "実績"
    },
    {
      id: 3,
      title: "新コース「起業家育成プログラム」開講",
      date: "2025-08-15",
      excerpt: "中高生向けの起業家育成プログラムを9月より開講します。実際のビジネス立ち上げを体験できます。",
      category: "新コース"
    },
    {
      id: 4,
      title: "オンライン授業システムをアップデート",
      date: "2025-08-10",
      excerpt: "より快適な学習環境を提供するため、オンライン授業システムを大幅にアップデートしました。",
      category: "システム"
    },
    {
      id: 5,
      title: "保護者向け説明会を開催します",
      date: "2025-08-05",
      excerpt: "8月25日に保護者向けの説明会を開催します。カリキュラムや学習方針について詳しくご説明します。",
      category: "イベント"
    },
    {
      id: 6,
      title: "夏の無料体験授業実施中",
      date: "2025-08-01",
      excerpt: "8月中は無料体験授業を実施しています。プログラミングの楽しさを体験してみませんか？",
      category: "キャンペーン"
    }
  ];

  useEffect(() => {
    // 無限スクロールのために配列を複製（右から左へのスクロール用に順序調整）
    setNewsPosts([...sampleNews, ...sampleNews]);
  }, []);

  const handleViewAll = () => {
    window.location.href = '/blog/news';
  };

  const handleCardClick = (postId) => {
    window.location.href = `/post/${postId}`;
  };

  return (
    <NewsContainer id="news">
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          お知らせ
        </SectionTitle>
        
        <ScrollContainer>
          <ScrollingWrapper>
            {newsPosts.map((post, index) => (
              <NewsCard
                key={`${post.id}-${index}`}
                onClick={() => handleCardClick(post.id)}
                whileHover={{ y: -5 }}
                className="cyber-frame"
              >
                <NewsCategory>{post.category}</NewsCategory>
                <NewsTitle>{post.title}</NewsTitle>
                <NewsDate>{post.date}</NewsDate>
                <NewsExcerpt>{post.excerpt}</NewsExcerpt>
                <ReadMoreButton>詳しく見る →</ReadMoreButton>
              </NewsCard>
            ))}
          </ScrollingWrapper>
        </ScrollContainer>
        
        <ViewAllButton
          onClick={handleViewAll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          すべてのお知らせを見る
        </ViewAllButton>
      </ContentWrapper>
    </NewsContainer>
  );
};

export default News;