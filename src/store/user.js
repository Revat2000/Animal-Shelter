/* eslint-disable no-unused-vars */
import firebase from 'firebase/app'


export default {
  state: {
    user: {
        isAuthentificated: false,
        uid: null
    }
  },
  mutations: {
      SET_USER(state, payload){
          state.user.isAuthentificated = true
          state.user.uid = payload
      },
      UNSET_USER(state){
        state.user = {
            isAuthentificated: false,
            uid: null
        }
      }
  }, 
  actions: {
    //   регистрация нового пользователя
    SIGNUP({commit}, payload){
        commit('SET_PROCESSING', true)
        commit('CLEAR_ERROR')
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
            commit('SET_PROCESSING', false)
        })
        .catch((error) => {
            commit('SET_PROCESSING', false)
            commit('SET_ERROR', error.message)
        });
    },
    //  залогинивание
    SIGNIN({commit}, payload){
        commit('SET_PROCESSING', true)
        commit('CLEAR_ERROR')
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
            commit('SET_PROCESSING', false)
        })
        .catch((error) => {
            commit('SET_PROCESSING', false)
            commit('SET_ERROR', error.message)
        });
    },
    // выход
    SIGNOUT(){
        firebase.auth().signOut()
    },
    STATE_CHANGED({commit}, payload){
        if (payload) {
            commit('SET_USER', payload.uid)
        } else {
            commit('UNSET_USER')
        }
    }
  },
  getters: {
    isUserAuthentificated: (state) => state.user.isAuthentificated
  }
}