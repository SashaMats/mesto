export default
  class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
      this._autoriz = options.headers.authorization;
    }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then((res) => this._checkResponse(res));
  }

  setCardOnServ = (data) => {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this._headers
    })
    .then((res) => this._checkResponse(res));
  }

  getAuthorInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then((res) => this._checkResponse(res));
  }
  setAuthorInfo = (data) => {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.description
      }),
      headers: this._headers
    })
    .then((res) => this._checkResponse(res));
  }
  setAuthorAvatar = (data) => {
    return fetch(this._baseUrl + '/users/me/avatar ', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.link
      }),
      headers: this._headers
    })
    .then((res) => this._checkResponse(res));
  }

  setLike = (dataId) => {
    return fetch(this._baseUrl + '/cards/' + `${dataId}` + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => this._checkResponse(res));
  }

  deleteLike = (cardId) => {
    return fetch(this._baseUrl + '/cards/' + `${cardId}` + '/likes', {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._checkResponse(res));
  }

  deleteCard(data) {
    return fetch(this._baseUrl + '/cards/' + `${data}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._checkResponse(res));
  }
}
