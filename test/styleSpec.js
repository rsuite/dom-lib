import { getStyle, removeStyle, addStyle } from '../src';

describe('Style', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__html__['test/html/style.html'];
  });

  it('should get style value', () => {
    const el = document.getElementById('case-1');
    const color = getStyle(el, 'color');
    expect(color).to.contain('rgb(255, 0, 0)');
  });

  it('should get style', () => {
    const el = document.getElementById('case-1');
    const style = getStyle(el);
    expect(style.color).to.contain('rgb(255, 0, 0)');
    expect(style.marginLeft).to.contain('1px');
  });

  it('should add style', () => {
    const el = document.getElementById('case-2');
    addStyle(el, 'color', '#ffffff');
    addStyle(el, {
      background: '#ff0000',
      'margin-left': '4px'
    });

    const style = getStyle(el);
    expect(style.color).to.contain('rgb(255, 255, 255)');
    expect(style.background).to.contain('rgb(255, 0, 0)');
    expect(style.marginLeft).to.contain('4px');
  });

  it('should remove style', () => {
    const el = document.getElementById('case-3');
    removeStyle(el, 'color');
    removeStyle(el, ['margin-left', 'margin-right']);
    const style = getStyle(el);
    expect(style.color).to.contain('');
    expect(style.marginLeft).to.contain('');
    expect(style.marginRight).to.contain('');
    expect(style.background).to.contain('rgb(255, 0, 0)');
  });
});
