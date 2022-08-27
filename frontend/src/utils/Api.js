export class Api {
  constructor(config) {
    this.baseURL = config.baseURL
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getProfile(token) {
    console.log('TOKEN', token);
    return fetch(`${this.baseURL}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  }

  getInitialCards(token) {
    return fetch(`${this.baseURL}/cards`, {
      headers: {
        authorization: `Bearer ${token}`
      },
    })
      .then(this._checkResponse);
  }

  editProfile({ name, about }, token) {
    return fetch(`${this.baseURL}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(this._checkResponse);
  }

  addCard({ name, link }, token) {
    return fetch(`${this.baseURL}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id, token) {
    return fetch(`${this.baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  deleteLike(id, token) {
    return fetch(`${this.baseURL}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  addLike(id, token) {
    return fetch(`${this.baseURL}/cards/likes/${id}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  updateAvatar(avatar, token) {
    return fetch(`${this.baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    } else {
      return this.deleteLike(id);
    }
  }
}

export const api = new Api({
  // baseURL: 'http://localhost:3001',
  baseURL: 'http://api.tritonanta.nomorepartiesxyz.ru',
})
