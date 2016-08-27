const should = require('should'),
  parser = require('../api/parser');

describe('parser', () => {

  describe('parses urls', () => {

    it('one', () => {
      const expected = ['https://showponiesindc.bandcamp.com/'];
      const text = 'foo show blah blah https://showponiesindc.bandcamp.com/ other stuff';
      const actual = parser.findLinks(text);
      actual.should.deepEqual(expected);
    });

    it('more than one', () => {
      const expected = ['https://showponiesindc.bandcamp.com/', 'https://swimsuitaddition.bandcamp.com/'];
      const text = 'foo show blah blah https://showponiesindc.bandcamp.com/ other https://swimsuitaddition.bandcamp.com/ stuff';
      const actual = parser.findLinks(text);
      actual.should.deepEqual(expected);
    });
    
    it('none', () => {
      const expected = [];
      const text = 'foo show blah blah other stuff';
      const actual = parser.findLinks(text);
      actual.should.deepEqual(expected);
    });

    it('long link', () => {
      const expected = ['https://showponiesindc.bandcamp.com/album/slow-danger'];
      const text = 'foo show blah blah https://showponiesindc.bandcamp.com/album/slow-danger    other stuff';
      const actual = parser.findLinks(text);
      actual.should.deepEqual(expected);
    });


  });
    
    
});
