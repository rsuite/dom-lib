import { getStyle, removeStyle, addStyle } from '../src';

describe('Style', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__html__['test/html/style.html'];
  });

  describe('getStyle', () => {
    it('should return complete style text', () => {
      const el = document.getElementById('case-1');
      const style = getStyle(el);
      expect(style.color).to.contain('rgb(255, 0, 0)');
      expect(style.marginLeft).to.contain('1px');
    });

    it('should return style value of specific property', () => {
      const el = document.getElementById('case-1');
      const color = getStyle(el, 'color');
      expect(color).to.contain('rgb(255, 0, 0)');
    });
  });

  describe('addStyle', () => {
    it('should add a single style property with specific value', () => {
      const el = document.getElementById('case-2');
      addStyle(el, 'color', '#ffffff');

      const style = getStyle(el);
      expect(style.color).to.contain('rgb(255, 255, 255)');
    });

    it('should add multiple style properties with specific values', () => {
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
    it('should remove a single style property', () => {
      const el = document.getElementById('case-3');
      removeStyle(el, 'color');
      const style = getStyle(el);
      expect(style.color).to.be.empty;
      expect(style.background).to.contain('rgb(255, 0, 0)');
    });

    it('should remove multiple style properties', () => {
      const el = document.getElementById('case-3');
      removeStyle(el, ['margin-left', 'margin-right']);

      const style = getStyle(el);
      expect(style.marginLeft).to.be.empty;
      expect(style.marginRight).to.be.empty;
      expect(style.background).to.contain('rgb(255, 0, 0)');
    });
  });
});
