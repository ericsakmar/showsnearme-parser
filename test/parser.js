const should = require('should'),
  parser = require('../api/parser');

describe('parser', () => {

  describe('parses urls', () => {

    it('one', (done) => {
      const expected = ['https://showponiesindc.bandcamp.com/'];
      const text = 'foo show blah blah https://showponiesindc.bandcamp.com/ other stuff';

      parser.findLinks(text).then(actual => {
        actual.should.deepEqual(expected);
        done();
      });
    });

    it('more than one', () => {
      const expected = ['https://showponiesindc.bandcamp.com/', 'https://swimsuitaddition.bandcamp.com/'];
      const text = 'foo show blah blah https://showponiesindc.bandcamp.com/ other https://swimsuitaddition.bandcamp.com/ stuff';
      parser.findLinks(text).then(actual => {
        actual.should.deepEqual(expected);
        done();
      });
    });
    
    it('none', () => {
      const expected = [];
      const text = 'foo show blah blah other stuff';
      parser.findLinks(text).then(actual => {
        actual.should.deepEqual(expected);
        done();
      });
    });

    it('long link', () => {
      const expected = ['https://showponiesindc.bandcamp.com/album/slow-danger'];
      const text = 'foo show blah blah https://showponiesindc.bandcamp.com/album/slow-danger    other stuff';
      parser.findLinks(text).then(actual => {
        actual.should.deepEqual(expected);
        done();
      });
    });


  });


  describe('gets meta info', () => {

    it('gets it', (done) => {
      const links = ['https://showponiesindc.bandcamp.com/'];
      parser.findMetas(links).then(
        (metas) => {
          should.exist(metas);
          done();
        },
        (err) => { done(); }
      );
    });

    it('only gets bandcamps', (done) => {
      const links = ['http://showponyband.com/'];
      parser.findMetas(links).then(
        (metas) => {
          metas.should.be.empty();
          done();
        },
        (err) => { done(); }
      );
    });

    it('handles 404s', (done) => {
      const links = ['https://showponiesindc.bandcamp.com/asdfasdfasdf', 'https://showponiesindc.bandcamp.com/' ];
      parser.findMetas(links).then(
        (metas) => {
          should.not.exist(metas[0]);
          should.exist(metas[1]);
          done();
        },
        (err) => { done(err); }
      );
    });



  });
    
    
});
