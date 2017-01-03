import {copy as _copy} from 'copy-paste'

const copy = text => new Promise((resolve, reject) => {
  _copy(text, err => {
    if (err) {
      return reject(err)
    }
    resolve()
  })
})
export default copy
