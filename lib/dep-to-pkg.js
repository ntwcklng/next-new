import path from 'path'
import fs from 'fs'

const depToPkg = (ext, dir) => new Promise(async resolve => {
  const pkgPath = path.join(dir, 'package.json')
  const pkg = await fs.readFileSync(pkgPath, 'utf-8')
  const _pkg = JSON.parse(pkg)
  _pkg.dependencies[ext] = 'latest'
  await fs.writeFileSync(pkgPath, JSON.stringify(_pkg, null, 2))
  resolve()
})

export default depToPkg
