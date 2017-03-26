const { exec } = require('child_process');
const ora = require('ora');

module.exports = dir =>
  new Promise((resolve, reject) => {
    const spinner = ora(`Installing npm dependencies`).start();
    const cmd = 'npm install';
    exec(cmd, { cwd: dir, stdio: 'ignore' }, err => {
      if (err) {
        reject(err);
      }
      spinner.stop();
      resolve();
    });
  });
