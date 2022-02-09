import * as lib from '../src';
import $ from 'jquery';

describe('Query', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__html__['test/html/query.html'];
  });

  it('should get 100 of height', () => {
    const el = document.getElementById('case-1');
    const height = lib.getHeight(el);
    expect(height).to.equal(100);
  });

  it('should get 200 of width', () => {
    const el = document.getElementById('case-1');
    const height = lib.getWidth(el);
    expect(height).to.equal(200);
  });

  it('should handle fixed position', () => {
    const el = document.getElementById('case-2');
    const position = lib.getPosition(el);
    const $position = $('#case-2').position();
    expect(position.left).to.equal($position.left);
    expect(position.top).to.equal($position.top);
  });

  it('should handle absolute position', () => {
    const el = document.getElementById('case-3');
    const position = lib.getPosition(el);
    const $position = $('#case-3').position();

    expect(position.left).to.equal($position.left);
    expect(position.top).to.equal($position.top);
  });

  it('should handle scroll position', () => {
    const el = document.getElementById('case-4');
    lib.scrollTop(el, 100);
    lib.scrollLeft(el, 200);

    expect(100).to.equal($('#case-4').scrollTop());
    expect(200).to.equal($('#case-4').scrollLeft());
  });

  describe('contains(context, node)', () => {
    it('should check for contained element', () => {
      const el4 = document.getElementById('case-4');
      const el5 = document.getElementById('case-5');
      const el6 = document.getElementById('case-6');

      expect(lib.contains(el5, el4)).to.equal(false);
      expect(lib.contains(el5, el6)).to.equal(true);
    });

    it('should return false if node is null', () => {
      const el4 = document.getElementById('case-4');
      expect(lib.contains(el4, null)).to.be.false;
    });
  });

  it('should container with offset', () => {
    const container = document.getElementById('case-7');
    const node = document.getElementById('case-8');

    const posi = lib.getPosition(node, container, false);
    expect(posi.top).to.equal(20);
    expect(posi.left).to.equal(10);
  });

  describe('isFocusable', () => {
    function createElement(type, props = {}) {
      const element = document.createElement(type, props);
      const keys = Object.keys(props);
      for (const prop of keys) {
        const value = props[prop];
        element[prop] = value;
        element.setAttribute(prop.toLowerCase(), `${value}`);
      }

      document.body.appendChild(element);

      return element;
    }

    it('should return true for focusable element', () => {
      expect(
        lib.isFocusable(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
      ).to.equal(false);
      expect(lib.isFocusable(createElement('input'))).to.equal(true);
      expect(lib.isFocusable(createElement('input', { tabIndex: -1 }))).to.equal(true);
      expect(lib.isFocusable(createElement('input', { hidden: true }))).to.equal(false);
      expect(lib.isFocusable(createElement('input', { disabled: true }))).to.equal(false);
      expect(lib.isFocusable(createElement('a'))).to.equal(false);
      expect(lib.isFocusable(createElement('a', { href: '' }))).to.equal(true);
      expect(lib.isFocusable(createElement('audio'))).to.equal(false);
      expect(lib.isFocusable(createElement('audio', { controls: true }))).to.equal(true);
      expect(lib.isFocusable(createElement('video'))).to.equal(false);
      expect(lib.isFocusable(createElement('video', { controls: true }))).to.equal(true);
      expect(lib.isFocusable(createElement('div'))).to.equal(false);
      expect(lib.isFocusable(createElement('div', { contentEditable: true }))).to.equal(true);
      expect(lib.isFocusable(createElement('div', { tabIndex: 0 }))).to.equal(true);
      expect(lib.isFocusable(createElement('div', { tabIndex: -1 }))).to.equal(true);
    });
  });

  describe('getContainer', () => {
    it('Should return the container if present', () => {
      const container = {};

      expect(lib.getContainer(container)).to.equal(container);
    });

    it('Should return the return value of container when container is a function', () => {
      const container = {};

      expect(lib.getContainer(() => container)).to.equal(container);
    });

    it('Should return defaultContainer if container is null', () => {
      const defaultContainer = {};

      expect(lib.getContainer(null, defaultContainer)).to.equal(defaultContainer);
    });

    it('Should return defaultContainer if container returns null', () => {
      const defaultContainer = {};

      expect(lib.getContainer(() => null, defaultContainer)).to.equal(defaultContainer);
    });
  });
});
