import path from 'path'
import {exists} from 'mz/fs'
import chalk from 'chalk'
import copyTemplate from './copy-template'
import install from './install'
import depToPkg from './dep-to-pkg'
import copy from './copy'

async function nn(argv) {
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
    throw new Error(`no spaces allowed in your project name.`)
  }

  const dir = path.resolve(argv._[0] || '.')
  const name = path.basename(argv._[0] || dir)
  const relativePath = path.relative(process.cwd(), dir)

  if (path.basename(dir) === 'pages') {
    throw new Error('Your root directory is named "pages". This looks suspicious. You probably want to go one directory up.')
  }

  try {
    const present = await exists(dir)
    if (present && !argv.init) {
      throw new Error(`${name} already exists.\n> Maybe you want to ${chalk.cyan('$ nn --init')}?`)
    }

    if (argv.init) {
      const unsafeInit = await exists(path.join(dir, 'package.json'))
      if (unsafeInit && !argv.force) {
        throw new Error(`${chalk.bold(name)} already has a ${chalk.bold('package.json')}, which would be overwritten`)
      }
    }

    await copyTemplate(dir, {name})

    for (const ext in argv) {
      if (availableExtensions.indexOf(ext) >= 0) {
        await depToPkg(ext, dir)
      }
    }

    if (argv.install) {
      await install(dir)
    }

    const shouldChangeDir = (argv.init && present) ? '' : `cd ${relativePath} && `
    const shouldInstall = argv.install ? '' : 'npm install && '
    const getStarted = `${shouldChangeDir}${shouldInstall}npm run dev`
    log(`> created a new next.js project - ${chalk.bold.green(name)}`)
    log(`> to get started run:\n`)
    log(` ${chalk.cyan(`$ ${getStarted}`)}`)
    await copy(getStarted)
    log(chalk.dim(' [copied to clipboard]'))
    return {name}
  } catch (err) {
    console.error(`> ${chalk.red('Error!')} ${err.message}`)
  }
}

export default nn
