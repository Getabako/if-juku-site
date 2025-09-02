import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const YouTubeContainer = styled.section`
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

const PlayButtonBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.05;
  
  &::before {
    content: '▶';
    position: absolute;
    top: 20%;
    left: 15%;
    font-size: 8rem;
    color: ${theme.colors.primary.main};
    animation: pulse-play 4s ease-in-out infinite;
  }
  
  &::after {
    content: '▶';
    position: absolute;
    bottom: 20%;
    right: 15%;
    font-size: 6rem;
    color: ${theme.colors.secondary.main};
    animation: pulse-play 4s ease-in-out infinite 2s;
  }
  
  @keyframes pulse-play {
    0%, 100% { transform: scale(1); opacity: 0.05; }
    50% { transform: scale(1.2); opacity: 0.1; }
  }
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

const scrollAnimationLTR = keyframes`
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
  animation: ${scrollAnimationLTR} 40s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const VideoCard = styled(motion.div)`
  flex: 0 0 400px;
  background: rgba(26, 26, 26, 0.95);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 0;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  transition: transform ${theme.animations.duration.normal};
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 40px rgba(0, 255, 255, 0.4);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: 0 0 320px;
  }
`;

const VideoThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 225px;
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '▶';
    position: absolute;
    font-size: 3rem;
    color: white;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 180px;
    
    &::after {
      font-size: 2.5rem;
    }
  }
`;

const VideoInfo = styled.div`
  padding: 1.5rem;
`;

const VideoTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.primary.main};
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.secondary};
  text-shadow: ${theme.colors.glow.blue};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const VideoDescription = styled.p`
  color: ${theme.colors.text.primary};
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9rem;
`;

const VideoMeta = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewChannelButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff0000, #cc0000);
  border: 2px solid #ff0000;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  transition: all ${theme.animations.duration.normal};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);
    
    &::before {
      left: 100%;
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const YouTube = () => {
  const [videos, setVideos] = useState([]);

  // サンプル動画データ（YouTubeチャンネルから無作為に抽出する想定）
  const sampleVideos = [
    {
      id: 1,
      title: "マインクラフトで学ぶプログラミング基礎 #1",
      description: "初心者でも分かりやすく、マインクラフトを使ったプログラミングの基本を学びます。コマンドブロックの使い方から始めましょう！",
      duration: "15:32",
      views: "2,450"
    },
    {
      id: 2,
      title: "AIを使った自動建築システムの作り方",
      description: "人工知能を活用して、マインクラフト内で自動的に建物を作るシステムを構築する方法を詳しく解説します。",
      duration: "23:15",
      views: "1,890"
    },
    {
      id: 3,
      title: "塾生の作品紹介 - すごいゲームができました！",
      description: "if(塾)の塾生が制作した素晴らしいゲーム作品をご紹介。創造力豊かな作品の数々をご覧ください。",
      duration: "12:48",
      views: "3,210"
    },
    {
      id: 4,
      title: "Python入門 - 変数と関数を理解しよう",
      description: "プログラミング言語Pythonの基礎となる変数と関数について、実際にコードを書きながら学習していきます。",
      duration: "18:45",
      views: "1,650"
    },
    {
      id: 5,
      title: "起業家精神を育てる - 中学生起業家の体験談",
      description: "実際にビジネスを立ち上げた中学生起業家が、その体験談と学んだことを語ります。",
      duration: "20:30",
      views: "2,780"
    },
    {
      id: 6,
      title: "チーム開発の進め方 - GitHubを使ってみよう",
      description: "複数人でプログラムを開発する際に必要なGitHubの基本的な使い方を学習します。",
      duration: "16:22",
      views: "1,420"
    }
  ];

  useEffect(() => {
    // 無限スクロールのために配列を複製
    setVideos([...sampleVideos, ...sampleVideos]);
  }, []);

  const handleViewChannel = () => {
    window.open('https://www.youtube.com/@if-juku', '_blank');
  };

  const handleVideoClick = (videoId) => {
    // 実際の実装では、動画のURLを開く
    window.open('https://www.youtube.com/@if-juku', '_blank');
  };

  return (
    <YouTubeContainer id="youtube">
      <PlayButtonBackground />
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          YouTube
        </SectionTitle>
        
        <ScrollContainer>
          <ScrollingWrapper>
            {videos.map((video, index) => (
              <VideoCard
                key={`${video.id}-${index}`}
                onClick={() => handleVideoClick(video.id)}
                whileHover={{ y: -5 }}
                className="cyber-frame"
              >
                <VideoThumbnail />
                <VideoInfo>
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoDescription>{video.description}</VideoDescription>
                  <VideoMeta>
                    <span>{video.duration}</span>
                    <span>{video.views} 回視聴</span>
                  </VideoMeta>
                </VideoInfo>
              </VideoCard>
            ))}
          </ScrollingWrapper>
        </ScrollContainer>
        
        <ViewChannelButton
          onClick={handleViewChannel}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          YouTubeチャンネルを見る
        </ViewChannelButton>
      </ContentWrapper>
    </YouTubeContainer>
  );
};

export default YouTube;