export class Api {
    constructor({adress, token, cohortId}) {
        this._token = token;
        this._adress = adress;
        this._cohortId = cohortId;
    }

    addCard(name, link) {
        return fetch(`${this._adress}/v1/${this._cohortId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
    })
    }

    deleteCard(id) {
        return fetch(`${this._adress}/v1/${this._cohortId}/cards/${id}`, {
            method: "DELETE",
            headers: {
                authorization: this._token
              }
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
    })
    }
        

    getCards() {
        return fetch(`${this._adress}/v1/${this._cohortId}/cards`, {
            headers: {
                authorization: this._token
              }
        }).then((result) => {
            if (!result.ok) {
                return Promise.reject('Server error');
            }
            return result.json();
        }).then((data) => {
            return data;
        }).catch(err => {
            alert(err);
        })
    }

    getUserProfile() {
        return fetch(`${this._adress}/v1/${this._cohortId}/users/me`, {
        method: 'GET',
        headers: {
            authorization: this._token
          },
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  setUserProfile(name, about) {
    return fetch(`${this._adress}/v1/${this._cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: this._token,
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            name,
            about,
        }),
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  clickLike(id) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: this._token,
            'Content-Type': 'application/json',
          }
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteLike(id) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: this._token,
            'Content-Type': 'application/json',
          }
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  

  changeUserAvatar(avatar) {
    return fetch(`${this._adress}/v1/${this._cohortId}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: this._token,
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            avatar
    })
    })
        .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }


}