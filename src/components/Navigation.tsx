import React, { useState, useEffect } from 'react';
import './Navigation.css';
import './NavigationTransparency.css';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenus, setActiveSubmenus] = useState<string[]>([]);

  // Force navigation transparency on mount
  useEffect(() => {
    const applyTransparency = () => {
      const navContainer = document.querySelector('.cyber-nav-container') as HTMLElement;
      if (navContainer) {
        navContainer.style.background = 'rgba(10, 14, 39, 0.3)';
        navContainer.style.backgroundColor = 'rgba(10, 14, 39, 0.3)';
        navContainer.style.backdropFilter = 'blur(10px)';
        (navContainer.style as any).webkitBackdropFilter = 'blur(10px)';
      }

      const mobileOverlay = document.querySelector('.cyber-mobile-nav__overlay') as HTMLElement;
      if (mobileOverlay) {
        mobileOverlay.style.background = 'rgba(0, 0, 0, 0.3)';
        mobileOverlay.style.backdropFilter = 'blur(5px)';
        (mobileOverlay.style as any).webkitBackdropFilter = 'blur(5px)';
      }

      const mobileContainer = document.querySelector('.cyber-mobile-nav__container') as HTMLElement;
      if (mobileContainer) {
        mobileContainer.style.background = 'rgba(0, 0, 0, 0.7)';
        mobileContainer.style.backdropFilter = 'blur(15px)';
        (mobileContainer.style as any).webkitBackdropFilter = 'blur(15px)';
      }
    };

    // Apply immediately and after a short delay to ensure it overrides any other styles
    applyTransparency();
    setTimeout(applyTransparency, 100);
    setTimeout(applyTransparency, 500);

    // Also apply on window load
    window.addEventListener('load', applyTransparency);
    return () => window.removeEventListener('load', applyTransparency);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const toggleSubmenu = (menuId: string) => {
    setActiveSubmenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* PC Navigation */}
      <div 
        className="cyber-nav-container"
        style={{
          background: 'rgba(10, 14, 39, 0.3)',
          backgroundColor: 'rgba(10, 14, 39, 0.3)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          borderBottom: '1px solid rgba(0, 195, 255, 0.2)'
        }}
      >
        <nav className="cyber-nav">
          <ul className="cyber-nav__list">
            <li className="cyber-nav__item has-submenu">
              <a href="#if-about" className="cyber-nav__link">if(塾)について</a>
              <ul className="cyber-nav__submenu">
                <li className="cyber-nav__subitem">
                  <a href="#courses" className="cyber-nav__sublink">コース紹介</a>
                </li>
                <li className="cyber-nav__subitem">
                  <a href="#schedule" className="cyber-nav__sublink">授業スケジュール</a>
                </li>
                <li className="cyber-nav__subitem">
                  <a href="#services" className="cyber-nav__sublink">サービス内容</a>
                </li>
                <li className="cyber-nav__subitem">
                  <a href="#if-issues" className="cyber-nav__sublink">if(塾)が取り組む課題</a>
                </li>
                <li className="cyber-nav__subitem">
                  <a href="#flow" className="cyber-nav__sublink">入塾までの流れ</a>
                </li>
                <li className="cyber-nav__subitem">
                  <a href="#members" className="cyber-nav__sublink">運営メンバー</a>
                </li>
                <li className="cyber-nav__subitem">
                  <a href="#faq" className="cyber-nav__sublink">よくある質問</a>
                </li>
              </ul>
            </li>

            <li className="cyber-nav__item has-submenu">
              <a href="#if-challenge" className="cyber-nav__link">if(チャレンジ)</a>
              <ul className="cyber-nav__submenu">
                <li className="cyber-nav__subitem">
                  <a href="#if-challenge-beginner" className="cyber-nav__sublink">if(チャレンジ)forビギナー</a>
                </li>
              </ul>
            </li>

            <li className="cyber-nav__item">
              <a href="#materials" className="cyber-nav__link">オンライン教材</a>
            </li>
            <li className="cyber-nav__item">
              <a href="#news" className="cyber-nav__link">お知らせ</a>
            </li>
            <li className="cyber-nav__item">
              <a href="#youtube" className="cyber-nav__link">YouTube</a>
            </li>

            <li className="cyber-nav__item has-submenu">
              <a href="#if-powerup" className="cyber-nav__link">if(塾)でキミもパワーUP！</a>
              <ul className="cyber-nav__submenu">
                <li className="cyber-nav__subitem">
                  <a href="#if-message" className="cyber-nav__sublink">if(メッセージ)</a>
                </li>
              </ul>
            </li>

            <li className="cyber-nav__item">
              <a href="#contact" className="cyber-nav__link">各種お問い合わせ</a>
            </li>
            
            <li className="cyber-nav__item">
              <a href="#work-request" className="cyber-nav__link">お仕事のご依頼</a>
            </li>
            
            <li className="cyber-nav__item">
              <a href="#kitazuna" className="cyber-nav__link">Kitazuna</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Hamburger */}
      <div className={`cyber-hamburger ${isOpen ? 'is-active' : ''}`} onClick={toggleMenu}>
        <div className="cyber-hamburger__inner">
          <span className="cyber-hamburger__line"></span>
          <span className="cyber-hamburger__line"></span>
          <span className="cyber-hamburger__line"></span>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`cyber-mobile-nav ${isOpen ? 'is-active' : ''}`}>
        <div 
          className="cyber-mobile-nav__overlay" 
          onClick={toggleMenu}
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)'
          }}
        ></div>
        <div 
          className="cyber-mobile-nav__container"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)'
          }}
        >
          <div className="cyber-mobile-nav__header">
            <div className="cyber-mobile-nav__title">if(MENU)</div>
            <button className="cyber-mobile-nav__close" onClick={toggleMenu}>
              <span className="cyber-mobile-nav__close-line"></span>
              <span className="cyber-mobile-nav__close-line"></span>
            </button>
          </div>
          <nav className="cyber-mobile-nav__content">
            <ul className="cyber-mobile-nav__list">
              <li className="cyber-mobile-nav__item">
                <div className="cyber-mobile-nav__item-header">
                  <a href="#if-about" className="cyber-mobile-nav__link" onClick={handleLinkClick}>if(塾)について</a>
                  <button 
                    className={`cyber-mobile-nav__toggle ${activeSubmenus.includes('about') ? 'is-active' : ''}`}
                    onClick={() => toggleSubmenu('about')}
                  >
                    {activeSubmenus.includes('about') ? '-' : '+'}
                  </button>
                </div>
                <ul className={`cyber-mobile-nav__submenu ${activeSubmenus.includes('about') ? 'is-active' : ''}`}>
                  <li className="cyber-mobile-nav__subitem">
                    <a href="#courses" className="cyber-mobile-nav__sublink" onClick={handleLinkClick}>コース紹介</a>
                  </li>
                  <li className="cyber-mobile-nav__subitem">
                    <a href="#schedule" className="cyber-mobile-nav__sublink" onClick={handleLinkClick}>授業スケジュール</a>
                  </li>
                  <li className="cyber-mobile-nav__subitem">
                    <a href="#services" className="cyber-mobile-nav__sublink" onClick={handleLinkClick}>サービス内容</a>
                  </li>
                  <li className="cyber-mobile-nav__subitem">
                    <a href="#if-issues" className="cyber-mobile-nav__sublink" onClick={handleLinkClick}>if(塾)が取り組む課題</a>
                  </li>
                  <li className="cyber-mobile-nav__subitem">
                    <a href="#flow" className="cyber-mobile-nav__sublink" onClick={handleLinkClick}>入塾までの流れ</a>
                  </li>
                  <li className="cyber-mobile-nav__subitem">
                    <a href="#members" className="cyber-mobile-nav__sublink" onClick={handleLinkClick}>運営メンバー</a>
                  </li>
                  <li className="cyber-mobile-nav__subitem">
                    <a href="#faq" className="cyber-mobile-nav__sublink" onClick={handleLinkClick}>よくある質問</a>
                  </li>
                </ul>
              </li>

              <li className="cyber-mobile-nav__item">
                <div className="cyber-mobile-nav__item-header">
                  <a href="#if-challenge" className="cyber-mobile-nav__link" onClick={handleLinkClick}>if(チャレンジ)</a>
                  <button 
                    className={`cyber-mobile-nav__toggle ${activeSubmenus.includes('challenge') ? 'is-active' : ''}`}
                    onClick={() => toggleSubmenu('challenge')}
                  >
                    {activeSubmenus.includes('challenge') ? '-' : '+'}
                  </button>
                </div>
                <ul className={`cyber-mobile-nav__submenu ${activeSubmenus.includes('challenge') ? 'is-active' : ''}`}>
                  <li className="cyber-mobile-nav__subitem">
                    <a href="#if-challenge-beginner" className="cyber-mobile-nav__sublink" onClick={handleLinkClick}>if(チャレンジ)forビギナー</a>
                  </li>
                </ul>
              </li>

              <li className="cyber-mobile-nav__item">
                <a href="#materials" className="cyber-mobile-nav__link" onClick={handleLinkClick}>オンライン教材</a>
              </li>
              <li className="cyber-mobile-nav__item">
                <a href="#news" className="cyber-mobile-nav__link" onClick={handleLinkClick}>お知らせ</a>
              </li>
              <li className="cyber-mobile-nav__item">
                <a href="#youtube" className="cyber-mobile-nav__link" onClick={handleLinkClick}>YouTube</a>
              </li>

              <li className="cyber-mobile-nav__item">
                <div className="cyber-mobile-nav__item-header">
                  <a href="#if-powerup" className="cyber-mobile-nav__link" onClick={handleLinkClick}>if(塾)でキミもパワーUP！</a>
                  <button 
                    className={`cyber-mobile-nav__toggle ${activeSubmenus.includes('powerup') ? 'is-active' : ''}`}
                    onClick={() => toggleSubmenu('powerup')}
                  >
                    {activeSubmenus.includes('powerup') ? '-' : '+'}
                  </button>
                </div>
                <ul className={`cyber-mobile-nav__submenu ${activeSubmenus.includes('powerup') ? 'is-active' : ''}`}>
                  <li className="cyber-mobile-nav__subitem">
                    <a href="#if-message" className="cyber-mobile-nav__sublink" onClick={handleLinkClick}>if(メッセージ)</a>
                  </li>
                </ul>
              </li>

              <li className="cyber-mobile-nav__item">
                <a href="#contact" className="cyber-mobile-nav__link" onClick={handleLinkClick}>各種お問い合わせ</a>
              </li>
              
              <li className="cyber-mobile-nav__item">
                <a href="#work-request" className="cyber-mobile-nav__link" onClick={handleLinkClick}>お仕事のご依頼</a>
              </li>
              
              <li className="cyber-mobile-nav__item">
                <a href="#kitazuna" className="cyber-mobile-nav__link" onClick={handleLinkClick}>Kitazuna</a>
              </li>
            </ul>
          </nav>

          <div className="cyber-mobile-nav__buttons">
            <a href="https://if-juku.net/trial" className="cyber-mobile-nav__button cyber-button--green">
              <span className="cyber-button__icon">✉</span>
              <span>体験授業</span>
            </a>
            <a href="/2024/08/if%E5%A1%BE%E3%83%91%E3%83%B3%E3%83%95%E3%83%AC%E3%83%83%E3%83%88.pdf" 
               className="cyber-mobile-nav__button cyber-button--blue" 
               target="_blank" 
               rel="noopener noreferrer">
              <span className="cyber-button__icon">📄</span>
              <span>資料請求</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;