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
      credentials: 'include',
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
        // authorization: `Bearer ${localStorage.getItem('jwt')}`
        // authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(this._checkResponse);
  }

  getInitialCards(token) {
    console.log('TOKEN', token);
    return fetch(`${this.baseURL}/cards`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`
        // authorization: `Bearer ${localStorage.getItem('jwt')}`
        // authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(this._checkResponse);
  }

  editProfile({ name, about }, token) {
    console.log('TOKEN', token);
    return fetch(`${this.baseURL}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        // authorization: `Bearer ${localStorage.getItem('jwt')}`,
        // authorization: `Bearer ${localStorage.getItem('token')}`,
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
    console.log('TOKEN', token);
    return fetch(`${this.baseURL}/cards`, {
      credentials: 'include',
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        // authorization: `Bearer ${localStorage.getItem('jwt')}`,
        // authorization: `Bearer ${localStorage.getItem('token')}`,
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
        authorization: `Bearer ${token}`,
        // authorization: `Bearer ${localStorage.getItem('jwt')}`,
        // authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  deleteLike(id, token) {
    return fetch(`${this.baseURL}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
        // authorization: `Bearer ${localStorage.getItem('jwt')}`,
        // authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  addLike(id, token) {
    return fetch(`${this.baseURL}/cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
        // authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
    }).then(this._checkResponse);
  }

  updateAvatar(avatar, token) {
    return fetch(`${this.baseURL}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
        // authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked, token) {
    console.log('id', id);
    if (isLiked) {
      return this.addLike(id, token);
    } else {
      console.log(this.deleteLike(id, token));
      return this.deleteLike(id, token);
    }
  }
}

export const api = new Api({
  baseURL: 'http://localhost:3001',
  // baseURL: 'http://api.tritonanta.nomorepartiesxyz.ru',
})
