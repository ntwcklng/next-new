import path from 'path'
import fs from 'fs'
import test from 'ava'
import rimraf from 'rimraf'
import temp from 'temp'
import cli from '../dist/lib/'

let origCwd
let tmpDir
test.before(() => {
  origCwd = process.cwd()
  tmpDir = temp.mkdirSync('next-new')
  process.chdir(tmpDir)
})
test('create a new project with errors', async t => {
  try {
    const project = await cli({
      _: ['i-should-fail'],
      silent: true
    })
    await cli({
      _: [project.name],
      silent: true
    })
  } catch (err) {
    const errMessage = err.split('\n')[0]
    t.is(errMessage, 'i-should-fail already exists.')
  }
})

test('create a new project without errors', async t => {
  const project = await cli({
    _: ['my-new-blog'],
    silent: true
  })
  t.is(project.name, 'my-new-blog')
})
test('create a new project with dependencies', async t => {
  const project = await cli({
    _: ['my-new-blog'],
    silent: true,
    preact: true,
    'styled-components': true
  })
  const cwd = path.join(process.cwd(), 'my-new-blog')
  let pkg = await fs.readFileSync(path.resolve(cwd, 'package.json'), 'utf-8')
  pkg = JSON.parse(pkg)
  t.is(pkg.dependencies.preact, 'latest')
  t.is(pkg.dependencies['styled-components'], 'latest')
  t.is(project.name, 'my-new-blog')
})

test('SKIP_WATCH create a new project and npm install', async t => {
  const project = await cli({
    _: ['my-new-blog'],
    install: true,
    silent: true
  })
  t.is(project.name, 'my-new-blog')
})

test.after.always('cleanup', () => {
  process.chdir(origCwd)
  rimraf(tmpDir, () => {
    return
  })
})
