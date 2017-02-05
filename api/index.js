const express = require('express'),
    router = express.Router(),
    parser = require('./parser'),
    events = require('./events'),
    mustBe = require('./auth').mustBe;

router.get('/:id', mustBe('api'), function(req, res, next) {

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

  })
  .catch(e => console.log(e));

});

router.get('/feed/:id', mustBe('api'), function(req, res, next) {

  events.getFeed(req.params.id).then(events => {

    const ids = events
      .filter(event => event.type === 'event')
      .map(event => event.object_id);

    res.json(ids);

  })
  .catch(e => console.log(e));

});

router.get('/feed_info/:id', mustBe('api'), function(req, res, next) {
  events.getFeedInfo(req.params.id).then(info => {
    res.json(info);
  })
  .catch(e => console.log(e));
});

module.exports = router;
