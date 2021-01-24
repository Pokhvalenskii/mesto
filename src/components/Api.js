export default class Api {
  constructor(date){
    this._urlApi = date.urlApi;
    this._token = date.token; // 8675e632-7ad1-4f28-9202-69cb55994239
    this._groupId = date.groupId; // cohort-19
  }

  getInitialCards() {
    return fetch(`${this._urlApi}${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      }
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getInitialUser() {
    return fetch(`${this._urlApi}${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      }
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  editProfile(name, status) {
    return fetch(`${this._urlApi}${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: status
      })
    })
      .then(res => {
        if(res.ok){
          return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  addCard(name, link) {
    return fetch(`${this._urlApi}${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._urlApi}${this._groupId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  like(cardId) {
    return fetch(`${this._urlApi}${this._groupId}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  removeLike(cardId) {
    return fetch(`${this._urlApi}${this._groupId}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  editAvatar(linkAvatar) {
    return fetch(`${this._urlApi}${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: linkAvatar,
      })
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
}

