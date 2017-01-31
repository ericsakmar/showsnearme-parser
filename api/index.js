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

router.get('/feed/:id', function(req, res, next) {

  events.getFeed(req.params.id).then(events => {

    const ids = events
      .filter(event => event.type === 'event')
      .map(event => event.object_id);

    res.json(ids);

  });

});

router.get('/feed_info/:id', function(req, res, next) {
  events.getFeedInfo(req.params.id).then(info => {
    res.json(info);
  });
});

module.exports = router;
