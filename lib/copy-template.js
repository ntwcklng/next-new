const path = require('path')
const copyTemplateDir = require('copy-template-dir')

module.exports = (dir, vars) => new Promise((resolve, reject) => {
  const template = path.join(__dirname, '../templates/next')
  copyTemplateDir(template, dir, vars, err => {
    if (err) {
      reject(err)
    }
    resolve()
  })
})
