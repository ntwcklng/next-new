import path from 'path'
import {exists} from 'mz/fs'
import chalk from 'chalk'
import copyTemplate from './copy-template'
import install from './install'
import depToPkg from './dep-to-pkg'
import copy from './copy'

async function nn(flags, projectName) {
  const availableExtensions = [
    'glamor',
    'styled-components',
    'preact',
    'inferno'
  ]
  const log = flags.silent ? function () {} : console.log
  const logDebug = text => flags.debug && console.log(chalk.dim(`> ${chalk.green('DEBUG')} - ${text}`))

  // if (projectName.length > 1) {
  //   throw new Error(`no spaces allowed in your project name.`)
  // }

  const dir = path.resolve(projectName || '.')
  const name = path.basename(projectName || dir)
  const relativePath = path.relative(process.cwd(), dir)

  if (path.basename(dir) === 'pages') {
    throw new Error('Your root directory is named "pages". This looks suspicious. You probably want to go one directory up.')
  }

  try {
    const present = await exists(dir)
    if (present && !flags.init) {
      throw new Error(`${name} already exists.\n> Maybe you want to ${chalk.cyan('$ nn --init')}?`)
    }

    if (flags.init) {
      const unsafeInit = await exists(path.join(dir, 'package.json'))
      if (unsafeInit && !flags.force) {
        throw new Error(`${chalk.bold(name)} already has a ${chalk.bold('package.json')}, which would be overwritten`)
      }
    }
    logDebug(`Copy template to ${relativePath}`)
    await copyTemplate(dir, {name})

    for (const ext in flags.deps) {
      if (availableExtensions.indexOf(ext) >= 0) {
        logDebug(`Add ${ext} to ${relativePath}/package.json`)
        await depToPkg(ext, dir)
      }
    }

    if (flags.install) {
      logDebug('Installing npm dependencies')
      await install(dir)
    }

    const shouldChangeDir = (flags.init && present) ? '' : `cd ${relativePath} && `
    const shouldInstall = flags.install ? '' : 'npm install && '
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
