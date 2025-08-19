import React, { useEffect } from 'react';
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
  white-space: nowrap;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.6rem;
    margin-bottom: 2rem;
    white-space: nowrap;
    letter-spacing: -0.02em;
  }
`;

const MessageCard = styled(motion.div)`
  position: relative;
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 
    0 0 30px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  background: none !important;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('${process.env.PUBLIC_URL}/2025/02/message-background.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 12px;
    z-index: 0;
    opacity: 0;
    transform: scale(1.1);
    animation: backgroundFadeIn 1.2s ease-out 0.5s forwards;
  }
  
  @keyframes backgroundFadeIn {
    0% {
      opacity: 0;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem;
  }
`;

const MessageContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: #2c2c2c;
  line-height: 2;
  font-size: 1.3rem;
  margin-bottom: 3rem;
  font-family: 'Klee One', 'Noto Sans JP', cursive, sans-serif;
  font-weight: 600;
  
  p {
    margin-bottom: 1.5rem;
    letter-spacing: 0.05em;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    line-height: 1.9;
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
    flex-direction: row;
    justify-content: space-evenly;
    gap: 2rem;
    text-align: center;
    flex-wrap: nowrap;
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
  useEffect(() => {
    // Load Google Fonts for handwritten Japanese font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Klee+One:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

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

  const spreadVariants = {
    hidden: { 
      opacity: 0, 
      scaleX: 0,
      originX: 0.5 
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
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
            }}>
            <MessageContent>
              <motion.p 
                variants={spreadVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                今、生きにくさや不全感があっても大丈夫。<br />
                僕たちと<HighlightText>AI</HighlightText>と<HighlightText>IT</HighlightText>を学べば、<br />
                やりたいことは形にできる。<br />
                <HighlightText>if(塾)</HighlightText>で一歩目を。<br />
                焦らずにゆっくりと、僕たちが伴走し、<br />
                思いを実現します。
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