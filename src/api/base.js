import axios from 'axios'
import store from '@/store'
import router from '@/router'

const url = 'http://188.120.238.74:8081/api/v1/';

let processError = (error) => {
  store.dispatch('showPreLoader', false);
  let message = checkAccess(error.response);

  store.dispatch('showAlertMessage', {
    type: 'error',
    message: message ? message : ('Произошла ошибка. Код: ' + error.response.status + '<br>' + JSON.stringify(error.response.data))
  });

  throw error;
};

let checkAccess = (response) => {
  let message;

  switch (response.status) {
    case 401:
      message = 'Необходима авторизация!';
      router.push('/user/auth');
      break;

    case 403:
      message = 'Доступ к данной странице запрещен!';
      break;

    default:
      message = '';
      break;
  }

  return message;
};

function getRequest(method = null) {
  store.dispatch('showPreLoader', true);

  axios.defaults.headers.common['Authorization'] = 'Bearer ' +store.state.user.user.access_token;

  return axios.get(url + method)
    .then((response) => {
      store.dispatch('showPreLoader', false);

      return response;
    })
    .catch(processError)
}

function postRequest(method = null, payload = {}) {
  store.dispatch('showPreLoader', true);

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.user.user.access_token;

  return axios.post(url + method, payload)
    .then((response) => {
      store.dispatch('showPreLoader', false);

      return response;
    })
    .catch(processError);
}

function checkResponse(response, successMessage = null, errorMessage = null) {
  successMessage = successMessage || 'Операция прошла успешна!';
  errorMessage = errorMessage || 'Произошла ошибка!';

  store.dispatch('showAlertMessage', {
    type: response.data.errorCode === 0 ? 'success' : 'error',
    message: response.data.errorCode === 0 ? successMessage : errorMessage + '<br>' + response.data.errorMessage
  });

  return response.data.errorCode === 0;
}

export {
  getRequest,
  postRequest,
  checkResponse
}
