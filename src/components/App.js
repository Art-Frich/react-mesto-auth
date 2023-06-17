import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function App() {
  const [ currentUser, setCurrentUser ] = React.useState( {} );
  const [ selectedCard, setSelectedCard ] = React.useState( null );
  const [ cards, setCards ] = React.useState([]);
  const [ idCardOnDelete, setIdCardOnDelete ] = React.useState( null );

  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState( false );
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState( false );
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState( false );
  const [ isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen ] = React.useState( false );
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

  function handleCardDelete( dataCard ){
    setIsConfirmDeletePopupOpen( true );
    setIdCardOnDelete( dataCard._id );
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

  function handleUpdateUser( newUserData ){
    return api.updateUserData( newUserData.name, newUserData.about )
      .then( (res) => setCurrentUser( res ))
      .then( () => closeAllPopups());
  }

  function handleUpdateAvatar( newUserAvatar ){
    return api.updateAvatar( newUserAvatar.avatar )
      .then( (res) => setCurrentUser( res ))
      .then( () => closeAllPopups());
  }

  function handleAddPlaceSubmit( newCardData ){
    return api.addNewCard( newCardData.namePlace, newCardData.urlPlace )
      .then( (newCard) => setCards( [newCard, ...cards] ))
      .then( () => closeAllPopups() );
  }

  function handleConfirmDelete(){
    return api.deleteCard( idCardOnDelete )
      .then( () => {
        setCards( () => cards.filter( card => card._id !== idCardOnDelete ))
      })
      .then( () => closeAllPopups() );
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen( false );
    setIsEditProfilePopupOpen( false );
    setIsAddPlacePopupOpen( false );
    setIsImgFullPopupOpen( false );
    setIsConfirmDeletePopupOpen( false );
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
      <EditAvatarPopup 
        isOpen={ isEditAvatarPopupOpen }
        onClose={ closeAllPopups }
        onUpdateAvatar={ handleUpdateAvatar }
      />
      <AddPlacePopup
        isOpen={ isAddPlacePopupOpen }
        onClose={ closeAllPopups }
        onAddPlace={ handleAddPlaceSubmit }
        cards={ cards }
      />
      <ConfirmDeletePopup 
        isOpen={ isConfirmDeletePopupOpen }
        onClose={ closeAllPopups }
        onConfirmDelete={ handleConfirmDelete }
      />
      { selectedCard && <ImagePopup 
        card={selectedCard}
        onClose={ closeAllPopups }
        isOpen={isImgFullPopupOpen}
      />}

    </CurrentUserContext.Provider>
  );
}