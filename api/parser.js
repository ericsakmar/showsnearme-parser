"use strict";
const metaget = require('metaget');

function findLinks(d) {

  return new Promise((resolve, reject) => {
    const regex = /http\S*(?=\s)/g;

    const matches = [];
    var match;

    while (match = regex.exec(d)) {
      matches.push(match[0]);
    }

    resolve(matches);
  });

}

function findMetas(links) {
  const promises = links
    .filter(link => link.indexOf('bandcamp') != -1)
    .map(link => {
    return new Promise((resolve, reject) => {
      metaget.fetch(link, (err, metas) => {
        if (err) {
          // ignoring fetch errors
          resolve(null);
        }
        else {
          resolve(metas);
        }
      });
    });
  });
  
  return Promise.all(promises);
}

/*
 * other ideas for this one:
 *  - scan text for known band names
 *  - use data from earlier posts
 */
function findBandInfo(data) {
  return new Promise((resolve, reject) => {

    const bands = data.map(meta => {
      let band = {
        name: meta['og:site_name'],
        description: meta['Description'],
        image: meta['og:image'],
        url: meta['og:url']
      };

      if (meta['og:video']) {
        band.embed = {
          url: meta['og:video'],
          width: meta['og:video:width'],
          height: meta['og:video:height']
        };
      }

      return band;
    });

    resolve(bands);
  });
}

function findTags(data) {
  return new Promise((resolve, reject) => {
    let tags = [];

    // category
    if (data.category) {
      tags.push(data.category);
    }

    if (data.place) {
      // place
      if (data.place.name) {
        tags.push(data.place.name);
      }

      // city
      if (data.place.location) {
        if (data.place.location.city && data.place.location.state) {
          tags.push(`${data.place.location.city} ${data.place.location.state}`);
        }
      }
    }

    // bands
    tags = tags.concat(data.bands.map(band => band.name));

    // more ideas...
    //  genres

    resolve(tags);
  });
}

module.exports = { findLinks, findMetas, findBandInfo, findTags };
