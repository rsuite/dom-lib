import { addClass, hasClass, removeClass , toggleClass} from '../src';


describe('Class', () => {

    beforeEach(() => {
        document.body.innerHTML = window.__html__['test/html/class.html'];
    });

    it('should add a class', () => {
        let el = document.getElementById('case-1');
        addClass(el, 'custom-class');
        expect(el.className).to.contain('custom-class');
    });

    it('should remove a class', () => {
        let el = document.getElementById('case-2');
        removeClass(el, 'test-class');
        expect(el.className).to.equal('');
    });

    it('should toggle a class', () => {
        let el = document.getElementById('case-3');
        toggleClass(el, 'test-class');
        expect(el.className).to.equal('test-class');
        toggleClass(el, 'test-class');
        expect(el.className).to.equal('');
    });

    it('should check for a class', () => {
        expect(hasClass(document.getElementById('case-1'), 'test-class')).to.equal(false);
        expect(hasClass(document.getElementById('case-2'), 'test-class')).to.equal(true);
    });

});
