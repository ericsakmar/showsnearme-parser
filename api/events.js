const config = require('../config'),
  FB = require('fb');

const fbConfig = {
  appId: config.fb.app_id,
  xfbml: true,
  version: 'v2.8'
};


function getFbEvent(id) {
  return new Promise((resolve, reject) => {

    FB.options(fbConfig);
    
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

    FB.options(fbConfig);

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

function getFeedInfo(pageId) {
  return new Promise((resolve, reject) => {

    FB.options(fbConfig);

    const params = {
      access_token: config.fb.access_token,
      fields: 'id,name'
    };

    FB.api(`/${pageId}`, params, (feed, err) => {
      if (err) {
        reject(err);
      } 
      else {
        resolve(feed);
      }
    });
    
  });
}

module.exports = { getFbEvent, getFeed, getFeedInfo };
