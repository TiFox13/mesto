export default class Api {
    constructor(options) {

    }
    getUserInfo() {
      fetch('https://nomoreparties.co/v1/cohort-54/users/532cb979-197b-4764-a60b-369a0c33ba6e')  //id когорты и "me" надо заменить на свою когорту и свой ТОКЕН
      .then(res => {
        if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      })
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
    }



    getInitialCards() {
        fetch('https://mesto.nomoreparties.co/v1/cohort-54/cards')
        .then(res => res.json())
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        }); 
    }
}