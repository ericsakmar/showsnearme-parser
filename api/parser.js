const parser = {

  findLinks(d) {

    const regex = /http\S*(?=\s)/g;

    const matches = [];
    var match;

    while (match = regex.exec(d)) {
      matches.push(match[0]);
    }

    return matches;
  }
  
};

module.exports = parser;
