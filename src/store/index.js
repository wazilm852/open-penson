import Vuex from 'vuex'
import Vue from 'vue'
import userlogin from './userlogin'
import signarea from './signarea'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userlogin,
        signarea
      }
  })