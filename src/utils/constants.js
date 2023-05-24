// Кнопки
export const btnEditProfile = document.querySelector('.profile__btn-edit');
export const btnAddPlace = document.querySelector('.profile__btn-add');
export const btnEditAvatar = document.querySelector('.profile__avatar-edit');

// Селекторы
export const selectorCards = '.cards__grid';
export const errMsg = 'Произошла какая-то ошибка...\n';

// Служебные
const inputSelector = '.popup__input';
const popupBtnSubmitSelector = '.popup__btn-submit';
const btnSubmitFetchCondition = 'Сохранение...';
const popupConfig = {
  classBtnClose: 'popup__btn-close',
  classPopupOpened: 'to-visible'
}

// Конфиги
export const popupWithImageConfig = {
  popupConfig: popupConfig,
  popupSelector: '.popup_type_full-img-place',
  figureSelector: '.popup__figure',
  imgSelector: '.popup__img',
  figcaptionSelector: '.popup__figcaption'
}

export const popupAddPlaceConfig = {
  popupConfig: popupConfig,
  inputSelector: inputSelector,
  popupSelector: '.popup_type_add-place',
  nameForm: 'addNewPlace',
  btnSubmitSelector: popupBtnSubmitSelector,
  btnSubmitFetchCondition: btnSubmitFetchCondition,
}

export const popupEditProfileConfig = {
  popupConfig: popupConfig,
  inputSelector: inputSelector,
  popupSelector: '.popup_type_edit-profile',
  nameForm: 'editProfileText',
  btnSubmitSelector: popupBtnSubmitSelector,
  btnSubmitFetchCondition: btnSubmitFetchCondition,
}

export const userInfoConfig = {
  selectorNameUserContainer: '.profile__title-name',
  selectorUserAboutContainer: '.profile__subtitle',
  selectorUserAvatar: '.profile__avatar'
}

export const validateConfig = {
  inputSelector: inputSelector,
  submitBtnSelector: '.popup__btn-submit',
  inputUnvalidateClass: 'popup__input_type_error',
  errorSelector: '.popup__error',
};

export const cardConfig = {
  cardSelector: '.cards__grid-item',
  imgSelector: '.card__photo',
  titleSelector: '.card__title',
  likeSelector: '.card__like',
  btnDelSelector: '.card__del-card-btn',
  classLikeActive: 'card__like_active',
  templateSelector: '.template',
  countLikeSelector: '.card__like-count',
  btnDellHiddenClass: 'to-visible'
}

export const apiConfig = {
  token: 'e07a98d9-da5b-4bb3-83f5-8be59ad95ea9',
  myId: '7fe16738c600cfe949208d93', 
  urlServer: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  qUsersMe: 'users/me',
  qCards: 'cards/',
  qLikes: '/likes/',
  qAvatar: '/avatar'
}

export const popupConfirmDeleteConfig = {
  popupConfig: popupConfig,
  popupSelector: '.popup_type_confirmDelete',
  nameForm: 'confirmCardDelete',
  btnSubmitSelector: popupBtnSubmitSelector,
  btnSubmitFetchCondition: 'Удаление...',
}

export const popupEditAvatarConfig = {
  popupConfig: popupConfig,
  inputSelector: inputSelector,
  popupSelector: '.popup_type_editAvatar',
  nameForm: 'avatarUpdate',
  btnSubmitSelector: popupBtnSubmitSelector,
  btnSubmitFetchCondition: btnSubmitFetchCondition,
}