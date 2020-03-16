
import Swiper from 'swiper';
import '../../../node_modules/swiper/css/swiper.min.css';


export default class TestModule {
  constructor(el) {

    this.el = el
    this.parent = this.el.parentNode.parentNode;


    if (el.getAttribute('data-swiper-type') == 'thumbnails') {
      var mySwiper = new Swiper(el, {
        slidesPerView: 'auto',
        loop: false,
        centeredSlides: false,
        spaceBetween: 5,
        threshold: 10,
        effect: 'slide',
        centerInsufficientSlides: true

      })

      const thumbs = this.el.querySelectorAll('[data-product-single-thumbnail]');
      const images = this.parent.querySelectorAll('[data-product-image-wrapper]');
      this.el.addEventListener('click' , function(event) {
        console.log(event);
        if (thumbs.contains(event.target)) {
          event.preventDefault();
          images.forEach(image => {
            if (image.getAttribute('data-image-id') == event.target.getAttribute('data-thumb-id')) {
              image.classList.remove('hide')
            }
            else {
              image.classList.add('hide')
              
            }
          })
          
        }
      })
      
    } else {

      ////// Swiper for slideshow

      var animType = el.getAttribute('data-swiper-animation');
      var dots = false;
      if (el.getAttribute('data-swiper-dots') == 'true') {
        dots = {
          el: '.swiper-pagination',
          dynamicBullets: true,
        }
      }
      var navObject = false;
      if (el.getAttribute('data-swiper-arrows') == 'true') {
        navObject = {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      }
      var autoplayObj = {
        disableOnInteraction: true
      };
      var delay = el.getAttribute('data-swiper-speed');
      if (delay > 0) {
        autoplayObj.delay = delay * 1000
      }
      var mySwiper = new Swiper(el, {
        slidesPerView: 1,
        centeredSlides: false,
        spaceBetween: 0,
        autoplay: autoplayObj,
        autoHeight: true,
        effect: animType,
        threshold: 10,
        pagination: dots,
        navigation: navObject
      });

    }
  }
}