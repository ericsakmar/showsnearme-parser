const config = require('../config');

const auth = {
  mustBe: function() {
    const roles = Array.from(arguments);

    return function(req, res, next) {

      if (config.env === 'development') {
        next();
      }
      else {

        const key = req.headers.authorization;

        const authorized = process.env.API_TOKEN === key;

        if (authorized) {
          next();
        }
        else {
          res.status(401).json({msg:'Unauthorized'});
        }

      }
    }
  }
}

module.exports = auth;
