export default class Api {
    constructor(object) {
     this._url = object.url;   //https://mesto.nomoreparties.co/v1/cohort-54
      this._headers = object.headers;
    }

    _getResponseData(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`); 
  }  
 
// РАБОТАЕТ
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "GET",   //можно не писать, но пока напишу
    })
    .then ((res) => this._getResponseData(res))
   }


  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "GET",   //можно не писать, но пока напишу
      })
      .then ((res) => this._getResponseData(res))
     
    }

    
      //РАБОТАЕТ
  addNewCard(item) {
    return fetch (`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: item.name,
        link: item.link,
        likes: {}
      })
    })
    .then ((res) => this._getResponseData(res))
    }



//РАБОТАЕТ
  patchUserInfo(item) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    }) 
    .then ((res) => this._getResponseData(res))
    }
   
// РАБОТАЕТ
    patchAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: item.link
      })
    }) 
    .then ((res) => this._getResponseData(res))
    }

    // РАБОТАЕТ
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    })
    .then ((res) => this._getResponseData(res))
  }

// РАБОТАЕТ
  putLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    })
    .then ((res) => this._getResponseData(res))
  }
    

// РАБОТАЕТ
  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: "delete",
    })
    .then ((res) => this._getResponseData(res))
}
}