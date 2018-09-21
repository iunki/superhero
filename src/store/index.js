import Vue from 'vue'
import Vuex from 'vuex'

import documentation from './modules/documentation'
import contacts from './modules/contacts'
import user from './modules/user'

import {SET_ALERT, SET_LOADING} from "@/store/mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    documentation,
    contacts,
    user
  },
  state: {
    loading: false,
    alert: {
      active: false,
      type: null,
      message: null
    },
    settings: {
      mock: true
    }
  },
  mutations: {
    [SET_LOADING]: (state, payload = false) => {
      state.loading = payload;
    },
    [SET_ALERT]: (state, payload) => {
      state.alert = payload
    }
  },
  actions: {
    showPreLoader: ({commit}, payload = false) => {
      commit(SET_LOADING, payload)
    },
    showAlertMessage: ({commit}, payload) => {
      commit(SET_ALERT, {
        active: !!payload,
        type: payload ? payload.type : null,
        message: payload ? payload.message : null
      });
    }
  },
  getters: {
    getLoadingState: (state) => state.loading,
    getAlert: (state) => state.alert,
  }
});
