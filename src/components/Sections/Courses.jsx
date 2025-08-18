import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { getAssetPath } from '../../utils/paths';

const CoursesContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
`;

const BackgroundEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%);
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
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

const CourseTabs = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 0.5rem;
  }
`;

const CourseTabButton = styled.button`
  background: ${props => props.active ? 
    `linear-gradient(45deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})` : 
    'rgba(0, 0, 0, 0.5)'};
  border: 2px solid ${props => props.active ? 
    theme.colors.primary.main : 
    'rgba(255, 255, 255, 0.3)'};
  color: ${props => props.active ? 
    theme.colors.text.primary : 
    'rgba(255, 255, 255, 0.6)'};
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all ${theme.animations.duration.normal};
  font-family: ${theme.fonts.secondary};
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  
  &:hover {
    transform: ${props => !props.active && 'scale(1.05)'};
    box-shadow: 0 0 15px ${theme.colors.primary.main};
    border-color: ${theme.colors.primary.main};
    color: ${theme.colors.text.primary};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.6rem 1rem;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const CourseCard = styled(motion.div)`
  position: relative;
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 12px;
  padding: 3rem;
  overflow: hidden;
  isolation: isolate;
  
  /* Background image layer */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${props => props.$activeTab === 'liberal' ? 
      `url('${getAssetPath('2025/08/liberal.png')}')` :
      `url('${getAssetPath('2025/08/ideal.png')}')`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -2;
  }
  
  /* Semi-transparent overlay for better text readability */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: -1;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const CourseHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  z-index: 1;
`;

// CourseTitle removed - no longer needed

const CourseTag = styled.span`
  background: linear-gradient(45deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark});
  color: ${theme.colors.background.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  box-shadow: 0 0 10px ${theme.colors.secondary.main};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MobileAgeTag = styled.div`
  display: none;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
    background: linear-gradient(135deg, #ff6b00, #ff8c00);
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 25px;
    font-size: 0.95rem;
    font-weight: bold;
    text-align: center;
    margin: 0 auto 1.5rem;
    max-width: fit-content;
    box-shadow: 
      0 0 15px rgba(255, 107, 0, 0.5),
      0 4px 6px rgba(0, 0, 0, 0.2);
    animation: pulse-glow 2s ease-in-out infinite;
    
    @keyframes pulse-glow {
      0%, 100% { 
        box-shadow: 
          0 0 15px rgba(255, 107, 0, 0.5),
          0 4px 6px rgba(0, 0, 0, 0.2);
      }
      50% { 
        box-shadow: 
          0 0 25px rgba(255, 107, 0, 0.7),
          0 4px 8px rgba(0, 0, 0, 0.3);
      }
    }
  }
`;

const CourseDescription = styled.p`
  position: relative;
  font-size: 1.1rem;
  color: ${theme.colors.text.primary};
  line-height: 1.8;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.85);
  padding: 1rem;
  border-radius: 8px;
  z-index: 1;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const CourseInfo = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  z-index: 1;
`;

const InfoItem = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  border: 1px solid ${theme.colors.primary.main};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const InfoLabel = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const InfoValue = styled.div`
  font-size: 1.1rem;
  color: ${theme.colors.primary.main};
  font-weight: bold;
`;

const FeatureList = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1;
`;

const FeatureItem = styled.li`
  position: relative;
  padding-left: 2rem;
  margin-bottom: 1rem;
  color: ${theme.colors.text.primary};
  line-height: 1.6;
  background: rgba(0, 0, 0, 0.85);
  padding: 0.8rem 0.8rem 0.8rem 2rem;
  border-radius: 6px;
  
  &::before {
    content: '▶';
    position: absolute;
    left: 0;
    color: ${theme.colors.secondary.main};
    text-shadow: 0 0 5px ${theme.colors.secondary.main};
  }
`;

const Courses = () => {
  const [activeTab, setActiveTab] = useState('liberal');

  const courses = {
    liberal: {
      title: "リベラルコース",
      tag: "小学生～中学生推奨",
      description: "マインクラフトで創造力・基礎ITスキルを学ぶ",
      frequency: "週1回から参加可能（小学生～中学生推奨）",
      skills: "創造力と基礎的なITスキルを楽しく習得",
      features: [
        "マインクラフトをメタバース化した空間で自由に探索・建築",
        "AI先生やゲームコンテンツを活用した遊び感覚の学習",
        "子ども一人ひとりに合った学習スタイルを発見"
      ]
    },
    selfrealization: {
      title: "自己実現コース",
      tag: "中学生～高校生推奨",
      description: "AIと起業を学ぶ",
      frequency: "週2～3回推奨（中学生～高校生推奨）",
      skills: "将来のキャリアに直結する実践的なスキルを習得",
      features: [
        "AIを活用したプログラミングやビジネスモデルの構築",
        "起業家精神を育成し、自分の興味や特性を活かしたプロジェクト企画・実行",
        "メンターのサポートを受けながら、実際の仕事に挑戦し収益を得る経験"
      ]
    }
  };

  const currentCourse = courses[activeTab];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <CoursesContainer id="courses">
      <BackgroundEffect />
      
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="twinkling-text"
        >
          コース紹介
        </SectionTitle>
        
        
        <AnimatePresence mode="wait">
          <CourseCard
            key={activeTab}
            $activeTab={activeTab}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="cyber-frame neon-glow"
          >
            <CourseHeader>
              <CourseTabs>
                <CourseTabButton
                  active={activeTab === 'liberal'}
                  onClick={() => setActiveTab('liberal')}
                  className="cyber-pulse"
                >
                  リベラルコース
                </CourseTabButton>
                <CourseTabButton
                  active={activeTab === 'selfrealization'}
                  onClick={() => setActiveTab('selfrealization')}
                  className="cyber-pulse"
                >
                  自己実現コース
                </CourseTabButton>
              </CourseTabs>
            </CourseHeader>
            
            <CourseDescription>
              {currentCourse.description}
            </CourseDescription>
            
            <CourseInfo>
              <InfoItem>
                <InfoLabel>頻度</InfoLabel>
                <InfoValue>{currentCourse.frequency}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>習得スキル</InfoLabel>
                <InfoValue>{currentCourse.skills}</InfoValue>
              </InfoItem>
            </CourseInfo>
            
            <FeatureList>
              {currentCourse.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeatureItem>{feature}</FeatureItem>
                </motion.div>
              ))}
            </FeatureList>
          </CourseCard>
        </AnimatePresence>
      </ContentWrapper>
    </CoursesContainer>
  );
};

export default Courses;