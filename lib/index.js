import path from 'path'
import {exists} from 'mz/fs'
import chalk from 'chalk'
import copyTemplate from './copy-template'
import install from './install'
import depToPkg from './dep-to-pkg'

const nn = argv => new Promise((resolve, reject) => {
  const availableExtensions = [
    'glamor',
    'styled-components',
    'preact',
    'inferno'
  ]
  const log = argv.silent ? function () {} : console.log
  if (argv.help) {
    log(`
    ${chalk.dim('Description')}

      Scaffolds a simple project structure to get started quickly

    ${chalk.dim('Usage')}

      $ nn <dir>[,options]
      If no directory is provided the current directory will be used.

    ${chalk.dim('Options')}

      --init          Initialize a new Project is the current directory
      --force         Force init (may overwrite existing files!, must be used with --init)
      --install, -i   Install npm dependencies
      --help, -h      Displays this message
      --silent, -s    ssshhhhhh!

    ${chalk.dim('Examples')}

      Create 'my-new-blog', install all dependencies and run in silent mode

      ${chalk.cyan('$ nn my-new-blog --install --silent')}
    `)
    process.exit(0)
  }
  if (argv._.length > 1) {
    reject(`no spaces allowed in your project name.`)
  }
  const dir = path.resolve(argv._[0] || '.')
  const name = path.basename(argv._[0] || dir)

  if (path.basename(dir) === 'pages') {
    reject('Your root directory is named "pages". This looks suspicious. You probably want to go one directory up.')
  }

  exists(dir)
  .then(async present => {
    if (present && !argv.init) {
      reject(`${name} already exists.\n> Maybe you want to ${chalk.cyan('$ nn --init')}?`)
    }
  })

  return Promise.resolve()
  .then(async () => {
    if (argv.init) {
      const unsafeInit = await exists(path.join(dir, 'package.json'))
      if (unsafeInit && !argv.force) {
        reject(`${chalk.bold(name)} already has a ${chalk.bold('package.json')}, which would be overwritten`)
      }
    }
    await copyTemplate(dir, {name: argv._[0] || 'NEXT.JS'})

    for (const ext in argv) {
      if (availableExtensions.indexOf(ext) >= 0) {
        await depToPkg(ext, dir)
      }
    }
    if (argv.install) {
      await install(dir)
    }
  })
  .then(() => {
    const shouldChangeDir = argv.init ? '' : `cd ${name} && `
    const shouldInstall = argv.install ? '' : 'npm install && '
    log(`> created a new next.js project - ${chalk.bold.green(name)}`)
    log(`> to get started run:\n`)
    log(` ${chalk.cyan(`$ ${shouldChangeDir}${shouldInstall}npm run dev`)}`)
    resolve({name})
  })
})

export default nn
