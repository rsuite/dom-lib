import camelizeStyleName from '../src/utils/camelizeStyleName';

describe('Utils', () => {
  describe('camelizeStyleName', () => {
    // https://www.andismith.com/blogs/2012/02/modernizr-prefixed/
    it('Should return the correct Modernizr prefix', () => {
      expect(camelizeStyleName('-ms-transform')).to.equal('msTransform');
      expect(camelizeStyleName('-moz-transform')).to.equal('MozTransform');
      expect(camelizeStyleName('-o-transform')).to.equal('OTransform');
      expect(camelizeStyleName('-webkit-transform')).to.equal('WebkitTransform');
      expect(camelizeStyleName('transform')).to.equal('transform');
    });
  });
});
