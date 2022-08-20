class Auth {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _handleError(res) {
    return res.ok ? res.json(): Promise.reject(res.status)
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then(res => this._handleError(res))
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email })
    })
      .then(res => this._handleError(res))
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          return res;
        }
      })
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => this._handleError(res))
      .then(res => res.data)
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;
