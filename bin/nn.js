#!/usr/bin/env node
import args from 'args'
import nn from '../lib/'

args
  .option('install', 'Install all dependencies', false)
  .option('silent', 'ssshhhhhhh!', false)
  .option(['t', 'init'], 'Initialize a Next Project in the current folder', false)
  .option('force', 'Force init', false)
  .option('debug', 'Debugging', false)

const flags = args.parse(process.argv, {value: '<projectName>'})

try {
  nn(flags, args.sub[0])
} catch (err) {
  process.exit(0)
}
