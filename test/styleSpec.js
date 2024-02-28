import { getStyle, removeStyle, addStyle, translateDOMPositionXY } from '../src';
import { getTranslateDOMPositionXY } from '../src/translateDOMPositionXY';

describe('Style', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__html__['test/html/style.html'];
  });

  describe('getStyle', () => {
    it('Should return complete style text', () => {
      const el = document.getElementById('case-1');
      const style = getStyle(el);
      expect(style.color).to.contain('rgb(255, 0, 0)');
      expect(style.marginLeft).to.contain('1px');
    });

    it('Should return style value of specific property', () => {
      const el = document.getElementById('case-1');
      const color = getStyle(el, 'color');
      expect(color).to.contain('rgb(255, 0, 0)');
    });
  });

  describe('addStyle', () => {
    it('Should add a single style property with specific value', () => {
      const el = document.getElementById('case-2');
      addStyle(el, 'color', '#ffffff');

      const style = getStyle(el);
      expect(style.color).to.contain('rgb(255, 255, 255)');
    });

    it('Should add multiple style properties with specific values', () => {
      const el = document.getElementById('case-2');
      addStyle(el, {
        background: '#ff0000',
        'margin-left': '4px'
      });

      const style = getStyle(el);
      expect(style.background).to.contain('rgb(255, 0, 0)');
      expect(style.marginLeft).to.contain('4px');
    });
  });

  describe('removeStyle', () => {
    it('Should remove a single style property', () => {
      const el = document.getElementById('case-3');
      removeStyle(el, 'color');
      const style = getStyle(el);
      expect(style.color).to.be.empty;
      expect(style.background).to.contain('rgb(255, 0, 0)');
    });

    it('Should remove multiple style properties', () => {
      const el = document.getElementById('case-3');
      removeStyle(el, ['margin-left', 'margin-right']);

      const style = getStyle(el);
      expect(style.marginLeft).to.be.empty;
      expect(style.marginRight).to.be.empty;
      expect(style.background).to.contain('rgb(255, 0, 0)');
    });
  });

  describe('translateDOMPositionXY', () => {
    it('Should use translate3d by default', () => {
      const style = {};
      translateDOMPositionXY(style, 10, 20);

      expect(style.transform).to.contain('translate3d(10px,20px,0)');
      expect(style.backfaceVisibility).to.contain('hidden');
    });

    it('Should be disable translate3d', () => {
      const translateDOMPositionXY = getTranslateDOMPositionXY({ enable3DTransform: false });
      const style = {};
      translateDOMPositionXY(style, 10, 20);

      expect(style.transform).to.contain('translate(10px,20px)');
    });

    it('Should be forced to use translate3d', () => {
      const translateDOMPositionXY = getTranslateDOMPositionXY({
        forceUseTransform: true,
        enable3DTransform: true
      });
      const style = {};
      translateDOMPositionXY(style, 10, 20);

      expect(style.transform).to.contain('translate3d(10px,20px,0)');
      expect(style.backfaceVisibility).to.contain('hidden');
    });

    it('Should be forced to use translate3d', () => {
      const translateDOMPositionXY = getTranslateDOMPositionXY({
        forceUseTransform: true,
        enable3DTransform: false
      });
      const style = {};
      translateDOMPositionXY(style, 10, 20);

      expect(style.transform).to.contain('translate(10px,20px)');
    });
    it('Should be use position', () => {
      const translateDOMPositionXY = getTranslateDOMPositionXY({
        enableTransform: false
      });
      const style = {};
      translateDOMPositionXY(style, 10, 20);

      expect(style.left).to.contain('10px');
      expect(style.top).to.contain('20px');
    });
  });
});
