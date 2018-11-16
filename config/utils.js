
/**
 * 将dd.httpRequest 封装成promise
 * @param {function} ddFn 钉钉的同步api
*/

export const ddPromise = ddFn => (obj = {}) => {
  return new Promise((resolve, reject) => {
    obj.success  = res => resolve(res)
    obj.fail = err => {
      console.error('error ---> ', err)
      reject(err)
    }
    ddFn.call(dd, obj)
  })
}

