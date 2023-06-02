export default
  class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
      this._autoriz = options.headers.authorization;
    }

  _responseMethod(res) {
    if (res.ok) {
      return res.json()
    } else {
      Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        authorization: this._autoriz
      }
    })
    .then((res) => this._responseMethod(res));
  }

  setCardOnServ = (data) => {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        authorization: this._autoriz
      }
    })
    .then((res) => this._responseMethod(res));
  }

  getAuthorInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: this._autoriz
      }
    })
    .then((res) => this._responseMethod(res));
  }
  setAuthorInfo = (data) => {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.description
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: this._autoriz
      }
    })
    .then((res) => this._responseMethod(res));
  }
  setAuthorAvatar = (data) => {
    return fetch(this._baseUrl + '/users/me/avatar ', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.link
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: this._autoriz
      }
    })
    .then((res) => this._responseMethod(res));
  }

  setLike = (dataId) => {
    return fetch(this._baseUrl + '/cards/' + `${dataId}` + '/likes', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        authorization: this._autoriz
      }
    })
    .then((res) => this._responseMethod(res));
  }

  deleteLike = (cardId) => {
    return fetch(this._baseUrl + '/cards/' + `${cardId}` + '/likes', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        authorization: this._autoriz
      }
    })
    .then((res) => this._responseMethod(res));
  }

  deleteCard(data) {
    return fetch(this._baseUrl + '/cards/' + `${data}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        authorization: this._autoriz
      }
    })
    .then((res) => this._responseMethod(res));
  }
}
