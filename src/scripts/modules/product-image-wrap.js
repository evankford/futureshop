import Swiper from 'swiper';
import '../../../node_modules/swiper/css/swiper.min.css';
import '../components/magiczoom.css';
import '../components/magiczoom.js';

var mzOptions = {
  zoomPosition: 'inner'
};

export default class myModule {
  constructor(el) {
    this.el = el;
    this.pane = el.querySelector('.product-image');
    this.images = el.querySelectorAll('[data-product-featured-image]');
    this.imageSwiper = el.querySelector('[data-main-image]');
    this.thumbSwiper = el.querySelector('[data-thumbnails]');
    this.init();
  }
  init() {

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
    this.mainSwiper = new Swiper(this.imageSwiper, {
      slidesPerView:1,
      loop: false,
      centeredSlides: true,
      navigation: bigNav,
      centerInsufficientSlides: true,
      pagination: bigPage,
      thumbs: bigThumbs
    })

    var classObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type == 'attributes' && mutation.attributeName == 'aria-current') {
          this.slideToActive();
        }
      })
    });
    this.thumbSwiper.querySelectorAll('[data-product-single-thumbnail]').forEach(thumb => {
      classObserver.observe(thumb, {
        attributes: true
      });
    })
    this.slideToActive();
  }
  slideToActive() {
    var activeThumbIndex = this.thumbSwiper.querySelector('[aria-current="true"]').parentNode.getAttribute('data-index');
    if (activeThumbIndex) {
      this.mainSwiper.slideTo(activeThumbIndex);
    }
  }
}