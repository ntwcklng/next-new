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
