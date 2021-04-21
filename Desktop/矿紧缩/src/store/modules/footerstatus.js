const state = {
  showFooter : true,
  changeNum : 0,
}

//是不是很像data里面的数据
//只不过我们只是把它提取出来赋值给state


// state获取数据
const getters = {
  isShow (state) {
    return state.showFooter
  },
  getChangeNum (state) {
    return state.changeNum
  }
}

// 修改数据（同步任务）
const mutations = {
  show (state) {
    state.showFooter = true
  },
  hide (state) {
    state.showFooter = false
  },
  newNum (state, sum) {
    state.changeNum += sum
  }
}

// 修改状态 (异步任务)
const actions = {
  hideFooter (context) {
    context.commit('hide')
  },
  showFooter ({commit}){
    commit('show')
  },
  getNum ({commit}, num) {
    commit('newNum', num)
  }

}

export default {
  namespaced : true , //进行多模块处理
  state,
  getters,
  mutations,
  actions

}











