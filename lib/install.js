import {exec} from 'child_process'
import ora from 'ora'

const install = dir => new Promise((resolve, reject) => {
  const spinner = ora(`Installing NPM dependencies`).start()
  const cmd = 'npm install'
  exec(cmd, {cwd: dir, stdio: 'ignore'}, err => {
    if (err) {
      reject(err)
    }
    spinner.stop()
    resolve()
  })
})

export default install
