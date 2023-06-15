import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function App() {
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ cards, setCards ] = React.useState( [] );
  const [ selectedCard, setSelectedCard ] = React.useState( null );

  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState( false );
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState( false );
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState( false );
  // нужен для transition + "предзагрузка"
  const [ isImgFullPopupOpen, setIsImgFullPopupOpen ] = React.useState( false ); 

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen( true );
  }
  
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen( true );
  }
  
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen( true );
  }

  function handleCardClick( dataCard ){
    setSelectedCard( dataCard );
    setTimeout( () => setIsImgFullPopupOpen( true ), 300 ); //немного времени на предзагрузку
    // немного замедляет время отклика, но зато нет "скачков" с картинкой, когда она прогружается
    // пользователь чаще всего увидит сразу загруженную картинку и отрендеренную "за кадром"
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen( false );
    setIsEditProfilePopupOpen( false );
    setIsAddPlacePopupOpen( false );
    setIsImgFullPopupOpen( false );
    setTimeout( () => setSelectedCard( null ), 150 ); //не удалять данные, пока закрывается
  }

  React.useEffect( async () => {
    Promise.all([ 
      api.getUserInfo(), 
      api.getInitialCards()
    ])
      .then( ([ userData, dataInitialCards ]) => {
        setCards( dataInitialCards );
        setCurrentUser( userData );
      })
      .catch( err => alert('Ошибка, бро: ' + err) );
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm 
        name="edit-profile" 
        title="Редактировать профиль" 
        submitBtnText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__field">
          <input 
            className="popup__input popup__input_type_name-user" 
            name="nameUser" 
            placeholder="Имя или то, что вам его заменит" 
            type="text" 
            minLength={2} 
            maxLength={40} 
            required 
          />
          <span className="popup__error" />
        </label>
        <label className="popup__field">
          <input 
            className="popup__input popup__input_type_about" 
            name="aboutUser" 
            placeholder="Кто вы? Можете оставить это место пустым =)" 
            type="text" 
            minLength={2} 
            maxLength={200} 
            required 
          />
          <span className="popup__error" />
        </label>
      </PopupWithForm>
      <PopupWithForm 
        name="add-place" 
        title="Новое место" 
        submitBtnText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__field">
          <input 
            className="popup__input popup__input_type_name-place" 
            name="namePlace" 
            placeholder="Как называется это место?" 
            type="text" 
            minLength={2} 
            maxLength={30} 
            required 
          />
          <span className="popup__error" />
        </label>
        <label className="popup__field">
          <input 
            className="popup__input popup__input_type_url" 
            name="urlImage" 
            placeholder="Укажите ссылку на изображение" 
            type="url" 
            required 
          />
          <span className="popup__error" />
        </label>
      </PopupWithForm>
      <PopupWithForm 
        name="confirm-delete" 
        title="Вы уверены?" 
        submitBtnText="Да"
      >
      </PopupWithForm>
      <PopupWithForm 
        name="edit-avatar" 
        title="Обновить аватар" 
        submitBtnText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__field">
          <input 
            className="popup__input popup__input_type_url" 
            name="urlImage" 
            placeholder="Укажите ссылку на новое изображение" 
            type="url" 
            required 
          />
          <span className="popup__error" />
        </label>
      </PopupWithForm>
      { selectedCard && <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImgFullPopupOpen}
      />}
    </CurrentUserContext.Provider>
  );
}