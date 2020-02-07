import Instafeed from "instafeed.js";
import Swiper from 'swiper';
import '../../../node_modules/swiper/dist/css/swiper.min.css';

////Video Lightbox
//Element with "data-module" is el



export default class TestModule {
  constructor(el) {
    this.el = el;
    const wrapper = this.el;
    const instaTarget = wrapper.querySelector('.instagram-grid');
    
    this.slidesPerView = {
      large: 4, 
      medium: 3,
      small : 2
    }
    this.gap = {
      large: 20,
      medium: 15,
      small: 10
    }
    this.slidesPerColumn = 2
    this.centerSlides = false;
    if (el.getAttribute('data-grid-size') == 'slider') {
      this.slidesPerView = {
        large: 2,
        medium: 1.5,
        small: 1.1
      }
      this.gap = {
        large: 30,
        medium: 20,
        small: 12
      }
      this.slidesPerColumn = 1;
      this.centerSlides = true;
    }
    
    el.swiper = new Swiper(wrapper, {
      slidesPerView: this.slidesPerView.large,
      slidesPerColumn: this.slidesPerColumn,
      spaceBetween: this.gap.large,
      autoplay: false,
      centeredSlides: this.centerSlides,
      slideToClickedSlide: true,
      threshold: 5,
      preventClicks: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        dynamicBullets: true
      },
      breakpoints: {
        900: {
          slidesPerView: this.slidesPerView.medium,
          spaceBetween: this.gap.medium
        },
        500: {
          slidesPerView: this.slidesPerView.small,
          spaceBetween: this.gap.small
        }
      }
    });
    
    el.token = el.getAttribute('data-token');
    var feed = new Instafeed({
      accessToken: el.token,
      get: 'user',
      userId: el.getAttribute('data-user-id'),
      target: instaTarget,
      
      links: true,
      resolution: 'standard_resolution',
      template: '<a class="swiper-slide insta-slide" data-type="{{type}}" target="_blank" rel="nofollow" href="{{link}}"><img src="{{image}}" /><div class="insta-extra"><div class="insta-likes"><i class="fas fa-heart" aria-label="number of likes"></i>{{likes}}</div><div class="insta-comments"><i class="fas fa-comments" aria-label="number of comments"></i>{{comments}}</div><div class="insta-caption">{{caption}}</div></div></a>',
      after: function() {
        el.swiper.update()
      }
    })
    feed.run();
  }
}