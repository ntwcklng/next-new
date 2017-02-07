const {copy} = require('copy-paste')

module.exports = text => new Promise((resolve, reject) => {
  copy(text, err => {
    if (err) {
      return reject(err)
    }
    resolve()
  })
})
