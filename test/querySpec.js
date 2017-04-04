import * as lib from '../src';
import $ from 'jquery';

describe('Query', () => {

    beforeEach(() => {
        document.body.innerHTML = window.__html__['test/html/query.html'];
    });

    it('should get 100 of height', () => {
        let el = document.getElementById('case-1');
        let height = lib.getHeight(el);
        let k = expect(height).to.equal(100);
    });

    it('should get 200 of width', () => {
        let el = document.getElementById('case-1');
        let height = lib.getWidth(el);
        expect(height).to.equal(200);
    });

    it('should handle fixed position', () => {
        let el = document.getElementById('case-2');
        let position = lib.getPosition(el);
        let $position = $('#case-2').position();
        expect(position.left).to.equal($position.left);
        expect(position.top).to.equal($position.top);
    });

    it('should handle absolute position', () => {
        let el = document.getElementById('case-3');
        let position = lib.getPosition(el);
        let $position = $('#case-3').position();

        expect(position.left).to.equal($position.left);
        expect(position.top).to.equal($position.top);
    });

    it('should handle scroll position', () => {
        let el = document.getElementById('case-4');
        lib.scrollTop(el, 100);
        lib.scrollLeft(el, 200);

        expect(100).to.equal($('#case-4').scrollTop());
        expect(200).to.equal($('#case-4').scrollLeft());
    });


    it('should check for contained element', () => {
        let el4 = document.getElementById('case-4');
        let el5 = document.getElementById('case-5');
        let el6 = document.getElementById('case-6');

        expect(lib.contains(el5, el4)).to.equal(false);
        expect(lib.contains(el5, el6)).to.equal(true);
    });

});
