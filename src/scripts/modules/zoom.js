import Drift from 'drift-zoom';

export default class myModule {
  constructor(el) {
    this.pane = el.parentNode;
    this.images = el.querySelectorAll('[data-product-featured-image]')
    this.init();
  }
  init() {
    var _that = this;
    this.images.forEach(img => {
      new Drift(img, {
        paneContainer: this.pane
      })
    })

  }
}