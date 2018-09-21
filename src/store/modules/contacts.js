import {CREATE_CONTACT, DELETE_CONTACT, SET_CONTACTS, UPDATE_CONTACT} from '@/store/mutation-types'
import {checkResponse, postRequest} from '@/api/base';
import * as ApiContacts from "@/api/modules/contacts";

export const OBJECT_TYPE = 'Contact';
export const COLUMNS = ["Id", "GivenName", "Surname", "BirthDate", "ModifiedOn"];

const state = {
  columns: COLUMNS,
  contacts: []
};

const getters = {};

const mutations = {
  [SET_CONTACTS]: (state, payload) => {
    state.contacts = payload
  },
  [CREATE_CONTACT]: (state, payload) => {
    state.contacts.push(payload)
  },
  [UPDATE_CONTACT]: (state, payload) => {
    let index = state.contacts.findIndex(item => {
      return item.id === payload.id
    });
    state.contacts.splice(index, 1, payload)
  },
  [DELETE_CONTACT]: (state, payload) => {
    let index = state.contacts.findIndex(item => {
      return item.id === payload.id
    });
    state.contacts.splice(index, 1)
  }
};

const actions = {
  loadContacts({commit, rootState}) {
    ApiContacts.loadContacts()
      .then((response) => {
        commit(SET_CONTACTS, response.data.resultCollection)
      })
  },
  createContact({commit}, payload) {
    ApiContacts.createContact(payload)
      .then((response) => {
        checkResponse(response, 'Контакт успешно создан!') && this.dispatch('loadContacts');
      });

  },
  updateContact({commit}, payload) {
    ApiContacts.updateContact(payload)
      .then((response) => {
        checkResponse(response, 'Контакт успешно обновлен!') && this.dispatch('loadContacts');
      })
  },
  deleteContact({commit}, payload) {
    ApiContacts.deleteContact(payload)
      .then((response) => {
        checkResponse(response, 'Контакт успешно удален!') && this.dispatch('loadContacts');
      })
  },
  runProcess({commit}, payload) {
    ApiContacts.runProcess(payload)
      .then((response) => {
        checkResponse(response, 'Бизнес процесс был успешно запущен! ' + (payload.objectId ? ('Id объекта ' + payload.objectId) : ''));
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
