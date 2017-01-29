const config = require('../config'),
  FB = require('fb');

function getFbEvent(id) {
  return new Promise((resolve, reject) => {

    FB.options({
      appId: config.fb.app_id,
      xfbml: true,
      version: 'v2.8'
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

function getFeed(pageId) {
  return new Promise((resolve, reject) => {

    FB.options({
      appId: config.fb.app_id,
      xfbml: true,
      version: 'v2.8'
    });

    const params = {
      access_token: config.fb.access_token,
      fields: 'type,object_id'
    };

    FB.api(`/${pageId}/feed`, params, (feed, err) => {
      if (err) {
        reject(err);
      } 
      else {
        resolve(feed.data);
      }
    });
    
  });
}

module.exports = { getFbEvent, getFeed };
