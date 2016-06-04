const express = require('express'),
    router = express.Router(),
    config = require('../config'),
    FB = require('fb');

router.get('/:id', function(req, res, next) {

  const options = {
    appId: config.fb.app_id,
    xfbml: true,
    version: 'v2.6'
  };

  const fb = new FB.Facebook(options);

  const params = {
    access_token: config.fb.access_token 
  };

  fb.api(`/${req.params.id}`, params, (e) => {
    res.json(e);
  });
});

module.exports = router;
