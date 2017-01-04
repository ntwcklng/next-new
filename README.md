# next-new

# Dev. mode
`$ npm run dev`
`$ npm run test:watch`

# Usage

```
$ nn --help

Description

  Scaffolds a simple project structure to get started quickly

Usage

  $ nn <dir>[,options]
  If no directory is provided the current directory will be used.

Options

  --init          Initialize a new Project is the current directory
  --force         Force init (may overwrite existing files!, must be used with --init)
  --install, -i   Install npm dependencies
  --help, -h      Displays this message
  --silent, -s    ssshhhhhh!
  --debug         print debug messages

Add optional dependencies

  --glamor
  --styled-components
  --preact
  --inferno

Examples

  Create 'my-new-blog', install all dependencies and run in silent mode

  $ nn my-new-blog --install --silent

  Create 'my-new-blog', and add Glamor as a dependency

  $ nn my-new-blog --glamor

```