import {SET_ARTICLES} from "@/store/mutation-types";
import * as ApiDocumentation from "@/api/modules/documentation";

const state = {
  articles: []
};

const getters = {
  getArticleById: (state) => (id) => {
    id = Number(id);
    return id ? state.articles.find((item) => item.id === id) : null;
  }
};

const mutations = {
  [SET_ARTICLES]: (state, payload) => {
    state.articles = payload
  }
};

const actions = {
  loadDocumentation({commit}) {
    ApiDocumentation.loadDocumentation(null).then((response) => {
      commit(SET_ARTICLES, response.data)
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
