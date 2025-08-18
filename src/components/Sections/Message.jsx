import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { getAssetPath } from '../../utils/paths';

const MessageContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FireworksBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.3;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 3px;
    background: ${theme.colors.primary.main};
    box-shadow:
      0 0 10px ${theme.colors.primary.main};
    animation: firework 6s ease-out infinite;
  }
  
  &::before {
    left: 25%;
    animation-delay: 0s;
  }
  
  &::after {
    right: 25%;
    animation-delay: 3s;
  }
  
  @keyframes firework {
    0% {
      bottom: 10%;
      opacity: 0;
      transform: scale(0);
    }
    15% {
      bottom: 60%;
      opacity: 0.8;
      transform: scale(1);
    }
    100% {
      bottom: 90%;
      opacity: 0;
      transform: scale(15);
      filter: blur(10px);
    }
  }
`;

const FireworkSpark = styled.div`
  position: absolute;
  pointer-events: none;
  opacity: 0.2;
  
  &:nth-child(1) {
    left: 30%;
    animation: spark 5s ease-out infinite 1s;
  }
  
  &:nth-child(2) {
    left: 50%;
    animation: spark 5s ease-out infinite 2.5s;
  }
  
  &:nth-child(3) {
    left: 70%;
    animation: spark 5s ease-out infinite 4s;
  }
  
  &::before {
    content: '✨';
    position: absolute;
    font-size: 1.5rem;
    opacity: 0;
    animation: sparkle 5s ease-out infinite;
  }
  
  @keyframes spark {
    0% {
      bottom: 30%;
      opacity: 0;
    }
    50% {
      bottom: 70%;
      opacity: 0.5;
    }
    100% {
      bottom: 90%;
      opacity: 0;
    }
  }
  
  @keyframes sparkle {
    0%, 100% {
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      transform: scale(1) rotate(180deg);
      opacity: 0.3;
    }
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

const MessageCard = styled(motion.div)`
  position: relative;
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 3rem;
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem;
  }
`;

const MessageContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: left;
  color: #2c2c2c;
  line-height: 1.8;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  
  p {
    margin-bottom: 1rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    
    p {
      margin-bottom: 1.5rem;
    }
  }
`;

const HighlightText = styled.span`
  color: #e63946;
  font-weight: bold;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(230, 57, 70, 0.1) 50%,
    transparent 100%
  );
  padding: 0 0.3rem;
  border-radius: 4px;
  
  @keyframes glow-pulse {
    0% { 
      text-shadow: 
        -2px -2px 0 #000,
        2px -2px 0 #000,
        -2px 2px 0 #000,
        2px 2px 0 #000,
        0 0 10px ${theme.colors.secondary.main};
    }
    100% { 
      text-shadow: 
        -2px -2px 0 #000,
        2px -2px 0 #000,
        -2px 2px 0 #000,
        2px 2px 0 #000,
        0 0 15px ${theme.colors.secondary.main};
    }
  }
`;

const SignatureSection = styled(motion.div)`
  position: relative;
  z-index: 1;
  border-top: 2px solid ${theme.colors.primary.main};
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const SignatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const SignatureRole = styled.div`
  color: #4a4a4a;
  font-size: 0.9rem;
`;

const SignatureName = styled.div`
  color: #2c2c2c;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: ${theme.fonts.secondary};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: ${theme.colors.primary.main};
    border-radius: 50%;
    animation: float-particle 8s linear infinite;
  }
  
  &::before {
    left: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    right: 10%;
    animation-delay: 4s;
  }
  
  @keyframes float-particle {
    0% {
      bottom: -10px;
      opacity: 1;
    }
    100% {
      bottom: 110%;
      opacity: 0;
    }
  }
`;

const Message = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <MessageContainer id="message">
      <FireworksBackground />
      <FireworkSpark />
      <FireworkSpark />
      <FireworkSpark />
      <FloatingParticles />
      
      <ContentWrapper>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          style={{ width: '100%' }}
        >
          <SectionTitle className="twinkling-text" variants={itemVariants}>
            if(メッセージ)
          </SectionTitle>
          
          <MessageCard 
            variants={itemVariants} 
            className="cyber-frame"
            style={{
              backgroundImage: `url('${getAssetPath('2025/02/message-background.jpeg')}')`,
              backgroundColor: 'transparent'
            }}>
            <MessageContent>
              <motion.p variants={itemVariants}>
                現代は目まぐるしく変化する時代です。<HighlightText>AIの活用</HighlightText>は今後さらに重要になり、教育の在り方も変わっていくでしょう。
              </motion.p>
              <motion.p variants={itemVariants}>
                このサイトは<HighlightText>最新AIで制作</HighlightText>されています。AIを使えば表現できないものはありません。
              </motion.p>
              <motion.p variants={itemVariants}>
                <HighlightText>行動すれば世界は変わります</HighlightText>。第一歩として、<HighlightText>if(塾)で好きなことに取り組んでみませんか？</HighlightText>
              </motion.p>
              <motion.p variants={itemVariants}>
                <HighlightText>if(塾)で、あなたの可能性を最大限に引き出しましょう。</HighlightText>
              </motion.p>
            </MessageContent>
            
            <SignatureSection variants={itemVariants}>
              <SignatureItem>
                <SignatureRole>塾頭</SignatureRole>
                <SignatureName>高崎翔太</SignatureName>
              </SignatureItem>
              
              <SignatureItem>
                <SignatureRole>塾長</SignatureRole>
                <SignatureName>山﨑琢己</SignatureName>
              </SignatureItem>
            </SignatureSection>
          </MessageCard>
        </motion.div>
      </ContentWrapper>
    </MessageContainer>
  );
};

export default Message;