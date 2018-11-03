import { connect } from '@tarojs/redux'
import { createLogger } from 'redux-logger'
import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import models from './model'

const loadingPlugin = createLoadingPlugin({asNumber: true})

const store = init({
  initialState: {},
  models,
  redux: {
    reducers: {},
    middlewares: [createLogger()]
  },
  plugins: [loadingPlugin],
  onError (e, dispatch) {
    dispatch({type: 'sys/error', payload: e})
  }

})

const dispatch = store.dispatch
export { connect, dispatch }
export default store
