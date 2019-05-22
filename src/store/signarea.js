import vc from 'vue-cookie'
import http from '../components/http.js'

export default {
  state: {
    signarea: vc.get('signarea') ? JSON.parse(vc.get('signarea')) : {},
  },
  mutations: {
    getarea(state, payload) {
      state.signarea = payload
      vc.set('signarea', JSON.stringify(state.signarea))
    },
    deletearea(state,payload){
      state.signarea.splice(payload,1)
      vc.set('signarea', JSON.stringify(state.signarea))
    }
  }
}
