#!/usr/bin/env node
import parseArgs from 'minimist'
import chalk from 'chalk'
import nn from '../lib/'

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    h: 'help',
    i: 'install',
    s: 'silent'
  },
  boolean: ['h', 'install', 'force', 'init', 'silent']
})
Promise.resolve()
.then(async () => {
  await nn(argv)
}).catch(err => {
  console.error(`> ${chalk.red('Error!')} ${err}`)
  process.exit(1)
})
