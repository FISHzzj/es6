//数据状态
const state = {
  collects : [], //初始化一个collects 数组

}

//类似于 computed 属性
// get 获取状态
const getters = {
  renderCollects (state) {
    return state.collects
  }

}
//同步更新 状态
const mutations = {
  pushCollects (state, items) {
    state.collects.push(items)
  }
}

//异步更新 状态

const actions = {
  invokePushItems ({commit}, item) {
    commit('pushCollect', item)
  }
}

export default {
  namespaced : true,
  state,
  getters,
  mutations,
  actions,
}



























