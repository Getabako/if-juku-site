import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import ifbusinessVideo from '../../2025/07/ifbusiness.mp4';
import business0Image from '../../2025/08/business0.png';
import business1Image from '../../2025/08/business1.png';
import business2Image from '../../2025/08/business2.png';

const BusinessContainer = styled.section`
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
  opacity: 0.3;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.7) 100%
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
  margin-bottom: 2rem;
  color: ${theme.colors.primary.main};
  text-shadow: ${theme.colors.glow.blue};
  font-family: ${theme.fonts.secondary};
  animation: twinkle 2s infinite;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const MessageContainer = styled(motion.div)`
  background: rgba(20, 20, 20, 0.95);
  border: 2px solid rgba(0, 255, 255, 0.6);
  border-radius: 16px;
  padding: 3rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(15px);
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.2),
    inset 0 0 20px rgba(0, 255, 255, 0.05);
    
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem;
    margin-bottom: 2rem;
  }
`;

const MessageText = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const HighlightText = styled.span`
  color: #ff9d4d;
  font-weight: 600;
  text-shadow: 0 0 6px rgba(255, 157, 77, 0.4);
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(255, 157, 77, 0.08) 50%,
    transparent 100%
  );
  padding: 0 0.5rem;
  border-radius: 4px;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, 
    ${theme.colors.secondary.main} 0%,
    ${theme.colors.secondary.dark} 50%,
    ${theme.colors.secondary.main} 100%
  );
  background-size: 200% 200%;
  border: 3px solid ${theme.colors.secondary.main};
  color: white;
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
      0 15px 40px rgba(255, 107, 0, 0.4),
      0 0 30px ${theme.colors.secondary.main};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
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

const FeatureList = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const FeatureItem = styled(motion.div)`
  background: rgba(20, 20, 20, 0.85);
  border: 1px solid rgba(0, 255, 255, 0.6);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  text-align: center;
  transition: all ${theme.animations.duration.normal};
  min-width: 180px;
  flex: 0 0 auto;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(25, 25, 25, 0.9);
    border-color: rgba(0, 255, 255, 0.9);
    box-shadow: 0 10px 25px rgba(0, 255, 255, 0.2);
    border-color: ${theme.colors.secondary.main};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
    min-width: auto;
    flex: 1;
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.2);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 60px;
    height: 60px;
    margin-bottom: 0.5rem;
  }
`;

const FeatureText = styled.div`
  color: ${theme.colors.text.primary};
  font-size: 1rem;
  font-weight: 500;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const BusinessInquiry = () => {
  const handleButtonClick = () => {
    window.open('https://service.if-juku.net/', '_blank');
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
    <BusinessContainer id="business-inquiry">
      <VideoBackground 
        autoPlay 
        loop 
        muted 
        playsInline
        src={ifbusinessVideo}
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
            if(塾)への仕事のご依頼はこちら
          </SectionTitle>
          
          <MessageContainer variants={itemVariants} className="cyber-frame">
            <MessageText>
              <HighlightText>最速で最大の効果を出すAI導入サポート、ICT総合開発サービス</HighlightText>
            </MessageText>
            <MessageText>
              企業様のデジタル変革を全力でサポートいたします。AI技術の導入から、システム開発、ICT戦略まで、経験豊富なチームが最適なソリューションを提供します。
            </MessageText>
          </MessageContainer>

          <FeatureList variants={containerVariants}>
            <FeatureItem variants={itemVariants}>
              <FeatureIcon style={{ backgroundImage: `url(${business0Image})` }} />
              <FeatureText>AI導入サポート</FeatureText>
            </FeatureItem>
            
            <FeatureItem variants={itemVariants}>
              <FeatureIcon style={{ backgroundImage: `url(${business1Image})` }} />
              <FeatureText>システム開発</FeatureText>
            </FeatureItem>
            
            <FeatureItem variants={itemVariants}>
              <FeatureIcon style={{ backgroundImage: `url(${business2Image})` }} />
              <FeatureText>ICT戦略立案</FeatureText>
            </FeatureItem>
          </FeatureList>
          
          <CTAButton
            onClick={handleButtonClick}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            サービス詳細を見る
          </CTAButton>
        </motion.div>
      </ContentWrapper>
    </BusinessContainer>
  );
};

export default BusinessInquiry;