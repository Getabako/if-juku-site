// Navigation transparency override styles
// This ensures navigation is transparent on all pages

export const injectNavigationTransparency = () => {
  const styleId = 'navigation-transparency-override';
  
  // Remove existing style if present
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }
  
  const style = document.createElement('style');
  style.id = styleId;
  style.innerHTML = `
    /* Force transparent navigation on all pages */
    .cyber-nav-container,
    div.cyber-nav-container,
    nav .cyber-nav-container,
    header .cyber-nav-container,
    #root .cyber-nav-container,
    .App .cyber-nav-container,
    body .cyber-nav-container {
      background: rgba(10, 14, 39, 0.3) !important;
      background-color: rgba(10, 14, 39, 0.3) !important;
      background-image: none !important;
      backdrop-filter: blur(10px) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      opacity: 1 !important;
    }
    
    /* Remove any before/after pseudo elements that might add background */
    .cyber-nav-container::before,
    .cyber-nav-container::after {
      background: transparent !important;
      background-color: transparent !important;
      display: none !important;
    }
    
    /* Ensure nav element itself is transparent */
    .cyber-nav {
      background: transparent !important;
      background-color: transparent !important;
    }
    
    /* Mobile navigation transparency */
    .cyber-mobile-nav__overlay {
      background: rgba(0, 0, 0, 0.3) !important;
      background-color: rgba(0, 0, 0, 0.3) !important;
      backdrop-filter: blur(5px) !important;
      -webkit-backdrop-filter: blur(5px) !important;
    }
    
    .cyber-mobile-nav__container {
      background: rgba(0, 0, 0, 0.7) !important;
      background-color: rgba(0, 0, 0, 0.7) !important;
      backdrop-filter: blur(15px) !important;
      -webkit-backdrop-filter: blur(15px) !important;
    }
    
    /* Hamburger menu with subtle background */
    .cyber-hamburger {
      background: rgba(0, 0, 0, 0.3) !important;
      backdrop-filter: blur(5px) !important;
      -webkit-backdrop-filter: blur(5px) !important;
      border-radius: 8px !important;
      padding: 5px !important;
    }
    
    /* Ensure links remain visible */
    .cyber-nav__link {
      color: rgba(255, 255, 255, 0.9) !important;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3) !important;
    }
    
    .cyber-nav__link:hover {
      color: #00d4ff !important;
    }
    
    /* Submenu transparency */
    .cyber-nav__submenu {
      background: rgba(0, 0, 0, 0.8) !important;
      backdrop-filter: blur(10px) !important;
      -webkit-backdrop-filter: blur(10px) !important;
    }
  `;
  
  document.head.appendChild(style);
  
  // Also apply inline styles for extra insurance
  setTimeout(() => {
    const navContainer = document.querySelector('.cyber-nav-container') as HTMLElement;
    if (navContainer) {
      navContainer.style.cssText = `
        background: rgba(10, 14, 39, 0.3) !important;
        background-color: rgba(10, 14, 39, 0.3) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        z-index: 1000 !important;
        border-bottom: 1px solid rgba(0, 195, 255, 0.2) !important;
      `;
    }
  }, 100);
};