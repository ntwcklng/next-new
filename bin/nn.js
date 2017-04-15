#!/usr/bin/env node
const path = require('path')
const args = require('args')
const updateNotifier = require('update-notifier')
const asyncToGen = require('async-to-gen/register')
const isAsyncSupported = require('is-async-supported')
const nodeVersion = require('node-version')
const pkg = require('../package.json')

updateNotifier({ pkg }).notify()

if (nodeVersion.major < 6) {
  console.error(
    `Error! next-new requires at least version 6 of Node. Please upgrade!`
  )
  process.exit(1)
}

args
  .option('install', 'Install all dependencies', false)
  .option('silent', 'ssshhhhhhh!', false)
  .option('init', 'Initialize a Next Project in the current folder', false)
  .option('force', 'Force init', false)
  .option('debug', 'Debugging', false)
  .example(
    'nn my-project --install',
    'Creates a new Next.js Project and installs all dependencies'
  )

const flags = args.parse(process.argv, {
  value: '<projectName>',
  mainColor: 'blue',
  subColor: ['dim', 'gray']
})

if (!isAsyncSupported()) {
  // Support for keywords "async" and "await"
  const pathSep = process.platform === 'win32' ? '\\\\' : '/'
  const directoryName = path.parse(path.join(__dirname, '..')).base

  asyncToGen({
    includes: new RegExp(`.*${directoryName}?${pathSep}(lib|bin).*`),
    excludes: null,
    sourceMaps: false
  })
}
require('../lib/')(flags, args.sub[0])
