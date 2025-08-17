/**
 * Swiperのスクロール機能を無効化し、通常のページスクロールを有効にする
 */
export const disableSwiper = () => {
  // グローバルのSwiperインスタンスが存在する場合、無効化
  const globalSwiper = (window as any).swiper;
  if (globalSwiper) {
    try {
      globalSwiper.disable();
      globalSwiper.allowTouchMove = false;
      globalSwiper.allowSlideNext = false;
      globalSwiper.allowSlidePrev = false;
      globalSwiper.destroyed = true;
      
      // マウスホイールとキーボードも無効化
      if (globalSwiper.mousewheel) {
        globalSwiper.mousewheel.disable();
      }
      if (globalSwiper.keyboard) {
        globalSwiper.keyboard.disable();
      }
    } catch (e) {
      console.log('Swiper disable error:', e);
    }
  }

  // Force enable scrolling with !important
  const style = document.createElement('style');
  style.innerHTML = `
    html, body {
      overflow: auto !important;
      height: auto !important;
      position: static !important;
    }
    #root {
      overflow: visible !important;
      height: auto !important;
      min-height: 100vh !important;
    }
    .App {
      overflow: visible !important;
      height: auto !important;
      min-height: 100vh !important;
    }
    .swiper, .swiper-container {
      height: auto !important;
      overflow: visible !important;
    }
    .swiper-wrapper {
      height: auto !important;
      transform: none !important;
    }
    .swiper-slide {
      height: auto !important;
    }
  `;
  style.id = 'scrollable-override';
  
  // Remove existing style if present
  const existingStyle = document.getElementById('scrollable-override');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  document.head.appendChild(style);
  
  // Also set inline styles for immediate effect
  document.body.style.cssText = 'overflow: auto !important; height: auto !important; position: static !important;';
  document.documentElement.style.cssText = 'overflow: auto !important; height: auto !important;';
  
  const root = document.getElementById('root');
  if (root) {
    root.style.cssText = 'overflow: visible !important; height: auto !important; min-height: 100vh !important;';
  }
  
  const app = document.querySelector('.App');
  if (app) {
    (app as HTMLElement).style.cssText = 'overflow: visible !important; height: auto !important; min-height: 100vh !important;';
  }
  
  // Swiperコンテナのスタイルを上書き
  const swiperContainers = document.querySelectorAll('.swiper, .swiper-container');
  swiperContainers.forEach((container: any) => {
    container.style.cssText = 'height: auto !important; overflow: visible !important;';
  });

  // Swiper wrapperのスタイルを上書き
  const swiperWrappers = document.querySelectorAll('.swiper-wrapper');
  swiperWrappers.forEach((wrapper: any) => {
    wrapper.style.cssText = 'height: auto !important; transform: none !important;';
  });

  // Swiper slideのスタイルを上書き
  const swiperSlides = document.querySelectorAll('.swiper-slide');
  swiperSlides.forEach((slide: any) => {
    slide.style.cssText = 'height: auto !important;';
  });
};

/**
 * コンポーネントのアンマウント時にSwiperを再有効化
 */
export const enableSwiper = () => {
  // Remove the override styles
  const overrideStyle = document.getElementById('scrollable-override');
  if (overrideStyle) {
    overrideStyle.remove();
  }
  
  const globalSwiper = (window as any).swiper;
  if (globalSwiper && !globalSwiper.destroyed) {
    try {
      globalSwiper.enable();
      globalSwiper.allowTouchMove = true;
      globalSwiper.allowSlideNext = true;
      globalSwiper.allowSlidePrev = true;
      globalSwiper.destroyed = false;
      
      // マウスホイールとキーボードも再有効化
      if (globalSwiper.mousewheel) {
        globalSwiper.mousewheel.enable();
      }
      if (globalSwiper.keyboard) {
        globalSwiper.keyboard.enable();
      }
    } catch (e) {
      console.log('Swiper enable error:', e);
    }
  }

  // Reset styles
  document.body.style.cssText = '';
  document.documentElement.style.cssText = '';
  
  const root = document.getElementById('root');
  if (root) {
    root.style.cssText = '';
  }
  
  const app = document.querySelector('.App');
  if (app) {
    (app as HTMLElement).style.cssText = '';
  }
  
  // Reset Swiper containers
  const swiperContainers = document.querySelectorAll('.swiper, .swiper-container');
  swiperContainers.forEach((container: any) => {
    container.style.cssText = '';
  });

  const swiperWrappers = document.querySelectorAll('.swiper-wrapper');
  swiperWrappers.forEach((wrapper: any) => {
    wrapper.style.cssText = '';
  });

  const swiperSlides = document.querySelectorAll('.swiper-slide');
  swiperSlides.forEach((slide: any) => {
    slide.style.cssText = '';
  });
};