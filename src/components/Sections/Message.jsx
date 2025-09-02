import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import paperImage from '../../2025/08/paper.png';

const MessageContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.2) 0%, transparent 50%);
`;

const VintageBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.1;
  
  &::before,
  &::after {
    content: '✨';
    position: absolute;
    font-size: 1.5rem;
    color: #DAA520;
    animation: vintage-float 8s ease-in-out infinite;
  }
  
  &::before {
    left: 15%;
    top: 20%;
    animation-delay: 0s;
  }
  
  &::after {
    right: 15%;
    bottom: 20%;
    animation-delay: 4s;
  }
  
  @keyframes vintage-float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.1;
    }
    50% {
      transform: translateY(-10px) rotate(180deg);
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
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
  color: #8B4513;
  font-family: 'Klee One', cursive, ${theme.fonts.secondary};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transform: rotate(-1deg);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const MessageCard = styled(motion.div)`
  background-image: url('${paperImage}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 0;
  padding: 4rem;
  position: relative;
  overflow: hidden;
  max-width: 800px;
  width: 100%;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.5),
    inset 0 0 100px rgba(139, 69, 19, 0.1);
  transform: rotate(0.5deg);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 248, 220, 0.85);
    z-index: -1;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem;
  }
`;

const MessageContent = styled.div`
  text-align: left;
  color: #2F1B14;
  line-height: 1.9;
  font-size: 1.15rem;
  margin-bottom: 3rem;
  font-family: 'Klee One', cursive, serif;
  position: relative;
  z-index: 1;
  
  p {
    margin-bottom: 2rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    text-shadow: none;
    transform: rotate(-0.2deg);
    
    &:nth-child(even) {
      transform: rotate(0.15deg);
    }
    
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
  color: #B8860B;
  font-weight: 600;
  text-shadow: none;
  background: none;
  padding: 0;
  border-radius: 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #DAA520;
    opacity: 0.7;
  }
`;

const SignatureSection = styled(motion.div)`
  border-top: 1px solid #8B4513;
  padding-top: 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 3rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: center;
    gap: 1.5rem;
  }
`;

const SignatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const SignatureRole = styled.div`
  color: #654321;
  font-size: 0.85rem;
  opacity: 0.8;
  font-family: 'Klee One', cursive, serif;
`;

const SignatureName = styled.div`
  color: #8B4513;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Klee One', cursive, serif;
  text-shadow: none;
  transform: rotate(-1deg);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
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
      <VintageBackground />
      
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
          
          <MessageCard variants={itemVariants} className="cyber-frame">
            <MessageContent>
              <motion.p variants={itemVariants}>
                現代は目まぐるしく変化する時代です。<HighlightText>AIの活用</HighlightText>は今後さらに重要になり、教育の在り方も価値観も変わっていくでしょう。
              </motion.p>
              
              <motion.p variants={itemVariants}>
                このサイトは<HighlightText>最新AIで制作</HighlightText>されています。表現手段とAIを組み合わせれば表現できないものはありません。皆さんもAIを使った開発や起業、自由な表現に挑戦してほしいです。
              </motion.p>
              
              <motion.p variants={itemVariants}>
                学校が面白くないと感じる人もいるかもしれません。私たちもそうでした。だからこそ、<HighlightText>誰でも楽しめる塾</HighlightText>を目指しています。
              </motion.p>
              
              <motion.p variants={itemVariants}>
                <HighlightText>行動すれば世界は変わります</HighlightText>。if(塾)の運営メンバーも高校生から始め、挑戦を形にしています。
              </motion.p>
              
              <motion.p variants={itemVariants}>
                まずは日常の何かを変えてみましょう。第一歩として、<HighlightText>if(塾)で好きなことに取り組んでみませんか？</HighlightText>
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