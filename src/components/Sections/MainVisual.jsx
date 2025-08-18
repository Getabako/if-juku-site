import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { theme } from '../../styles/theme';
import { getAssetPath } from '../../utils/paths';

const MainVisualContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${theme.colors.background.primary}, ${theme.colors.background.secondary});
  
  /* 動画が読み込まれない場合の代替背景 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(0, 255, 0, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, ${theme.colors.background.primary}, ${theme.colors.background.secondary});
    z-index: -1;
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  
  /* 動画が読み込まれない場合の対応 */
  &::-webkit-media-controls {
    display: none;
  }
  
  /* 動画の読み込みエラー時の背景 */
  background: linear-gradient(135deg, ${theme.colors.background.primary}, ${theme.colors.background.secondary});
  
  /* 動画の品質とパフォーマンスの最適化 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: ${theme.zIndex.content};
  text-align: center;
  color: ${theme.colors.text.primary};
  padding: 2rem;
`;

const MainLogo = styled.img`
  height: 120px;
  width: auto;
  margin-bottom: 1rem;
  filter: drop-shadow(${theme.colors.glow.blue});
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: radial-gradient(circle at center, rgba(0, 255, 255, 0.4) 0%, transparent 70%);
    border-radius: 50%;
    animation: aura-pulse 2s ease-in-out infinite;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: radial-gradient(circle at center, rgba(0, 255, 255, 0.3) 0%, transparent 60%);
    border-radius: 50%;
    animation: aura-pulse 2s ease-in-out infinite 0.5s;
    z-index: -1;
  }
  
  @keyframes aura-pulse {
    0%, 100% { 
      transform: scale(1); 
      opacity: 0.6; 
    }
    50% { 
      transform: scale(1.2); 
      opacity: 1; 
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 80px;
  }
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: ${theme.colors.text.secondary};
  font-family: ${theme.fonts.primary};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark});
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.text.primary};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal};
  font-family: ${theme.fonts.primary};
  box-shadow: ${theme.colors.glow.blue};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px ${theme.colors.primary.main};
    animation: glitch 0.3s;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
`;

const ScrollArrow = styled.div`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  color: ${theme.colors.primary.main};
`;

const MainVisual = () => {
  const isMobile = useMediaQuery({ maxWidth: theme.breakpoints.mobile });
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleCTAClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVideoError = (e) => {
    setVideoError(true);
    setVideoLoaded(false);
  };

  const handleVideoLoad = (e) => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoCanPlay = (e) => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // 動画の自動再生を強制的に試行
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Autoplay failed, but don't log in production
        });
      }
    }
  }, [isMobile]);

  return (
    <MainVisualContainer id="main-visual">
      <VideoBackground
        ref={videoRef}
        src={isMobile ? getAssetPath('2025/04/ifmvsp-1.mp4') : getAssetPath('2025/04/ifmv2.mp4')}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
        onCanPlay={handleVideoCanPlay}
      >
        <source src={isMobile ? getAssetPath('2025/04/ifmvsp-1.mp4') : getAssetPath('2025/04/ifmv2.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <VideoOverlay />
      <ContentWrapper>
        <MainLogo 
          src={getAssetPath('2025/04/logo.png')}
          alt="if(塾)"
        />
        <SubTitle>
          AIと起業を学ぶ、オンラインプログラミング塾<br />
          遠隔・全国対応で、好きなことを学びながら稼げる力を育成
        </SubTitle>
        <CTAButton onClick={handleCTAClick} className="glitch-effect">
          無料体験授業を申し込む
        </CTAButton>

      </ContentWrapper>
      <ScrollIndicator>
        <span>SCROLL</span>
        <ScrollArrow>↓</ScrollArrow>
      </ScrollIndicator>
    </MainVisualContainer>
  );
};

export default MainVisual;