import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const NewsContainer = styled.section`
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

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const NewsCard = styled(motion.article)`
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  transition: transform ${theme.animations.duration.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 40px rgba(0, 255, 255, 0.4);
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
  font-size: 1.3rem;
  color: ${theme.colors.primary.main};
  font-family: ${theme.fonts.secondary};
  text-shadow: ${theme.colors.glow.blue};
  flex: 1;
`;

const NewsDate = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  white-space: nowrap;
`;

const NewsCategory = styled.span`
  background: linear-gradient(45deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark});
  color: ${theme.colors.background.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  white-space: nowrap;
`;

const NewsContent = styled.p`
  color: ${theme.colors.text.primary};
  line-height: 1.6;
  margin-bottom: 1rem;
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

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // サンプルニュースデータ
  const sampleNews = [
    {
      id: 1,
      title: "2025年9月期の新規生徒募集開始のお知らせ",
      date: "2025-08-20",
      category: "重要",
      content: "2025年9月期の新規生徒募集を開始いたします。無料体験授業も随時実施しておりますので、お気軽にお問い合わせください。"
    },
    {
      id: 2,
      title: "夏休み特別講座「AIプログラミング入門」開催",
      date: "2025-08-15",
      category: "イベント",
      content: "夏休み期間中に特別講座を開催いたします。初心者でも参加できるAIプログラミングの入門講座です。"
    },
    {
      id: 3,
      title: "if(塾)公式YouTubeチャンネル開設",
      date: "2025-08-10",
      category: "お知らせ",
      content: "if(塾)の公式YouTubeチャンネルを開設いたしました。授業の様子や学習のコツを定期的に配信予定です。"
    },
    {
      id: 4,
      title: "オンライン教材サイトリニューアル完了",
      date: "2025-08-05",
      category: "システム",
      content: "より使いやすく、学習効果を高めるためにオンライン教材サイトをリニューアルいたしました。"
    }
  ];

  useEffect(() => {
    setNewsItems(sampleNews);
  }, []);

  const loadMoreNews = () => {
    setLoading(true);
    setTimeout(() => {
      const moreNews = sampleNews.map((news, index) => ({
        ...news,
        id: news.id + newsItems.length,
        title: news.title + " (追加情報)",
        date: "2025-07-30"
      }));
      setNewsItems(prev => [...prev, ...moreNews]);
      setLoading(false);
    }, 1000);
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
        
        <NewsList>
          {newsItems.map((news, index) => (
            <NewsCard
              key={news.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="cyber-frame"
            >
              <NewsHeader>
                <NewsTitle>{news.title}</NewsTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <NewsCategory>{news.category}</NewsCategory>
                  <NewsDate>{news.date}</NewsDate>
                </div>
              </NewsHeader>
              <NewsContent>{news.content}</NewsContent>
            </NewsCard>
          ))}
        </NewsList>
        
        <LoadMoreButton
          onClick={loadMoreNews}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "読み込み中..." : "もっと読む"}
        </LoadMoreButton>
      </ContentWrapper>
    </NewsContainer>
  );
};

export default News;