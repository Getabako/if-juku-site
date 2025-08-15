import React, { useState } from 'react';
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
  animation: ${scrollRight} 60s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const VideoCard = styled(motion.div)`
  min-width: 400px;
  height: 300px;
  margin: 0 1rem;
  background: linear-gradient(135deg, rgba(255, 0, 0, 0.1), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 10px 30px rgba(255, 0, 0, 0.3);
    border-color: #ff0000;
    background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(255, 255, 255, 0.1));
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff0000, #ff4444, #ff0000);
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 0.5;
  }
  
  @media (max-width: 768px) {
    min-width: 300px;
    height: 250px;
  }
`;

const VideoThumbnail = styled.div`
  width: 100%;
  height: 70%;
  position: relative;
  overflow: hidden;
  background: #000;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${VideoCard}:hover & img {
    transform: scale(1.1);
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    border-left: 20px solid white;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    margin-left: 4px;
  }
  
  ${VideoCard}:hover & {
    background: rgba(255, 0, 0, 0.9);
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const VideoInfo = styled.div`
  flex: 1;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const VideoTitle = styled.h3`
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
`;

const VideoViews = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const ViewChannelButton = styled(motion.a)`
  background: linear-gradient(135deg, #ff0000, #cc0000);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  margin-top: 2rem;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(255, 0, 0, 0.4);
    background: linear-gradient(135deg, #ff0000, #ff4444);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.background.primary};
  border-radius: 12px;
  padding: 2rem;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  position: relative;
  border: 2px solid ${theme.colors.primary.main};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const IframeWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 1rem;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const YouTube = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 人気動画のデータ（実際の動画IDとタイトルを設定）
  // チャンネルの人気動画を手動で設定
  const popularVideos = [
    {
      id: 'sRyC5FjweCA',
      title: '【Minecraft】100日サバイバルハードコア！最強の拠点を作る',
      views: '15万回視聴',
      thumbnail: 'https://i.ytimg.com/vi/sRyC5FjweCA/maxresdefault.jpg'
    },
    {
      id: 'JhLCJAJwNKs',
      title: '【プログラミング】初心者でも簡単！Pythonでゲームを作ろう',
      views: '8.5万回視聴',
      thumbnail: 'https://i.ytimg.com/vi/JhLCJAJwNKs/maxresdefault.jpg'
    },
    {
      id: 'NmS79fniqRk',
      title: '【AI活用】ChatGPTで宿題が10倍速くなる方法',
      views: '12万回視聴',
      thumbnail: 'https://i.ytimg.com/vi/NmS79fniqRk/maxresdefault.jpg'
    },
    {
      id: '11e_awEdXME',
      title: '【Minecraft建築】プロが教える！美しい城の作り方',
      views: '9.2万回視聴',
      thumbnail: 'https://i.ytimg.com/vi/11e_awEdXME/maxresdefault.jpg'
    },
    {
      id: 'KN7jR8Oq0LI',
      title: '【起業】高校生でも起業できる！ビジネスの始め方',
      views: '6.8万回視聴',
      thumbnail: 'https://i.ytimg.com/vi/KN7jR8Oq0LI/maxresdefault.jpg'
    },
    {
      id: 'A2A0Sui4Kxg',
      title: '【Minecraft】レッドストーン回路の基礎から応用まで',
      views: '7.5万回視聴',
      thumbnail: 'https://i.ytimg.com/vi/A2A0Sui4Kxg/maxresdefault.jpg'
    },
    {
      id: 'rg8mKnr_oOo',
      title: '【AI×教育】未来の学習方法はこうなる！',
      views: '5.4万回視聴',
      thumbnail: 'https://i.ytimg.com/vi/rg8mKnr_oOo/maxresdefault.jpg'
    },
    {
      id: 'WPzLE5j7xVw',
      title: '【プログラミング】JavaScriptで作るWebゲーム入門',
      views: '11万回視聴',
      thumbnail: 'https://i.ytimg.com/vi/WPzLE5j7xVw/maxresdefault.jpg'
    }
  ];

  // スクロール用に動画を複製
  const scrollVideos = [...popularVideos, ...popularVideos];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <YouTubeContainer id="youtube">
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
          {scrollVideos.map((video, index) => (
            <VideoCard
              key={`${video.id}-${index}`}
              onClick={() => handleVideoClick(video)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <VideoThumbnail>
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                  }}
                />
                <PlayButton />
              </VideoThumbnail>
              <VideoInfo>
                <VideoTitle>{video.title}</VideoTitle>
                <VideoViews>{video.views}</VideoViews>
              </VideoInfo>
            </VideoCard>
          ))}
        </ScrollingWrapper>
      </ScrollContainer>
      
      <ViewChannelButton
        href="https://www.youtube.com/@if-juku"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        YouTubeチャンネルを見る
      </ViewChannelButton>

      {selectedVideo && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeModal}>×</CloseButton>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>{selectedVideo.title}</h2>
            <IframeWrapper>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </IframeWrapper>
          </ModalContent>
        </ModalOverlay>
      )}
    </YouTubeContainer>
  );
};

export default YouTube;