import Vue from 'vue'
import Vuex from 'vuex'
import userModule from '../store/user'
import jeneralModule from '../store/jeneral'
import dogsModule from '../store/dogs'

Vue.use(Vuex)

export default new Vuex.Store({
 modules: {
  userModule,
  jeneralModule,
  dogsModule
 }
})
