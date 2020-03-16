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

import { throttle } from 'underscore';
import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';

import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';

// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (navigator.cookieEnabled) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies',
  );
}

/// Remove focus for non-screen-reader hoverers
function removeFocus() {
  document.body.classList.add('hover-focus-hidden');
  window.removeEventListener('mouseover', removeFocus);
}
window.addEventListener('mouseover', removeFocus);


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
menuToggler.addEventListener('click', toggleMenu)
menuBg.addEventListener('click', toggleMenu)

//// Fancy Scrolling effects  
import AOS from 'aos';

AOS.init({
  once: true,
  offset: -200
});


//////Headroom!

import Headroom from 'headroom.js';
var headerHt;
var myHeader = false;
function initMenu() {
  myHeader = document.querySelector('[data-section-type=header]');
  var overlayHeader = false;
  if (document.body.classList.contains('template-index')  && myHeader.classList.contains('overlay-header')) {   
    overlayHeader = true;
  }
  
  //Continue if you have a header!
  
  if (myHeader) {
    //Classes
    myHeader.classList.add('js-fixed');
    myHeader.classList.add('loaded');
    
    var topOffset;
    
    
    function checkScroll() {
      if (window.scrollY < topOffset) {
        myHeader.classList.add('overlay-active')
      } else {
        myHeader.classList.remove('overlay-active')
      }
    }

    
    //Get topbar
    var topBar = myHeader.querySelector('.header-above__inner');
    var offset = topBar.getBoundingClientRect().height;
    const mainMain = document.getElementById('MainContent');
    var imageSection = mainMain.querySelectorAll('.image-section')[0]; 
    if (imageSection) {
      offset = imageSection.getBoundingClientRect().height;
    }
    var myHeadroom = new Headroom(myHeader, {
      "offset": offset,
      "tolerance": 9
    })
    myHeadroom.init();


    // menu size handling
      if (!overlayHeader) {
        headerHt = myHeader.getBoundingClientRect().height - myHeader.querySelector('.header-above').getBoundingClientRect().height + topBar.getBoundingClientRect().height + "px";
        document.getElementById('MainContent').style.paddingTop = headerHt;
      }
    if (overlayHeader)  {
      let mainContent = document.getElementById('MainContent');
      let allSections = mainContent.querySelectorAll('.shopify-section')
      
       topOffset = allSections[0].getBoundingClientRect().height;
      window.addEventListener('scroll', throttle(checkScroll, 100))
      checkScroll();
    }
  myHeader.addEventListener('click', function (event) {
    handleHeaderClick(event)
  });
   
  }
}
  

function handleHeaderClick(event) {
  var theHref = event.target.getAttribute('href')
  if (theHref) {
    if (theHref.includes('#')) {
      const targetHash = theHref.split('#')[1];
      var newTarget = document.querySelector('#' + targetHash);

      //is a hash link
      if (newTarget) {
        event.preventDefault();
        newTarget.scrollIntoView({
          behavior: "smooth"
        })
      }
    }
  }
}
window.addEventListener('resize', initMenu)
window.addEventListener('load', function() {
  setTimeout(() => {
    initMenu();
  }, 400);
})

function initRellaxImages() {
  var rellaxImages = document.querySelectorAll('.rellax-image');
  var rellaxFloats = document.querySelectorAll('.rellax-float');
  if (rellaxImages) {
    if (rellaxImages.length > 0) {
      
      var rellaxImage = new Rellax('.rellax-image', {
        center: true,
        speed: -4
      })
      window.addEventListener('load', function () {
        rellaxImage.refresh();
      });
    }
  }
  if (rellaxFloats) {
    
    if (rellaxFloats.length > 0) {
      
      rellaxFloats.forEach(el=> {
        let offset = el.parentElement.scrollTop;
        var float = new Rellax(el, {
          center: true, 
          speed: 3
        })
        window.addEventListener('load', function () {
            float.refresh();
        });
      })
    }
  }
}
initRellaxImages();


// check for form submits

function handleURLParams() {
  var parsedURL = queryString.parse(location.search);    
  if (parsedURL.customer_posted == 'true') {
    var customerSuccessDrawer = new AlertDrawer({
      type: 'success',
      class: 'email-drawer',
      position: 'top',
      message: window.alertText.customerSuccess
    })
  } else if (parsedURL.form_type == 'customer') {
    console.log('errored');
    var customerSuccessDrawer = new AlertDrawer({
      type: 'error',
      position: 'top',
      class: 'email-drawer',
      message: window.alertText.customerFailure
    })
  }
}

window.addEventListener('load', handleURLParams);

import browserUpdate from 'browser-update';
browserUpdate({
  required: {
    e: -2,
    i: 11,
    f: -3,
    o: -3,
    s: 10.1,
    c: "64.0.3282.16817",
    samsung: 7.0,
    vivaldi: 1.2
  },
  insecure: true
})

///Look for modules in the script, much of the rest of the boilerplate is in modules!

Array.from(document.querySelectorAll('[data-module]')).forEach(el => {
  const name = el.getAttribute('data-module')
  const Module = require(`../modules/${name}`).default
  new Module(el)
})



//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////// End Boilerplate /////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////