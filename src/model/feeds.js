import Taro from '@tarojs/taro'
import action from '../utils/action'
import delay from '../utils/delay'
import request from '../utils/request'

export default {
  name: 'feeds',
  state: {list: []},
  reducers: {
    save (state, payload) {
      return {...state, ...payload}
    },
    saveMore (state, {payload: list}) {
      return {...state, list: [...state.list, ...list]}
    },
  },
  effects: dispatch => ({

    async search () {
      Taro.showLoading({
        title: '搜索中...',
      })
      try {
        return await dispatch({type: 'feeds/load'})
      } finally {
        Taro.hideLoading()
      }
    },

    async load (payload, rootState) {
      let {data} = await request({url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'})
      await delay(1000)
      dispatch(action('feeds/save', {list: data}))
      setInterval(() => {
        dispatch(action('feeds/save', {list: [...data]}))
      }, 1000)
      return data
      // await dispatch.feeds.save({list: data})
    },
    async loadMore () {
      let {data} = await request({url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'})
      await delay(1000)
      await dispatch.feeds.saveMore(data)
      // await dispatch(action('feeds/saveMore', data))
      return data
    },
  }),
}
