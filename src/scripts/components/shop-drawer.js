class ShopDrawer {
  constructor(el, options) {
    this.drawer = el;
    
    var defaults = {
      direction: 'Right',
      speed: 500
    }
    this.props = Object.assign({},defaults, options)
    this.state = 'closed'
    this.closers = this.drawer.querySelectorAll('[data-drawer-closer]');
    this.animator;//For timeouts
    this.init()
  }
  
  init() {
    this.setupListeners();
    this.closeMyDrawer = this.closeDrawer.bind(this)
    this.openMyDrawer = this.openDrawer.bind(this)
  }
  

  
  setupListeners() {
    var self = this;
    if (this.closers.length >=0) {
    this.drawer.addEventListener('click', function(e) {
      if (e.target.closest('[data-drawer-closer]')) {
        self.closeMyDrawer();
        e.preventDefault();
      }
    })
    }
  }
  
  closeDrawer() {
    console.log('closingDrawer');
    this.drawer.classList.add('transitioning');
    this.drawer.classList.remove('open')
    clearTimeout(this.animator);
    this.animator = setTimeout(() => {
      this.drawer.classList.remove('transitioning')
    }, this.props.speed);
  }
  openDrawer() {
    console.log('openingDrawer');
    this.drawer.classList.add('transitioning');
    this.drawer.classList.add('open')
    clearTimeout(this.animator);
    this.animator = setTimeout(() => {
      this.drawer.classList.remove('transitioning')
    }, this.props.speed);
  }
}

export default ShopDrawer;