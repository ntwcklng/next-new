#!/usr/bin/env node
import parseArgs from 'minimist'
import nn from '../lib/'

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    h: 'help',
    i: 'install',
    s: 'silent'
  },
  boolean: ['h', 'install', 'force', 'init', 'silent']
})

try {
  nn(argv)
} catch (err) {
  process.exit(0)
}
