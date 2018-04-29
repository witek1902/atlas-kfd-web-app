import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import excersises from './modules/exercises_module'
import excersises_sections from './modules/exercises_sections_module'
export const store  = new Vuex.Store({
  modules: {
    excersises,
    excersises_sections
  }
})
