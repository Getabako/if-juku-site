import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { getAssetPath } from '../../utils/paths';

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
    padding: 1.2rem 1.5rem;
    font-size: 1rem;
    border-radius: 20px;
    width: 48%;
    aspect-ratio: 1.2 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const FeatureList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const FeatureItem = styled(motion.div)`
  position: relative;
  border: 1px solid rgba(0, 255, 255, 0.6);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal};
  min-height: 200px;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${theme.colors.secondary.main};
    box-shadow: 0 10px 25px rgba(0, 255, 255, 0.2);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 150px;
    aspect-ratio: 1 / 1;
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

const FeatureText = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    0 0 10px rgba(0, 255, 255, 0.5);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const FeatureDescription = styled(motion.div)`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  padding: 0.5rem 0;
  overflow: hidden;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.85rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 400px;
    margin: 2rem auto 0;
  }
`;

const BusinessInquiry = () => {
  const [expandedService, setExpandedService] = useState(null);
  
  const handleButtonClick = () => {
    window.open('https://service.if-juku.net/', '_blank');
  };
  
  const services = [
    {
      id: 'ai',
      title: 'AI導入サポート',
      image: '2025/02/ai-robot.png',
      description: '最新のAI技術を活用して、業務効率化と生産性向上を実現。ChatGPT、Claude、画像生成AIなど、最適なAIソリューションを提案します。'
    },
    {
      id: 'system',
      title: 'システム開発',
      image: '2025/02/system-dev.png',
      description: 'Webアプリケーション、モバイルアプリ、業務システムまで、フルスタック開発で企業のデジタル化をサポートします。'
    },
    {
      id: 'marketing',
      title: 'マーケティング支援',
      image: '2025/02/marketing.png',
      description: 'デジタルマーケティング戦略の立案から、SNS運用、SEO対策まで、総合的なマーケティングソリューションを提供します。'
    }
  ];
  
  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id);
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
        src={getAssetPath('2025/07/ifbusiness.mp4')}
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
          </MessageContainer>

          <FeatureList variants={containerVariants}>
            {services.map(service => (
              <FeatureItem 
                key={service.id}
                variants={itemVariants}
                onMouseEnter={() => setExpandedService(service.id)}
                onMouseLeave={() => setExpandedService(null)}
                onClick={() => toggleService(service.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FeatureBackground>
                  <img src={getAssetPath(service.image)} alt={service.title} />
                </FeatureBackground>
                <FeatureContent>
                  <FeatureText>{service.title}</FeatureText>
                  <FeatureDescription 
                    $isExpanded={expandedService === service.id}
                    initial={false}
                    animate={{ 
                      opacity: expandedService === service.id ? 1 : 0,
                      height: expandedService === service.id ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.description}
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            ))}
          </FeatureList>
          
          <ButtonContainer>
            <CTAButton
              onClick={handleButtonClick}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              サービス詳細を見る
            </CTAButton>
          </ButtonContainer>
        </motion.div>
      </ContentWrapper>
    </BusinessContainer>
  );
};

export default BusinessInquiry;