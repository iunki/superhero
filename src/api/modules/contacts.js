import {postRequest} from "@/api/base";
import {getMockData} from "@/api/mock"
import store from "@/store"
import {OBJECT_TYPE} from "@/store/modules/contacts"

const debug = false;
const successPromise = new Promise(resolve => resolve({data: {errorCode: 0}}));

function loadContacts(params) {
  return debug ? getMockData('contacts') :
    postRequest(
      'readMultiple',
      {
        filterConnector: {},
        sortRules: [
          {
            name: "ModifiedOn",
            sortDirection: "DESC"
          }
        ],
        columnSet: store.state.contacts.columns,
        objectType: OBJECT_TYPE,
        userId: store.state.user.user.userId
      });
}

function createContact(params) {
  return debug ? successPromise :
    postRequest('create',
      {
        attributesCollection: [{
          name: "GivenName",
          value: params.GivenName,
          type: 'string'
        }, {
          name: "Surname",
          value: params.Surname,
          type: 'string'
        }, {
          name: "BirthDate",
          value: params.BirthDate,
          type: "Edm.DateTime"
        }],
        objectType: OBJECT_TYPE,
        userId: store.state.user.user.userId
      });
}

function updateContact(params) {
  return debug ? successPromise :
    postRequest('update',
      {
        attributesCollection: [{
          name: "GivenName",
          value: params.GivenName,
          type: 'string'
        }, {
          name: "Surname",
          value: params.Surname,
          type: 'string'
        }, {
          name: "BirthDate",
          value: params.BirthDate,
          type: "Edm.DateTime"
        }],
        objectId: params.Id,
        objectType: OBJECT_TYPE,
        userId: store.state.user.user.userId
      })
}

function deleteContact(params) {
  return debug ? successPromise :
    postRequest('delete',
      {
        objectId: params,
        objectType: OBJECT_TYPE,
        userId: store.state.user.user.userId
      });
}

function runProcess(params) {
  return debug ? successPromise :
    postRequest('runprocess',
      {
        objectId: params.objectId,
        processCode: params.processCode,
        parameters: params.parameters,
        objectType: OBJECT_TYPE,
        userId: store.state.user.user.userId
      });
}

export {
  loadContacts,
  createContact,
  updateContact,
  deleteContact,
  runProcess
}
