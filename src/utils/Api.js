import { apiConfig } from "./constants";

/**
 * Класс, содержащий все необходимые fetch-запросы к серверу
 */
class Api {
  /**
   * @constructor
   * @param {string} token токен для авторизации на сервере
   * @param {string} myId личный id пользователя, назначенный сервером
   * @param {string} urlServer
   * @param {string} qUsersMe строка для запроса в users/me
   * @param {string} qCards строка для запроса в cards
   * @param {string} qLikes строка для запроса в likes
   * @param {string} qAvatar строка для запроса в avatar
   */
  constructor({ 
    urlServer, qUsersMe, qCards, qLikes, qAvatar, token, myId
  }) {
    this._token = token;
    this._urlServer = urlServer;
    this._qUsersMe = qUsersMe;
    this._qCards = qCards;
    this._qLikes = qLikes;
    this._qAvatar = qAvatar;

    this._urlAuthServer = 'https://auth.nomoreparties.co/';
    this._qLogin = 'signin';
    this._qRegister = 'signup';

    this._tokenAuth = localStorage.getItem('jwt');
    this._myId = myId;
  }

  /**
   * Позволяет получить данные пользователя, необходимые для рендера связанных разделов
   * @returns response данных пользователя
   */
  getUserInfo() {
    return this._handleFetch(
      fetch( this._urlServer + this._qUsersMe, {
        headers: {
          authorization: this._token
        }
      })
    )
  }

  /**
   * Позволяет получить данные обо всех карточках с сервера
   * @returns response начальных карточек
   */
  getInitialCards() {
    return this._handleFetch(
      fetch( this._urlServer + this._qCards, {
        headers: {
          authorization: this._token
        }
      })
    )
  }

  /**
   * Позволяет обновить "Имя" и "О себе" пользователя
   * @param {string} newName 
   * @param {string} newAbout 
   * @returns 
   */
  updateUserData( newName, newAbout ) {
    return this._handleFetch(
      fetch( this._urlServer + this._qUsersMe, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newName,
          about: newAbout
        })
      })
    )
  }

  /**
   * Позволяет отправить данные новой карточки на сервер
   * @param {string} namePlace 
   * @param {string} linkImg 
   * @returns response сервера с данными новой карточки
   */
  addNewCard( namePlace, linkImg ) {
    return this._handleFetch(
      fetch( this._urlServer + this._qCards, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: namePlace,
          link: linkImg
        })
      })
    )
  }

  /**
   * Позволяет удалить по id карточку с сервера
   * @param {string} id 
   * @returns response сервера об удалении
   */
  deleteCard( id ) {
    return this._handleFetch(
      fetch( this._urlServer + this._qCards + id, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
    )
  }

  /**
   * позволяет установить по id карточки лайк пользователя
   * @param {string} id 
   * @returns response сервера с обновленными данными карточки (лайков)
   */
  setLike( id ){
    return this._handleFetch(
      fetch( this._urlServer + this._qCards + id + this._qLikes, {
        method: 'PUT',
        headers: {
          authorization: this._token,
        }
      })
    )
  }

  /**
  * позволяет удалить по id карточки лайк пользователя
  * @param {string} id 
  * @returns response сервера с обновленными данными карточки (лайков)
  */
  deleteLike( id ) {
    return this._handleFetch(
      fetch( this._urlServer + this._qCards + id + this._qLikes, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
    )
  }

  changeLikeCardStatus( id, isLiked ){
    return isLiked
      ? this.deleteLike( id )
      : this.setLike( id )
  }

  /**
   * Позволяет обновить аватар пользователя
   * @param {string} newAvatarUrl 
   * @returns response сервера о смене аватара
   */
  updateAvatar( newAvatarUrl ) {
    return this._handleFetch(
      fetch( this._urlServer + this._qUsersMe + this._qAvatar , {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: newAvatarUrl
        })
      })
    )
  }

  createUser( email, password ){
    return fetch( this._urlAuthServer + this._qRegister, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'password': password,
          'email': email
        })
      }).then( res => {
        return !res.ok
        ? Promise.reject( res )
        : res.json();
      })
      .catch( err => {
        if ( err.status === 400 ){
          console.log( "Палундра! У нас проблемы с запросом к серверу! Вот что мы знаем: некорректно заполнено одно из полей." );
        } else { 
          console.log( "Палундра! У нас проблемы с запросом к серверу! Вот что мы знаем: " + err );
        }
        return Promise.reject();
      })
  }

  
  loginUser( email, password ){
    return fetch( this._urlAuthServer + this._qLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'password': password,
          'email': email
        })
      }).then( res => {
        return !res.ok
        ? Promise.reject( res )
        : res.json();
      })
      .then( res => {
        localStorage.setItem('jwt', res.token);
        this._tokenAuth = res.token;
        return res;
      })
      .catch( err => {
        if ( err.status === 400 ){
          alert( "Палундра! У нас проблемы с запросом к серверу! Вот что мы знаем: не передано одно из полей." );
        } else if( err.status === 401 ){
          alert( "Палундра! У нас проблемы с запросом к серверу! Вот что мы знаем: пользователь с email не найден." );
        } else { 
          alert( "Палундра! У нас проблемы с запросом к серверу! Вот что мы знаем: " + err );
        }
        return Promise.reject();
      })
  }

  checkJWT(){
    return fetch( this._urlAuthServer + this._qUsersMe, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this._tokenAuth }`
      }
    }).then( res => {
      return !res.ok
      ? Promise.reject( res )
      : res.json();
    })
    .catch( err => {
      if ( err.status === 400 ){
        console.log( "Кажется, предыдущая сессия устарели и по ней невозможно авторизоваться. Вот что мы знаем: Токен не передан или передан не в том формате." );
      } else if( err.status === 401 ){
        console.log( "Кажется, предыдущая сессия устарели и по ней невозможно авторизоваться. Вот что мы знаем: Переданный токен некорректен." );
      } else { 
        console.log( "Кажется, вы ранее у вас нет в браузере сохраненной сессии с доступом. Вот что мы знаем: " + err );
      }
      return Promise.reject();
    })
  }

  _handleFetch( fetch ){
    return fetch
      .then( res => {
        return !res.ok
        ? Promise.reject( res.status )
        : res.json();
      })
      .catch( err => {
        alert( "Палундра! У нас проблемы с запросом к серверу! Вот что мы знаем: " + err );
        return Promise.reject();
      })
  }
}

export const api = new Api( apiConfig );