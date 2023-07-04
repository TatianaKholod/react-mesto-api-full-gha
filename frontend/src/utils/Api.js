import {BASE_URL} from "./Auth.js";

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(urlEndPoint, options) {
    return fetch(this.baseUrl + urlEndPoint, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request("/cards", {
      headers: this.headers,
    });
  }

  getInitProfile() {
    return this._request("/users/me", {
      headers: this.headers,
    });
  }

  updateProfile(name, job) {
    return this._request("/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    });
  }

  createNewCard(name, link) {
    return this._request("/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  _setLikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  _delLikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._setLikeCard(cardId) : this._delLikeCard(cardId);
  }

  updateAvatar(avatar) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  credentials: 'include', // теперь куки посылаются вместе с запросом
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
