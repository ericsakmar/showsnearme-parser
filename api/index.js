var express = require('express'),
    router = express.Router(),
    Message = require('../models/message');

router.get('/:id', function(req, res, next) {
  const e = {
    msg: 'ok'
  };

  res.json(e);
});

module.exports = router;
