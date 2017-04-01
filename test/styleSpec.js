import { getStyle, removeStyle, addStyle, getComputedStyle } from '../src/style';


describe('Style helpers', () => {

    beforeEach(() => {
        document.body.innerHTML = window.__html__['test/html/style.html'];
    });

    it('should get style value', () => {
        let el = document.getElementById('case-1');
        let color = getStyle(el, 'color');
        expect(color).to.contain('rgb(255, 0, 0)');
    });

    it('should get style', () => {
        let el = document.getElementById('case-1');
        let style = getStyle(el);
        expect(style.color).to.contain('rgb(255, 0, 0)');
        expect(style.marginLeft).to.contain('1px');
    });




    it('should add style', () => {
        let el = document.getElementById('case-2');
        addStyle(el, 'color', '#ffffff');
        addStyle(el, {
            background: '#ff0000',
            'margin-left': '4px'
        });

        let style = getStyle(el);
        expect(style.color).to.contain('rgb(255, 255, 255)');
        expect(style.background).to.contain('rgb(255, 0, 0)');
        expect(style.marginLeft).to.contain('4px');
    });

    it('should remove style', () => {
        let el = document.getElementById('case-3');
        removeStyle(el, 'color');
        removeStyle(el, ['margin-left', 'margin-right']);
        let style = getStyle(el);
        expect(style.color).to.contain('');
        expect(style.marginLeft).to.contain('');
        expect(style.marginRight).to.contain('');
        expect(style.background).to.contain('rgb(255, 0, 0)');
    });

    it('should get computed style', () => {
        let el = document.getElementById('case-4');
        let style = getComputedStyle(el);
        expect(style.color).to.contain('rgb(255, 0, 0)');
    });

});
