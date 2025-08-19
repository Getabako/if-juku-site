import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const YouTubeContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
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
  animation: ${scrollRight} 20s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const VideoCard = styled(motion.a)`
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
  text-decoration: none;
  
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
  align-items: center;
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
  text-align: center;
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

// YouTube Data APIを使わずに動画を表示する方法:
// 
// 方法1: 手動で動画IDを更新（現在の実装）
// - YouTubeチャンネルから動画URLをコピー
// - URLの?v=以降の文字列が動画ID
// - popularVideos配列を更新
//
// 方法2: RSSフィードを使用（サーバーサイドが必要）
// - https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
// - CORS制限のため、バックエンド経由で取得が必要
//
// 方法3: YouTube Data API v3（APIキーが必要）
// - Google Cloud ConsoleでAPIキーを取得
// - fetchでAPIを呼び出し
// - クォータ制限あり（10,000ユニット/日）

const YouTube = () => {

  // if(塾)チャンネルの実際の動画データ
  const popularVideos = [
    {
      id: '0F4SIptjCDs',
      title: '日本で一番nowい塾 if(塾)',
      thumbnail: 'https://i.ytimg.com/vi/0F4SIptjCDs/maxresdefault.jpg'
    },
    {
      id: 'pH7pgybx-ao',
      title: '"誰でも通える未来型教室" 高校生が仮想空間で学ぶ学習塾',
      thumbnail: 'https://i.ytimg.com/vi/pH7pgybx-ao/maxresdefault.jpg'
    },
    {
      id: 'jGvWryXcp6Y',
      title: 'if(塾)高崎圧倒的停滞…',
      thumbnail: 'https://i.ytimg.com/vi/jGvWryXcp6Y/maxresdefault.jpg'
    },
    {
      id: 'REPLACE_WITH_ACTUAL_ID_1', // 実際の動画IDに置き換えてください
      title: '【2024振り返り】if(塾)って、1年間何してたの？',
      thumbnail: 'https://i.ytimg.com/vi/REPLACE_WITH_ACTUAL_ID_1/maxresdefault.jpg'
    },
    {
      id: 'REPLACE_WITH_ACTUAL_ID_2', // 実際の動画IDに置き換えてください
      title: '【塾頭よりご挨拶】if(塾)チャンネル開設！',
      thumbnail: 'https://i.ytimg.com/vi/REPLACE_WITH_ACTUAL_ID_2/maxresdefault.jpg'
    },
    {
      id: 'REPLACE_WITH_ACTUAL_ID_3', // 実際の動画IDに置き換えてください
      title: '【最速よりご挨拶】if(塾)チャンネル開設！',
      thumbnail: 'https://i.ytimg.com/vi/REPLACE_WITH_ACTUAL_ID_3/maxresdefault.jpg'
    }
  ];

  // 動画IDの更新方法:
  // 1. YouTubeチャンネルページ (https://www.youtube.com/@if-juku) にアクセス
  // 2. 表示したい動画をクリック
  // 3. URLから動画ID（?v=の後の文字列）をコピー
  // 4. 上記配列に新しいオブジェクトを追加:
  //    { id: '動画ID', title: '動画タイトル', thumbnail: 'https://i.ytimg.com/vi/動画ID/maxresdefault.jpg' }

  // スクロール用に動画を複製
  const scrollVideos = [...popularVideos, ...popularVideos];

  return (
    <YouTubeContainer id="youtube">
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
            {scrollVideos.map((video, index) => (
              <VideoCard
                key={`${video.id}-${index}`}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
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
      </ContentWrapper>
    </YouTubeContainer>
  );
};

export default YouTube;