import {postRequest} from "@/api/base";
import {getMockData} from "@/api/mock";

const debug = false;

function signUpIn(params) {
  return new Promise((resolve, reject) => {
    signUserUp(params)
      .then((response) => {
        signUserIn({
          userName: response.data.email,
          password: response.data.password,
          rememberMe: true
        }).then((response) => {
          resolve(response);
        })
      })
      .catch((error) => {
        reject(error);
      });
  })
}

function signUserUp(params) {
  return debug ? getMockData('user') : postRequest('registration', params);
}

function signUserIn(params) {
  return debug ? getMockData('user') : postRequest('token', params);
}

export {
  signUpIn,
  signUserUp,
  signUserIn
}
