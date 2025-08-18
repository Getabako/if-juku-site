import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { getAssetPath } from '../../utils/paths';

const KitazunaContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.7;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(10, 10, 10, 0.5) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(10, 10, 10, 0.5) 100%
  );
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }
`;

const SubTitle = styled(motion.h3)`
  font-size: 1.5rem;
  color: #86efac;
  margin-bottom: 2.5rem;
  font-weight: 600;
  text-shadow: 0 0 8px rgba(134, 239, 172, 0.6);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const GameDescription = styled(motion.div)`
  background: rgba(20, 20, 20, 0.95);
  border: 2px solid rgba(134, 239, 172, 0.8);
  border-radius: 16px;
  padding: 3rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(15px);
  box-shadow: 
    0 0 30px rgba(134, 239, 172, 0.2),
    inset 0 0 20px rgba(134, 239, 172, 0.05);
    
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem;
    margin-bottom: 2rem;
  }
`;

const DescriptionText = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const HighlightText = styled.span`
  color: #86efac;
  font-weight: 600;
  text-shadow: 0 0 6px rgba(134, 239, 172, 0.4);
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(134, 239, 172, 0.08) 50%,
    transparent 100%
  );
  padding: 0 0.5rem;
  border-radius: 4px;
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const FeatureCard = styled(motion.div)`
  position: relative;
  border: 1px solid rgba(134, 239, 172, 0.6);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal};
  min-height: 200px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(134, 239, 172, 0.15);
    border-color: rgba(134, 239, 172, 0.9);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 150px;
  }
`;

const FeatureBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
    transition: opacity 0.3s;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, 
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
`;

const FeatureContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const FeatureTitle = styled.div`
  color: #86efac;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    0 0 10px rgba(134, 239, 172, 0.5);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const FeatureDescription = styled(motion.div)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  line-height: 1.4;
  padding: 0.5rem 0;
  overflow: hidden;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, 
    #4ade80 0%,
    #22d3ee 50%,
    #4ade80 100%
  );
  background-size: 200% 200%;
  border: 3px solid #4ade80;
  color: #000;
  padding: 1.5rem 3rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all ${theme.animations.duration.normal};
  
  &:hover {
    animation: gradient-shift 2s ease infinite;
    transform: translateY(-3px);
    box-shadow: 
      0 15px 40px rgba(74, 222, 128, 0.4),
      0 0 30px #4ade80;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }
  
  &:active::before {
    width: 300px;
    height: 300px;
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.2rem 2.5rem;
    font-size: 1.1rem;
  }
`;

const Kitazuna = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);
  
  const handleButtonClick = () => {
    window.open('https://kitazuna.if-juku.net/', '_blank');
  };
  
  const features = [
    {
      id: 'designer',
      title: '緒方孝治氏デザイン',
      image: '2025/02/kunio-design.png',
      description: '熱血硬派くにおくんシリーズのキャラクターデザイナーが手がける本格的なゲームデザイン。'
    },
    {
      id: 'creator',
      title: 'クリエイターとして参加',
      image: '2025/02/creator.png',
      description: 'プレイヤーだけでなく、ゲームクリエイターとして参加可能。自分の作品を世界に発信しよう。'
    },
    {
      id: 'monetize',
      title: 'ゲーム内ショップでマネタイズ',
      image: '2025/02/shop.png',
      description: 'ゲーム内のショップシステムで、作成したアイテムやコンテンツを販売し、実際の収益化が可能。'
    }
  ];
  
  const toggleFeature = (id) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <KitazunaContainer id="kitazuna">
      <VideoBackground 
        autoPlay 
        loop 
        muted 
        playsInline
        src={`${process.env.PUBLIC_URL}/2025/07/kitazuna.mp4`}
      />
      <VideoOverlay />
      
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{ width: '100%' }}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            Kitazuna
          </SectionTitle>
          
          <SubTitle variants={itemVariants}>
            🎮 学んだスキルを作品として形にする
          </SubTitle>
          
          <GameDescription variants={itemVariants} className="cyber-frame">
            <DescriptionText>
              秋田県全域を舞台にしたRPG（HD2D形式）で、地域の伝統文化をテーマにしたゲーム作成ツールです。
            </DescriptionText>
            <DescriptionText>
              プレイヤーは<HighlightText>杉野健太</HighlightText>として秋田各地を巡り、ナマハゲや稲庭うどん、竿燈祭りなどの伝統文化に触れながら、過度な真面目さが生んだ化身「スギノオウ」を封印する冒険を繰り広げます。
            </DescriptionText>
            <DescriptionText>
              <HighlightText>地域IP活用</HighlightText>のゲーム開発を通じて、伝統と現代の融合を学び、実際の<HighlightText>収益化体験</HighlightText>まで可能な教育プラットフォームです。
            </DescriptionText>
          </GameDescription>

          <FeatureGrid variants={containerVariants}>
            {features.map(feature => (
              <FeatureCard 
                key={feature.id}
                variants={itemVariants}
                onMouseEnter={() => setExpandedFeature(feature.id)}
                onMouseLeave={() => setExpandedFeature(null)}
                onClick={() => toggleFeature(feature.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FeatureBackground>
                  <img src={getAssetPath(feature.image)} alt={feature.title} />
                </FeatureBackground>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription
                    initial={false}
                    animate={{ 
                      opacity: expandedFeature === feature.id ? 1 : 0,
                      height: expandedFeature === feature.id ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.description}
                  </FeatureDescription>
                </FeatureContent>
              </FeatureCard>
            ))}
          </FeatureGrid>
          
          <CTAButton
            onClick={handleButtonClick}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ゲーム情報を見る
          </CTAButton>
        </motion.div>
      </ContentWrapper>
    </KitazunaContainer>
  );
};

export default Kitazuna;