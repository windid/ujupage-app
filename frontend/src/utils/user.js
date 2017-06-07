import store from 'store'

export function requireLogin (promiseCreator) {
  return promiseCreator().catch(err => {
    if (err.status === 401) {
      return new Promise(resolve => {
        store.watch(state => state.user.current, val => {
          val && resolve(promiseCreator())
        })
      })
    }
  })
}
