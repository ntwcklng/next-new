const ncp = require('copy-paste');

module.exports = text =>
  new Promise((resolve, reject) => {
    ncp.copy(text, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
