const express = require('express'),
    router = express.Router(),
    parser = require('./parser'),
    events = require('./events'),
    mustBe = require('./auth').mustBe;

router.get('/:id', mustBe('api'), function(req, res, next) {

  events.getFbEvent(req.params.id).then(event => {
    res.json(event);

    // parser.findLinks(event.description)
    //   .then(links => parser.findMetas(links))
    //   .then(metas => parser.findBandInfo(metas))
    //   .then(bands => {
    //     event.bands = bands;
    //     return parser.findTags(event);
    //   })
    //   .then(tags => {
    //     event.tags = tags;
    //     res.json(event);
    //   });

  })
  .catch(e => console.log(e));

});

router.get('/feed/:id', mustBe('api'), function(req, res, next) {

  const pageFeed = events.getFeed(req.params.id)
    .then(events => events
      .filter(event => event.type === 'event')
      .map(event => event.object_id));

  const pageEvents = events.getEvents(req.params.id)
    .then(events => events ? events.map(event => event.id) : []);

  Promise.all([pageFeed, pageEvents])
    .then(ids => new Set(ids[0].concat(ids[1])))
    .then(combined => Array.from(combined))
    .then(noDuplicates => res.json(noDuplicates))
    .catch(e => console.log(e));

});

router.get('/feed_info/:id', mustBe('api'), function(req, res, next) {
  events.getFeedInfo(req.params.id).then(info => {
    res.json(info);
  })
  .catch(e => console.log(e));
});

module.exports = router;
