import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import logo from '../../2025/04/logo.png';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${theme.zIndex.navigation};
  background: transparent;
  padding: 1rem 2rem;
`;

const HamburgerButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 255, 0.1);
  }

  span {
    width: 24px;
    height: 2px;
    background: ${theme.colors.primary.main};
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: 1px;

    &:first-child {
      transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
      transform: ${props => props.isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    &:nth-child(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: ${theme.zIndex.modal};
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
`;

const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 400px;
  width: 90%;
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  
  img {
    height: 60px;
    width: auto;
    filter: drop-shadow(${theme.colors.glow.blue});
  }
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const MenuItem = styled.a`
  display: block;
  padding: 1rem 2rem;
  background: rgba(0, 255, 255, 0.1);
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 10px;
  color: ${theme.colors.text.primary};
  text-decoration: none;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(0, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: 2px solid ${theme.colors.primary.main};
  color: ${theme.colors.primary.main};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background: ${theme.colors.primary.main};
    color: ${theme.colors.background.primary};
  }
`;

const HamburgerNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <>
      <NavContainer>
        <HamburgerButton isOpen={isOpen} onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </HamburgerButton>
      </NavContainer>

      <MenuOverlay isOpen={isOpen}>
        <CloseButton onClick={closeMenu}>×</CloseButton>
        <MenuContent>
          <LogoContainer>
            <img src={logo} alt="if(塾)" />
          </LogoContainer>
          
          <MenuItems>
            <MenuItem onClick={() => scrollToSection('challenge')}>
              if(チャレンジ)
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('about')}>
              if(塾)とは
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('courses')}>
              コース紹介
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('schedule')}>
              授業スケジュール
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('services')}>
              サービス
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('materials')}>
              オンライン教材
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('youtube')}>
              YouTube
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('news')}>
              お知らせ
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('faq')}>
              よくある質問
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('members')}>
              メンバー
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('flow')}>
              入塾までの流れ
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('contact')}>
              お問い合わせ
            </MenuItem>
          </MenuItems>
        </MenuContent>
      </MenuOverlay>
    </>
  );
};

export default HamburgerNav;