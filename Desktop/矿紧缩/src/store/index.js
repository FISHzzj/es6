import Vue from 'vue'
import Vuex from 'vuex'
import footerstatus from './modules/footerstatus'
import collection from './modules/collection'


Vue.use(Vuex)

export default new Vuex.Store({
  modules : {  //这里声明两个模块
    collection,
    footerstatus
  }
})























