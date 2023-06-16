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
    token, myId, urlServer, qUsersMe, qCards, qLikes, qAvatar
  }) {
    this._token = token;
    this._urlServer = urlServer;
    this._myId = myId;
    this._qUsersMe = qUsersMe;
    this._qCards = qCards;
    this._qLikes = qLikes;
    this._qAvatar = qAvatar;
  }

  /**
   * Позволяет получить данные пользователя, необходимые для рендера связанных разделов
   * @returns response данных пользователя
   */
  getUserInfo() {
    return fetch( this._urlServer + this._qUsersMe, {
      headers: {
        authorization: this._token
      }
    })
      .then( res => this._handleResponse( res ) )
  }

  /**
   * Позволяет получить данные обо всех карточках с сервера
   * @returns response начальных карточек
   */
  getInitialCards() {
    return fetch( this._urlServer + this._qCards, {
      headers: {
        authorization: this._token
      }
    })
     .then( res => this._handleResponse( res ) )
  }

  /**
   * Позволяет обновить "Имя" и "О себе" пользователя
   * @param {string} newName 
   * @param {string} newAbout 
   * @returns 
   */
  updateUserData( newName, newAbout ) {
    return fetch( this._urlServer + this._qUsersMe, {
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
     .then( res => this._handleResponse( res ) )
  }

  /**
   * Позволяет отправить данные новой карточки на сервер
   * @param {string} namePlace 
   * @param {string} linkImg 
   * @returns response сервера с данными новой карточки
   */
  addNewCard( namePlace, linkImg ) {
    return fetch( this._urlServer + this._qCards, {
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
      .then( res => this._handleResponse( res ) )
  }

  /**
   * Позволяет удалить по id карточку с сервера
   * @param {string} id 
   * @returns response сервера об удалении
   */
  deleteCard( id ) {
    return fetch( this._urlServer + this._qCards + id, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then( res => this._handleResponse( res ) )
  }

  /**
   * позволяет установить по id карточки лайк пользователя
   * @param {string} id 
   * @returns response сервера с обновленными данными карточки (лайков)
   */
  setLike( id ){
    return fetch( this._urlServer + this._qCards + id + this._qLikes, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    })
     .then( res => this._handleResponse( res ) )
  }

  /**
  * позволяет удалить по id карточки лайк пользователя
  * @param {string} id 
  * @returns response сервера с обновленными данными карточки (лайков)
  */
  deleteLike( id ) {
    return fetch( this._urlServer + this._qCards + id + this._qLikes, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then( res => this._handleResponse( res ) )
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
    return fetch( this._urlServer + this._qUsersMe + this._qAvatar , {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newAvatarUrl
      })
    })
     .then( res => this._handleResponse( res ) )
  }

  _handleResponse( res ){
    return !res.ok
      ? Promise.reject( res.status )
      : res.json();
  }
}

export const api = new Api( apiConfig );