import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function App() {
  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ selectedCard, setSelectedCard ] = React.useState( null );
  const [ cards, setCards ] = React.useState([]);

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

  function handleCardLike( dataCard ){
    const isLiked = dataCard.likes.some( i => i._id === currentUser._id );
    api.changeLikeCardStatus( dataCard._id, isLiked ).then( newCard => {
      setCards( state => state.map( c => c._id === dataCard._id ? newCard : c));
    });
  }
  
  function handleCardDelete( dataCard ){
    const id = dataCard._id;
    api.deleteCard( id ).then( () => {
      setCards( () => cards.filter( card => card._id !== id ))
    });
  }

  function handleUpdateUser( newUserData ){
    api.updateUserData( newUserData.name, newUserData.about )
      .then( (res) => setCurrentUser( res ))
      .then( () => closeAllPopups())
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen( false );
    setIsEditProfilePopupOpen( false );
    setIsAddPlacePopupOpen( false );
    setIsImgFullPopupOpen( false );
    setTimeout( () => setSelectedCard( null ), 150 ); //не удалять данные, пока закрывается
  }

  React.useEffect( () => {
    try {
      (async () =>{
      const userData = await api.getUserInfo();
      setCurrentUser( userData );
      const dataCard =  await api.getInitialCards();
      setCards( dataCard );
      })()
    } catch( err ) {
      alert('Ошибка, бро: ' + err);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      <Footer />
      <EditProfilePopup 
        isOpen={ isEditProfilePopupOpen } 
        onClose={ closeAllPopups }
        onUpdateUser={ handleUpdateUser }
      />
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