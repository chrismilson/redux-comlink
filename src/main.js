import { proxy } from 'comlink'

/**
 * When given a remote store (from a worker with comlink's *wrap* method) This
 * will provide a store object that will follow the remote store while also
 * providing the same synchronous interaction that redux expects from getState.
 *
 * @param {*} remoteStore
 */
export async function remoteStoreWrapper (remoteStore) {
  const subscribers = new Set()

  let latestState = await remoteStore.getState()

  remoteStore.subscribe(
    proxy(async () => {
      latestState = await remoteStore.getState()
      subscribers.forEach(f => f())
    })
  )
  return {
    dispatch: action => remoteStore.dispatch(action),
    getState: () => latestState,
    subscribe (listener) {
      subscribers.add(listener)
      return () => subscribers.delete(listener)
    }
  }
}
