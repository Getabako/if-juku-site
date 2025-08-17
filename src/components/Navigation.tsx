import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// ヘッダーコンテナ
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 14, 39, 0.3) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border-bottom: 1px solid rgba(0, 195, 255, 0.2);
  padding: 1rem 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

// ハンバーガーボタン
const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 195, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 195, 255, 0.1);
    border-color: #00d4ff;
    box-shadow: 0 0 10px #00d4ff;
  }
`;

const HamburgerLine = styled.span<{ $isOpen: boolean }>`
  display: block;
  height: 2px;
  width: 100%;
  background: #00d4ff;
  border-radius: 2px;
  transition: all 0.3s ease;
  
  &:nth-child(1) {
    transform: ${props => props.$isOpen ? 'rotate(45deg) translateY(10px)' : 'rotate(0)'};
  }
  
  &:nth-child(2) {
    opacity: ${props => props.$isOpen ? 0 : 1};
  }
  
  &:nth-child(3) {
    transform: ${props => props.$isOpen ? 'rotate(-45deg) translateY(-10px)' : 'rotate(0)'};
  }
`;

// メニューオーバーレイ
const MenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 999;
`;

// メニューコンテナ
const MenuContainer = styled.nav<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  max-width: 90vw;
  height: 100vh;
  background: rgba(10, 14, 39, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid #00d4ff;
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 195, 255, 0.2);
`;

const MenuTitle = styled.h2`
  color: #00d4ff;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #00d4ff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  border-bottom: 1px solid rgba(0, 195, 255, 0.1);
`;

const MenuLink = styled.a`
  display: block;
  padding: 1rem 1.5rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(0, 195, 255, 0.1);
    color: #00d4ff;
    padding-left: 2rem;
  }
`;

const SubMenuToggle = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 195, 255, 0.1);
    color: #00d4ff;
  }
`;

const SubMenu = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.3);
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const SubMenuLink = styled.a`
  display: block;
  padding: 0.75rem 2.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 195, 255, 0.1);
    color: #00d4ff;
    padding-left: 3rem;
  }
`;

const MenuFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 195, 255, 0.2);
  margin-top: 2rem;
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, #00c851, #00ff00);
  color: #000;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(0, 200, 81, 0.4);
  }
  
  &:last-child {
    margin-bottom: 0;
    background: linear-gradient(135deg, #0078ff, #00d4ff);
  }
`;

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenus, setActiveSubmenus] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleSubmenu = (menuId: string) => {
    setActiveSubmenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveSubmenus([]);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <HamburgerButton onClick={() => setIsOpen(!isOpen)}>
            <HamburgerLine $isOpen={isOpen} />
            <HamburgerLine $isOpen={isOpen} />
            <HamburgerLine $isOpen={isOpen} />
          </HamburgerButton>
        </HeaderWrapper>
      </HeaderContainer>

      <MenuOverlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      
      <MenuContainer $isOpen={isOpen}>
        <MenuHeader>
          <MenuTitle>if(MENU)</MenuTitle>
          <CloseButton onClick={() => setIsOpen(false)}>✕</CloseButton>
        </MenuHeader>
        
        <MenuList>
          <MenuItem>
            <SubMenuToggle onClick={() => toggleSubmenu('about')}>
              if(塾)について
              <span>{activeSubmenus.includes('about') ? '▼' : '▶'}</span>
            </SubMenuToggle>
            <SubMenu $isOpen={activeSubmenus.includes('about')}>
              <li><SubMenuLink href="#courses" onClick={handleLinkClick}>コース紹介</SubMenuLink></li>
              <li><SubMenuLink href="#schedule" onClick={handleLinkClick}>授業スケジュール</SubMenuLink></li>
              <li><SubMenuLink href="#services" onClick={handleLinkClick}>サービス内容</SubMenuLink></li>
              <li><SubMenuLink href="#if-issues" onClick={handleLinkClick}>if(塾)が取り組む課題</SubMenuLink></li>
              <li><SubMenuLink href="#flow" onClick={handleLinkClick}>入塾までの流れ</SubMenuLink></li>
              <li><SubMenuLink href="#members" onClick={handleLinkClick}>運営メンバー</SubMenuLink></li>
              <li><SubMenuLink href="#faq" onClick={handleLinkClick}>よくある質問</SubMenuLink></li>
            </SubMenu>
          </MenuItem>

          <MenuItem>
            <SubMenuToggle onClick={() => toggleSubmenu('challenge')}>
              if(チャレンジ)
              <span>{activeSubmenus.includes('challenge') ? '▼' : '▶'}</span>
            </SubMenuToggle>
            <SubMenu $isOpen={activeSubmenus.includes('challenge')}>
              <li><SubMenuLink href="#if-challenge-beginner" onClick={handleLinkClick}>if(チャレンジ)forビギナー</SubMenuLink></li>
            </SubMenu>
          </MenuItem>

          <MenuItem>
            <MenuLink href="#materials" onClick={handleLinkClick}>オンライン教材</MenuLink>
          </MenuItem>
          
          <MenuItem>
            <MenuLink href="#news" onClick={handleLinkClick}>お知らせ</MenuLink>
          </MenuItem>
          
          <MenuItem>
            <MenuLink href="#youtube" onClick={handleLinkClick}>YouTube</MenuLink>
          </MenuItem>

          <MenuItem>
            <SubMenuToggle onClick={() => toggleSubmenu('powerup')}>
              if(塾)でキミもパワーUP！
              <span>{activeSubmenus.includes('powerup') ? '▼' : '▶'}</span>
            </SubMenuToggle>
            <SubMenu $isOpen={activeSubmenus.includes('powerup')}>
              <li><SubMenuLink href="#if-message" onClick={handleLinkClick}>if(メッセージ)</SubMenuLink></li>
            </SubMenu>
          </MenuItem>

          <MenuItem>
            <MenuLink href="#contact" onClick={handleLinkClick}>各種お問い合わせ</MenuLink>
          </MenuItem>
          
          <MenuItem>
            <MenuLink href="#work-request" onClick={handleLinkClick}>お仕事のご依頼</MenuLink>
          </MenuItem>
          
          <MenuItem>
            <MenuLink href="#kitazuna" onClick={handleLinkClick}>Kitazuna</MenuLink>
          </MenuItem>
        </MenuList>

        <MenuFooter>
          <ActionButton href="https://if-juku.net/trial" target="_blank" rel="noopener noreferrer">
            ✉ 体験授業
          </ActionButton>
          <ActionButton 
            href="/2024/08/if%E5%A1%BE%E3%83%91%E3%83%B3%E3%83%95%E3%83%AC%E3%83%83%E3%83%88.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            📄 資料請求
          </ActionButton>
        </MenuFooter>
      </MenuContainer>
    </>
  );
};

export default Navigation;