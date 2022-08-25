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
    return fetch(`${this.baseURL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  getInitialCards(token) {
    return fetch(`${this.baseURL}/cards`, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse);
  }

  editProfile({ name, about }, token) {
    return fetch(`${this.baseURL}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
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
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
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
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  deleteLike(id, token) {
    return fetch(`${this.baseURL}/cards/likes/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  addLike(id, token) {
    return fetch(`${this.baseURL}/cards/likes/${id}`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  updateAvatar(avatar, token) {
    return fetch(`${this.baseURL}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
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
  baseURL: 'https://api.tritonanta.nomoredomains.sbs',
})
