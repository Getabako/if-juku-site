import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { getAssetPath } from '../../utils/paths';

// ヘッダーコンテナ（ロゴとハンバーガーメニュー）
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.navigation};
  background: rgba(10, 14, 39, 0.3) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  padding: 1rem 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  cursor: pointer;
  filter: drop-shadow(0 0 10px ${theme.colors.primary.main});
  transition: all 0.3s ease;
  
  &:hover {
    filter: drop-shadow(0 0 20px ${theme.colors.primary.main});
    transform: scale(1.05);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 32px;
  }
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
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 10px ${theme.colors.primary.main};
  }
  
  &:focus {
    outline: none;
  }
`;

const HamburgerLine = styled.span`
  display: block;
  height: 2px;
  width: 100%;
  background: ${theme.colors.primary.main};
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
  
  &:nth-child(1) {
    transform: ${props => props.isOpen ? 'rotate(45deg) translateY(10px)' : 'rotate(0)'};
  }
  
  &:nth-child(2) {
    opacity: ${props => props.isOpen ? 0 : 1};
    transform: ${props => props.isOpen ? 'translateX(-100%)' : 'translateX(0)'};
  }
  
  &:nth-child(3) {
    transform: ${props => props.isOpen ? 'rotate(-45deg) translateY(-10px)' : 'rotate(0)'};
  }
`;

// メニューオーバーレイ
const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: ${theme.zIndex.navigation - 1};
`;

// メニューコンテナ
const MenuContainer = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  max-width: 90vw;
  height: 100vh;
  background: rgba(10, 14, 39, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-left: 1px solid ${theme.colors.primary.main};
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  z-index: ${theme.zIndex.navigation};
  overflow-y: auto;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 280px;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
`;

const MenuTitle = styled.h2`
  color: ${theme.colors.primary.main};
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 0 0 10px ${theme.colors.primary.main};
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.primary.main};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
    text-shadow: 0 0 10px ${theme.colors.primary.main};
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
`;

const MenuLink = styled.a`
  display: block;
  padding: 1rem 1.5rem;
  color: ${theme.colors.text.primary};
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.95rem;
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: ${theme.colors.primary.main};
    padding-left: 2rem;
    text-shadow: 0 0 5px ${theme.colors.primary.main};
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
  color: ${theme.colors.text.primary};
  text-decoration: none;
  cursor: pointer;
  font-size: 0.95rem;
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: ${theme.colors.primary.main};
  }
`;

const SubMenuArrow = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(90deg)' : 'rotate(0)'};
  color: ${theme.colors.primary.main};
`;

const SubMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.3);
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const SubMenuItem = styled.li``;

const SubMenuLink = styled.a`
  display: block;
  padding: 0.75rem 2.5rem;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: ${theme.colors.primary.main};
    padding-left: 3rem;
  }
`;

const MenuFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  margin-top: auto;
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark});
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(0, 255, 255, 0.4);
  }
  
  &:last-child {
    margin-bottom: 0;
    background: linear-gradient(135deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark});
  }
`;

const UnifiedNav = ({ swiperRef, sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenus, setActiveSubmenus] = useState([]);

  // メニューを開いた時にbodyのスクロールを無効化
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const menuItems = [
    {
      label: "if(塾)について",
      href: "#about",
      submenu: [
        { label: "コース紹介", href: "#courses" },
        { label: "授業スケジュール", href: "#schedule" },
        { label: "サービス内容", href: "#services" },
        { label: "if(塾)が取り組む課題", href: "#issues" },
        { label: "入塾までの流れ", href: "#flow" },
        { label: "運営メンバー", href: "#members" }
      ]
    },
    {
      label: "if(チャレンジ)",
      href: "#challenge",
      submenu: [
        { label: "if(チャレンジ)forビギナー", href: "#challenge-beginner" }
      ]
    },
    {
      label: "オンライン教材",
      href: "#materials"
    },
    {
      label: "お知らせ",
      href: "#news"
    },
    {
      label: "YouTube",
      href: "#youtube"
    },
    {
      label: "if(塾)でキミもパワーUP！",
      href: "#powerup",
      submenu: [
        { label: "if(メッセージ)", href: "#message" }
      ]
    },
    {
      label: "よくある質問",
      href: "#faq"
    },
    {
      label: "仕事の依頼",
      href: "#business-inquiry"
    },
    {
      label: "Kitazuna開発中",
      href: "#kitazuna"
    },
    {
      label: "お問い合わせ",
      href: "#contact"
    }
  ];

  const toggleSubmenu = (index) => {
    setActiveSubmenus(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleScrollTo = (href) => {
    const targetId = href.replace('#', '');
    
    // セクションIDからスライドインデックスを取得
    const slideIndex = sections?.findIndex(section => section.id === targetId);
    
    if (slideIndex !== -1 && swiperRef?.current) {
      const swiper = swiperRef.current.swiper;
      if (swiper) {
        swiper.slideTo(slideIndex, 600);
        setTimeout(() => {
          swiper.keyboard.enable();
          swiper.mousewheel.enable();
          swiper.allowTouchMove = true;
          swiper.update();
        }, 650);
      }
    } else {
      // フォールバック: 通常のスクロール
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    setIsMenuOpen(false);
    setActiveSubmenus([]);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <Logo 
            src={getAssetPath('2025/04/logo.png')}
            alt="if(塾)"
            onClick={() => handleScrollTo('#main-visual')}
          />
          <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <HamburgerLine isOpen={isMenuOpen} />
            <HamburgerLine isOpen={isMenuOpen} />
            <HamburgerLine isOpen={isMenuOpen} />
          </HamburgerButton>
        </HeaderWrapper>
      </HeaderContainer>

      <MenuOverlay isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
      
      <MenuContainer isOpen={isMenuOpen}>
        <MenuHeader>
          <MenuTitle>MENU</MenuTitle>
          <CloseButton onClick={() => setIsMenuOpen(false)}>✕</CloseButton>
        </MenuHeader>
        
        <MenuList>
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              {item.submenu ? (
                <>
                  <SubMenuToggle onClick={() => toggleSubmenu(index)}>
                    {item.label}
                    <SubMenuArrow isOpen={activeSubmenus.includes(index)}>▶</SubMenuArrow>
                  </SubMenuToggle>
                  <SubMenu isOpen={activeSubmenus.includes(index)}>
                    {item.submenu.map((subItem, subIndex) => (
                      <SubMenuItem key={subIndex}>
                        <SubMenuLink onClick={() => handleScrollTo(subItem.href)}>
                          {subItem.label}
                        </SubMenuLink>
                      </SubMenuItem>
                    ))}
                  </SubMenu>
                </>
              ) : (
                <MenuLink onClick={() => handleScrollTo(item.href)}>
                  {item.label}
                </MenuLink>
              )}
            </MenuItem>
          ))}
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

export default UnifiedNav;