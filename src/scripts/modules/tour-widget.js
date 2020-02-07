import Bit from '../components/bandsintown';
export default class TestModule {
  constructor(el) {
    this.el = el;
    this.bitWidget = new Bit(this.el)
  }
}