export default class Api {
    constructor(object) {
     this._url = object.url;   //https://mesto.nomoreparties.co/v1/cohort-54
      this._headers = object.headers;
    }

 
// РАБОТАЕТ
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "GET",   //можно не писать, но пока напишу
    })
      .then ((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch ((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }


  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "GET",   //можно не писать, но пока напишу
      })
      .then ((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch ((error) => {
        console.log(error); // выведем ошибку в консоль
      })
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
      .then ((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch ((error) => {
        console.log(error); // выведем ошибку в консоль
      })
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
    .then ((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch ((error) => {
      console.log(error); // выведем ошибку в консоль
    })
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
    .then ((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch ((error) => {
      console.log(error); // выведем ошибку в консоль
    })
    }

    // РАБОТАЕТ
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then ((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch ((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }

// РАБОТАЕТ
  putLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    })
      .then ((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }
    

// РАБОТАЕТ
  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: "delete",
    })
      .then ((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch ((error) => {
        console.log(error); // выведем ошибку в консоль
      })
  }
}