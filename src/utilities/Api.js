import axios from 'axios';
import { setToken, getToken, readToken, clearToken, validateToken } from './AuthService';
import { MakeCancelable } from "./CancelablePromise";

const TOKEN_NAME = 'access_token';
const END_POINT = 'http://ipath_backend.test/api';

var instance = axios.create({
	baseURL: END_POINT,
	headers: { common: { Authorization: `Bearer ${getToken(TOKEN_NAME)}` } }
});

registerInterceptor(instance);

function registerInterceptor(instance) {
  	instance.interceptors.response.use(
	    function(response) {
	      // Success
	      return Promise.resolve(response.data);
	    },
	    function(error) {
	      // Do something with response error
	      	if (error.response) {
		        // The request was made and the server responded with a status code
		        return Promise.reject({
		          data: error.response.data,
		          status: error.response.status,
		          statusText: error.response.statusText
		        });
	      	} else if (error.request) {
		        // The request was made but no response was received
		        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		        // http.ClientRequest in node.js
		        return Promise.reject({
		          data: "",
		          status: 0,
		          statusText: "No Response"
		        });
	      	} else {
		        // Something happened in setting up the request that triggered an Error
		        return Promise.reject({
		          data: "",
		          status: 0,
		          statusText: error.message
		        });
	      	}
	    }
  	);
}

function LoginFunction(data) {
  return instance.post("/admin/login", data).then(response => {
    setToken(TOKEN_NAME, response.meta.access_token);
    instance = axios.create({
      headers: {
        common: { Authorization: `Bearer ${getToken(TOKEN_NAME)}` }
      }
    });
    registerInterceptor(instance);

    return Promise.resolve({ data: readToken(TOKEN_NAME) });
  });
}

function LogoutFunction () {
	clearToken(TOKEN_NAME);
  	return Promise.resolve({ data: { message: "success" } });
}

function isLoggedIn() {
  if (validateToken(TOKEN_NAME)) return readToken(TOKEN_NAME);
  else return false;
}

function Get(url, data) {
	return MakeCancelable(instance.get(url, data));
}

function Delete(url) {
	return MakeCancelable(instance.delete(url));
}

function Post(url, data) {
	return MakeCancelable(instance.post(url, data));
}

export { LoginFunction, isLoggedIn, LogoutFunction, Get, Delete, Post };