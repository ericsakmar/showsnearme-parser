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

module.exports = { findLinks, findMetas };
