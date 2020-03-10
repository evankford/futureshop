import Drift from 'drift-zoom';
import Swiper from 'swiper';
import '../../../node_modules/swiper/dist/css/swiper.min.css';

export default class myModule {
  constructor(el) {
    this.pane = el.querySelector('.product-image');
    this.zoom = el.getAttribute('data-zoom-enabled');
    this.images = el.querySelectorAll('[data-product-featured-image]');
    this.imageSwiper = el.querySelector('[data-main-image]');
    this.thumbSwiper = el.querySelector('[data-thumbnails]');
    this.init();
  }
  init() {
   if (this.zoom == true) {
     this.initZoom();
   }
   if (this.imageSwiper) {
     if (this.images.length > 1) {
       this.initSwiper();
     }
   }

  }
  
  initSwiper() {
    //REmove shopify hide class.
    this.images.forEach(image=> {
      image.classList.remove('hide');
    });
    
    console.log(this.thumbSwiper)
    //Thumb stuff first
    let thumbSwipe= false; //Default false
    if (this.thumbSwiper) {
      //If thumbs are here
      //Check for arrows
      let littleNav = false;
      const littleLeft= this.thumbSwiper.querySelector('.swiper-button-prev');
      const littleRight= this.thumbSwiper.querySelector('.swiper-button-next');
      if (littleLeft && littleRight) {
        littleNav = {
          nextEl: littleRight,
          prevEl: littleLeft
        }
      }
      
      //Init thumb swiper
      thumbSwipe = new Swiper(this.thumbSwiper, {
       slidesPerView: 'auto',
       loop: false,
       centeredSlides: false,
       spaceBetween: 1,
       threshold: 10,
       effect: 'slide',
       centerInsufficientSlides: true,
       slideToClickedSlide: true,
        navigation: littleNav
     })
     
     

      
    } // ENd thumbnail checker
    
    //Pagination/Navigation
    let bigNav = false;
    let bigPage = false;
    let bigThumbs = false;
    const bigDots = this.imageSwiper.querySelector('.swiper-pagination')
    const bigLeft = this.imageSwiper.querySelector('.swiper-button-prev');
    const bigRight = this.imageSwiper.querySelector('.swiper-button-next');

    
    if (bigLeft && bigRight) {
      bigNav = {
        nextEl: bigRight,
        prevEl: bigLeft
      }
    }
    if (bigDots) {
      bigPage = {
        el: bigDots,
        dynamicBullets: true
      }
    }
    if (thumbSwipe) {
      bigThumbs = { 
        swiper: thumbSwipe
      }
    }
    console.log(bigThumbs)
    var mainSwiper = new Swiper(this.imageSwiper, {
      slidesPerView:1,
      loop: false, 
      centeredSlides: true,
      navigation: bigNav,
      pagination: bigPage,
      thumbs: bigThumbs
    })
  }
  
  initZoom() {
    var self = this;
    this.images.forEach(img => {
      new Drift(img, {
        paneContainer: self.pane
      })
    })
  }
}