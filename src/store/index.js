import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import dex from './dex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    dex
  }
})
