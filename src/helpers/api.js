import axios from 'axios';
import { getDomain } from './getDomain';
/**
 *  api used when page doesn't require the user to be logged in
 */
export const api = axios.create({
  baseURL: getDomain(),
  headers: {
    'Content-Type': 'application/json',
  }
});
/**
  * api used when authentication is required to visit a page
  */
export const authApi = () => {
  const token = JSON.parse(localStorage.getItem('user')).jwt;
  if (token == null) { throw "Token is null. Store the token in localstorage as 'user.jwt'."; }
  try {
    return axios.create({
      baseURL: getDomain(),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
  } catch (e) {
    throw "Token is invalid"
  }
}


export const handleError = error => {
  const response = error.response;

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    let info = `\nrequest to: ${response.request.responseURL}`;

    if (response.data.status) {
      info += `\nstatus code: ${response.data.status}`;
      info += `\nerror: ${response.data.error}`;
      info += `\nerror message: ${response.data.message}`;
    } else {
      info += `\nstatus code: ${response.status}`;
      info += `\nerror message:\n${response.data}`;
    }

    console.log('The request was made and answered but was unsuccessful.', error.response);
    return info;
  }
};
