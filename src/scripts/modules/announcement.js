
export default class TestModule {
  constructor(el) {
    this.el = el
    this.slideIn = this.el.getAttribute("data-slide-in")
    this.closer = this.el.querySelector('[data-close-announcement]')
    this.init();
  }
  init() {
    this.ht = this.el.getBoundingClientRect().height;
    document.body.style.WebkitTransition = 'margin 300ms ease';
    document.body.style.MozTransition = 'margin 300ms ease';
    document.body.style.transition = 'margin 300ms ease';
  
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.enable();
      }, 500)
    })
    window.addEventListener('resize', () => {
        this.resize();
    })
  }
  enable() {
    this.el.classList.add('announceActive');
    this.resize();
    if (this.closer) {
      this.closer.addEventListener('click', this.disable.bind(this));
    }
  }
  disable() {
    document.body.style.marginTop = '0px';
    this.el.classList.remove('announceActive')
  }
  resize() {
    this.ht = this.el.getBoundingClientRect().height;
    if (this.el.classList.contains("announceActive")) {
      this.el.style.top = -this.ht + 'px'
      document.body.style.marginTop = this.ht + 'px';
      
    }
  }
}