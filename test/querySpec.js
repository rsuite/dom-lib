import { scrollTop } from '../src';


describe('Query', () => {

    beforeEach(() => {
        document.body.innerHTML = window.__html__['test/html/query.html'];
    });

    it('should add a class', () => {
        let el = document.getElementById('case-1');
        scrollTop(el, 10);
        //expect(el.className).to.contain('custom-class');
    });

});
