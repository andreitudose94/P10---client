import { createStore, applyMiddleware } from 'redux'
import appRouter from '../reducers/index.js'

import translations from '../lib/translations'

const persistedState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if(serializedState === null) {
      return {
        intl: translations['ro']
      }
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

const saveState = (state = {}) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // Ignore write errors
    console.log('err', err);
  }
}

const logger = ({ getState }) => {
  return next => action => {

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

const store = createStore(
  appRouter,
  persistedState(),
  applyMiddleware(logger)
)

store.subscribe(() => {
  saveState(store.getState())
})

// Set globals

global.store = store

global.dispatch = (type, payload) => {

  if (type.type) {
    return Promise.resolve(store.dispatch(type))
  } else {
    return Promise.resolve(store.dispatch({type, payload}))
  }
};

global.getState = () => store.getState()

export default store
