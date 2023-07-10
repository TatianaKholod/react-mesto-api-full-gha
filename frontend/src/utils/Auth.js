export const BASE_URL = process.env.REACT_APP_BASE_URL
  ? document.location.protocol + "//" + process.env.REACT_APP_BASE_URL
  : "http://localhost:3000";

const headerJson = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const request = (urlEndPoint, options) => {
  return fetch(BASE_URL + urlEndPoint, options).then(checkResponse);
};

export const register = (email, password) => {
  return request("/signup", {
    method: "POST",
    credentials: "include",
    headers: headerJson,
    body: JSON.stringify({ email, password }),
  });
};

export const autorize = (email, password) => {
  return request("/signin", {
    method: "POST",
    credentials: "include",
    headers: headerJson,
    body: JSON.stringify({ email, password }),
  });
};

export const unAutorize = () => {
  return request("/signin", {
    method: "DELETE",
    credentials: "include",
    headers: headerJson,
  });
};

export const getToken = () => {
  return request("/users/me", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
