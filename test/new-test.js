import test from 'ava'
import rimraf from 'rimraf'
import temp from 'temp'
import cli from '../dist/lib/'

const tmpName = 'my-new-blog'

let origCwd
let tmpDir
test.before(() => {
  origCwd = process.cwd()
  tmpDir = temp.mkdirSync('next-new')
  process.chdir(tmpDir)
})

test('create a new project with errors', async t => {
  try {
    await cli({
      silent: true
    }, tmpName)
    await cli({
      silent: true
    }, tmpName)
  } catch (err) {
    const errMessage = err.split('\n')[0]
    t.is(errMessage, `${tmpName} already exists.`)
  }
})

test('create a new project without errors', async t => {
  const project = await cli({
    silent: true
  }, tmpName)
  t.is(project.name, tmpName)
})

test('SKIP_WATCH create a new project and npm install', async t => {
  const project = await cli({
    install: true,
    silent: true
  }, tmpName)
  t.is(project.name, tmpName)
})

test.after.always('cleanup', () => {
  process.chdir(origCwd)
  rimraf(tmpDir, () => {
    return
  })
})
