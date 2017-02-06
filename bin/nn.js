#!/usr/bin/env node
import args from 'args'
import nn from '../lib/'

// const argv = parseArgs(process.argv.slice(2), {
//   alias: {
//     h: 'help',
//     i: 'install',
//     s: 'silent'
//   },
//   boolean: ['h', 'install', 'force', 'init', 'silent', 'debug']
// })
args
  .option('install', 'Install all dependencies', false)
  .option('silent', 'ssshhhhhhh!', false)
  .option('init', 'Initialize a Next Project in the current folder', false)
  .option('force', 'Force init', false)
  .option('debug', 'Debugging', false)
const flags = args.parse(process.argv)

try {
  nn(flags, args.sub[0])
} catch (err) {
  process.exit(0)
}
