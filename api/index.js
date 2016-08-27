const express = require('express'),
    router = express.Router(),
    config = require('../config'),
    FB = require('fb'), 
    parser = require('./parser');

router.get('/:id', function(req, res, next) {

  FB.options({
    appId: config.fb.app_id,
    xfbml: true,
    version: 'v2.6'
  });

  const params = {
    access_token: config.fb.access_token 
  };

  FB.api(`/${req.params.id}`, params, (e) => {

    e.links = parser.findLinks(e.description);

    res.json(e);
  });
});

module.exports = router;
