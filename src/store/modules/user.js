import {RESET_USER, SET_TOKEN, SET_USER} from "@/store/mutation-types";
import * as ApiUser from "@/api/modules/user";

const state = {
  user: {
    userId: null,
    username: null,
    roles: [],
    start: null,
    finish: null,
    access_token: null,
  }
};

const getters = {
  checkToken:
    (state) => {
      return !!window.$cookies.get('access_token') || !!state.user.access_token;
    }
};

const mutations = {
  [SET_USER]: (state, payload) => {
    state.user = {
      userId: payload.userId,
      username: payload.username,
      roles: payload.roles,
      start: payload.start,
      finish: payload.finish,
      access_token: payload.access_token,
    }
  },
  [RESET_USER]: (state) => {
    state.user = {
      userId: null,
      username: null,
      roles: [],
      start: null,
      finish: null,
      access_token: null,
    }
  },
  [SET_TOKEN]: (state, payload) => {
    state.user.access_token = payload;
  }
};

const actions = {
  signUserUp({commit}, payload) {
    return ApiUser.signUpIn(payload).then((response) => {
      if (response.data.hasOwnProperty('access_token')) {
        commit(SET_USER, response.data);
        this.dispatch('saveTokenToCookies', response.data.access_token);

        return true;
      }
      return false;
    })
  },
  signUserIn({commit}, payload) {
    return ApiUser.signUserIn(payload)
      .then((response) => {
        if (response.data.hasOwnProperty('access_token')) {
          commit(SET_USER, response.data);
          this.dispatch('saveTokenToCookies', response.data.access_token);

          return true;
        }
        return false;
      })
  },
  logUserOut({commit}) {
    commit(RESET_USER);
    return {success: true}
  },
  reloadTokenFromCookies({commit}) {
    let token = window.$cookies.get('access_token');
    if (token) commit(SET_TOKEN, token);
  },
  saveTokenToCookies({commit}, payload) {
    if (payload) window.$cookies.set('access_token', payload, "42d");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
