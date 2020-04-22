import 'babel-polyfill';

import 'lazysizes';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'classlist-polyfill';

import Rellax from 'rellax';
import queryString from 'query-string';
import AlertDrawer from '../components/alert-drawer';

import { debounce } from 'lodash';
import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';

import objectFitImages from 'object-fit-images';

//// Fancy Scrolling effects
import AOS from 'aos';
//Headroom
import Headroom from 'headroom.js';

import reframe from 'reframe.js/dist/reframe';

class Theme {
  constructor() {
    //Important site sections
    this.main = document.getElementById('MainContent');
    this.header = document.querySelector('.site-header__wrap');
    this.hero = false;
    this.footer = false;

    this.utilities();
    this.init();
  }

  init() {
    AOS.init({
      once: true,
      offset: -200,
    });

    this.mobileMenuInit();
    this.buildHeadroom();
    this.initRellaxImages();
    this.initModules();
    this.reframe();

    this.resizeHandler = this.allResize.bind(this);
    this.loadHandler = this.allLoad.bind(this);
    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('load', this.loadHandler);
    this.loadHandler();
  }

  reframe() {
    reframe('.rte iframe');
  }

  utilities() {
    objectFitImages();

    // Common a11y fixes
    focusHash();
    bindInPageLinks();

    // Apply a specific class to the html element for browser support of cookies.
    if (navigator.cookieEnabled) {
      document.documentElement.className = document.documentElement.className.replace(
        'supports-no-cookies',
        'supports-cookies'
      );
    }

    /// Remove focus for non-screen-reader hoverers
    function removeFocus() {
      document.body.classList.add('hover-focus-hidden');
      window.removeEventListener('mouseover', removeFocus);
    }
    window.addEventListener('mouseover', removeFocus);
  }

  mobileMenuInit() {
    /// The only JS to work with the mobile menu
    const menuToggler = document.querySelector('.mobile-nav-toggle');
    const menuBg = document.querySelector('.nav-inner__background');
    function toggleMenu() {
      if (document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
      } else {
        document.body.classList.add('nav-open');
      }
    }
    menuToggler.addEventListener('click', toggleMenu);
    menuBg.addEventListener('click', toggleMenu);
  }

  checkForHero() {
    var allImages = this.main.querySelectorAll('.image-section');
    if (allImages.length > 0) {
      if (this.main.firstElementChild == allImages[0]) {
        this.hero = allImages[0];
      }
    }
  }
  //Headroom stuff
  buildHeadroom() {
    this.offset = 0;
    this.scrollMark = 0;
    this.overlay = false;

    if (this.header && this.header.classList.contains('site-header__wrap')) {
      this.headroomCheckOverlay();
      this.headroomHandleOffsets();
      this.headroomFixHeader();
      this.headroomInit();
      this.headroomInitCheckScroll();
    }
  }

  headroomCheckOverlay() {
    this.checkForHero();
    if (
      document.body.classList.contains('template-index') &&
      this.header.classList.contains('overlay-header')
    ) {
      this.overlay = true;
    }
    if (this.hero) {
      this.overlay = true;
    }
  }

  headroomFixHeader() {
    if (this.header) {
      this.header.classList.add('loaded');
      if (this.overlay == true) {
        this.header.classList.add('js-fixed');
      }
    }
  }

  headroomCheckScroll() {
    if (window.scrollY < this.scrollMark) {
      this.header.classList.add('overlay-active');
    } else {
      this.header.classList.remove('overlay-active');
    }
  }
  headroomInitCheckScroll() {
    var self = this;
    if (this.overlay == true && this.hero) {
      this.scrollMark = this.hero.getBoundingClientRect().height;
      window.addEventListener(
        'scroll',
        debounce(self.headroomCheckScroll.bind(this), 100)
      );
      self.headroomCheckScroll.bind(this);
    }
  }
  headroomHandleOffsets() {
    this.topBar = this.header.querySelector('.header-above__inner');
    if (this.topBar) {
      this.offset = 0 + this.topBar.getBoundingClientRect().height;
    }
    if (this.hero) {
      this.offset += this.hero.getBoundingClientRect().height;
    }
  }
  headroomInit() {
    var myHeadroom = new Headroom(this.header, {
      offset: this.offset,
      tolerance: 8,
    });
    myHeadroom.init();
  }

  headerOffset() {
    var headerHeight = this.header.offsetTop + this.header.offsetHeight;
    if (this.main && !this.hero) {
      this.main.style.paddingTop = headerHeight + 'px';
    }
  }

  //Resize handling
  allResize() {
    this.headroomCheckScroll();
    this.headerOffset();
  }
  allLoad() {
    this.handleURLParams();
    setTimeout(() => {
      this.headroomCheckScroll();
      this.headerOffset();
    }, 100);
  }

  //Rellax images
  initRellaxImages() {
    this.rellaxImages = document.querySelectorAll('.rellax-image');
    this.rellaxBgs = document.querySelectorAll('.rellax-bg');
    this.rellaxFloats = document.querySelectorAll('.rellax-float');
    if (this.rellaxImages) {
      if (this.rellaxImages.length > 0) {
        var rellaxImage = new Rellax('.rellax-image', {
          center: true,
          speed: -4,
        });
        window.addEventListener('load', function() {
          rellaxImage.refresh();
        });
      }
    }
    if (this.rellaxBgs) {
      if (this.rellaxBgs.length > 0) {
        this.rellaxBgs.forEach((el) => {
          let offset = el.parentElement.scrollTop;
          var bg = new Rellax(el, {
            center: true,
            speed: -5,
          });
          window.addEventListener('load', function() {
            bg.refresh();
          });
        });
      }
    }
    if (this.rellaxFloats) {
      if (this.rellaxFloats.length > 0) {
        rellaxFloats.forEach((el) => {
          let offset = el.parentElement.scrollTop;
          var float = new Rellax(el, {
            center: true,
            speed: 3,
          });
          window.addEventListener('load', function() {
            float.refresh();
          });
        });
      }
    }
  }

  handleURLParams() {
    var parsedURL = queryString.parse(location.search);
    if (parsedURL.customer_posted == 'true') {
      var customerSuccessDrawer = new AlertDrawer({
        type: 'success',
        class: 'email-drawer',
        position: 'top',
        message: window.alertText.customerSuccess,
      });
    } else if (parsedURL.form_type == 'customer') {
      console.log('errored');
      var customerSuccessDrawer = new AlertDrawer({
        type: 'error',
        position: 'top',
        class: 'email-drawer',
        message: window.alertText.customerFailure,
      });
    }
  }

  initModules() {
    Array.from(document.querySelectorAll('[data-module]')).forEach((el) => {
      const name = el.getAttribute('data-module');
      const Module = require(`../modules/${name}`).default;
      new Module(el);
    });
  }
}

var site = new Theme();
