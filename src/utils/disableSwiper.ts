/**
 * Swiperのスクロール機能を無効化し、通常のページスクロールを有効にする
 */
export const disableSwiper = () => {
  // グローバルのSwiperインスタンスが存在する場合、無効化
  const globalSwiper = (window as any).swiper;
  if (globalSwiper) {
    globalSwiper.disable();
    globalSwiper.allowTouchMove = false;
    globalSwiper.allowSlideNext = false;
    globalSwiper.allowSlidePrev = false;
    
    // マウスホイールとキーボードも無効化
    if (globalSwiper.mousewheel) {
      globalSwiper.mousewheel.disable();
    }
    if (globalSwiper.keyboard) {
      globalSwiper.keyboard.disable();
    }
  }

  // body要素のオーバーフロー設定を通常に戻す
  document.body.style.overflow = 'auto';
  document.body.style.height = 'auto';
  
  // htmlタグのオーバーフロー設定も修正
  document.documentElement.style.overflow = 'auto';
  document.documentElement.style.height = 'auto';
  
  // Swiperコンテナのスタイルを上書き
  const swiperContainers = document.querySelectorAll('.swiper, .swiper-container');
  swiperContainers.forEach((container: any) => {
    container.style.height = 'auto';
    container.style.overflow = 'visible';
  });

  // Swiper wrapperのスタイルを上書き
  const swiperWrappers = document.querySelectorAll('.swiper-wrapper');
  swiperWrappers.forEach((wrapper: any) => {
    wrapper.style.height = 'auto';
    wrapper.style.transform = 'none';
  });

  // Swiper slideのスタイルを上書き
  const swiperSlides = document.querySelectorAll('.swiper-slide');
  swiperSlides.forEach((slide: any) => {
    slide.style.height = 'auto';
  });
};

/**
 * コンポーネントのアンマウント時にSwiperを再有効化
 */
export const enableSwiper = () => {
  const globalSwiper = (window as any).swiper;
  if (globalSwiper) {
    globalSwiper.enable();
    globalSwiper.allowTouchMove = true;
    globalSwiper.allowSlideNext = true;
    globalSwiper.allowSlidePrev = true;
    
    // マウスホイールとキーボードも再有効化
    if (globalSwiper.mousewheel) {
      globalSwiper.mousewheel.enable();
    }
    if (globalSwiper.keyboard) {
      globalSwiper.keyboard.enable();
    }
  }

  // body要素のオーバーフロー設定を元に戻す
  document.body.style.overflow = '';
  document.body.style.height = '';
  
  // htmlタグのオーバーフロー設定も元に戻す
  document.documentElement.style.overflow = '';
  document.documentElement.style.height = '';
};