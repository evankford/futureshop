import 'unfetch/polyfill';
import 'es6-promise/auto';

import * as cart from '@shopify/theme-cart';

import ShopCart from '../components/shop-cart'
import ShopDrawer from '../components/shop-drawer'


export default class TestModule {

  constructor(el) {
    this.el = el;
    this.drawerState = 'closed'
    
    this.selectors = {
      noteToggle: '[data-note-toggle]',
      noteWrap: '[data-note]',
      cartDrawer: '[data-cart-drawer]'
    }
    this.drawer = new ShopDrawer(el, { direction: this.el.getAttribute('data-offscreen')})
    this.cartDrawer = this.el.querySelector(this.selectors.cartDrawer); 
    
    this.noteToggle = this.el.querySelector('[data-note-toggle]')
    this.init();
    
  }
  
  init() {
    this.setupListeners();
    if (this.cartDrawer) {
      this.cart = new ShopCart(this.el.querySelector('[data-cart-drawer]'));
    }
  }
  
  setupCartButtons() {
    const allAnchors = Array.from(document.getElementsByTagName('a'));
    allAnchors.forEach(myAnchor=> {
      if (myAnchor.href.indexOf("/cart") >=0) {
        myAnchor.setAttribute('data-cart-button', true);
      }
    })
  }
  
  handleCartButtonClick(e) {
    e.preventDefault()
    console.log(this.drawerState);
    this.drawer.openDrawer();
  }
  
  setupNote() {

    var noteToggle = this.el.querySelector(this.selectors.noteToggle);
    var noteWrap = this.el.querySelector(this.selectors.noteWrap);
    if (noteToggle && noteWrap) {
      noteToggle.addEventListener('click', function () {
        if (noteWrap.classList.contains('active')) {
          noteWrap.classList.remove('active')
        } else {
          noteWrap.classList.add('active');
        }
      })
    }
  }
  
  setupListeners() {
    //find cart buttons
    this.setupCartButtons();
    this.setupNote();
    var allCartButtons = document.querySelectorAll('[data-cart-button]');
    allCartButtons.forEach(cartButton=> {
      cartButton.addEventListener("click", this.handleCartButtonClick.bind(this))
    })    
   
  }
  
}