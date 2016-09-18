"use strict";

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


  describe('gets band info', () => {

    it('finds info', (done) => {
      var meta = {
        'Description': 'band description',
        'og:site_name': 'Band Name',
        'og:image': 'image.jpg',
        'og:url': 'band.com',
        'og:video': 'videourl',
        'og:video:width': '400',
        'og:video:height': '120'
      };

      parser.findBandInfo([meta]).then(
        (bands) => {
          bands.length.should.equal(1);

          let expected = {
            name: meta['og:site_name'],
            description: meta['Description'],
            image: meta['og:image'],
            url: meta['og:url'],
            embed: {
              url: meta['og:video'],
              width: meta['og:video:width'],
              height: meta['og:video:height']
            }
          };

          let band = bands[0];
          band.should.deepEqual(expected);

          done();
        }, done).catch(done);

    });

    it('no embed', (done) => {
      var meta = {
        'Description': 'band description',
        'og:site_name': 'Band Name',
        'og:image': 'image.jpg',
        'og:url': 'band.com'
      };

      parser.findBandInfo([meta]).then(
        (bands) => {
          bands.length.should.equal(1);

          let expected = {
            name: meta['og:site_name'],
            description: meta['Description'],
            image: meta['og:image'],
            url: meta['og:url']
          };

          let band = bands[0];
          band.should.deepEqual(expected);

          done();
        }, done).catch(done);

    });

  });
    
});
