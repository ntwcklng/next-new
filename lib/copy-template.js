import path from 'path'
import copyTemplateDir from 'copy-template-dir'

const copyTemplate = (dir, vars) => new Promise((resolve, reject) => {
  const template = path.join(__dirname, '../../templates/next')
  copyTemplateDir(template, dir, vars, err => {
    if (err) {
      reject(err)
    }
    resolve()
  })
})

export default copyTemplate
