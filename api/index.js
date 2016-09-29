const express = require('express'),
    router = express.Router(),
    parser = require('./parser'),
    events = require('./events');

router.get('/:id', function(req, res, next) {

  events.getFbEvent(req.params.id).then(event => {

    parser.findLinks(event.description)
      .then(links => parser.findMetas(links))
      .then(metas => parser.findBandInfo(metas))
      .then(bands => {
        event.bands = bands;
        return parser.findTags(event);
      })
      .then(tags => {
        event.tags = tags;
        res.json(event);
      });

  });

});

module.exports = router;
