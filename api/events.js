const config = require('../config'),
  FB = require('fb');

function getFbEvent(id) {
  return new Promise((resolve, reject) => {

    FB.options({
      appId: config.fb.app_id,
      xfbml: true,
      version: 'v2.6'
    });
    
    const params = {
      access_token: config.fb.access_token,
      fields: 'name,description,category,cover,start_time,end_time,owner,place'
    };

    FB.api(`/${id}`, params, (event, err) => {
      if (err) {
        reject(err);
      } 
      else {
        resolve(event);
      }
    });

  });
};

module.exports = { getFbEvent };
