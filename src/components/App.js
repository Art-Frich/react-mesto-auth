import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function App() {
  const [ currentUser, setCurrentUser ] = React.useState( {} );
  const [ selectedCard, setSelectedCard ] = React.useState( null );
  const [ cards, setCards ] = React.useState([]);
  const [ idCardOnDelete, setIdCardOnDelete ] = React.useState( null );
  const [ fetchCondition, setFetchConditon ] = React.useState( false );

  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState( false );
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState( false );
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState( false );
  const [ isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen ] = React.useState( false );
  const [ loggedIn, setLoggedIn ] = React.useState( false );
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
    handleFinalFetch(
      api.changeLikeCardStatus( dataCard._id, isLiked ).then( newCard => {
        setCards( state => state.map( c => c._id === dataCard._id ? newCard : c));
      })
    )
  }

  function handleUpdateUser( newUserData ){
    setFetchConditon( true );
    handleFinalFetch(
      api.updateUserData( newUserData.name, newUserData.about )
      .then( (res) => setCurrentUser( res ))
    )
  }

  function handleUpdateAvatar( newUserAvatar ){
    setFetchConditon( true );
    handleFinalFetch(
      api.updateAvatar( newUserAvatar.avatar )
      .then( (res) => setCurrentUser( res ))
    )
  }

  function handleAddPlaceSubmit( newCardData ){
    setFetchConditon( true );
    handleFinalFetch(
      api.addNewCard( newCardData.namePlace, newCardData.urlPlace )
      .then( (newCard) => setCards( [newCard, ...cards] ))
    )
  }

  function handleConfirmDelete(){
    setFetchConditon( true );
    handleFinalFetch(
      api.deleteCard( idCardOnDelete )
        .then( () => {
          setCards( () => cards.filter( card => card._id !== idCardOnDelete ))
      })
    )
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen( false );
    setIsEditProfilePopupOpen( false );
    setIsAddPlacePopupOpen( false );
    setIsImgFullPopupOpen( false );
    setIsConfirmDeletePopupOpen( false );
    setTimeout( () => setSelectedCard( null ), 150 ); //не удалять данные, пока закрывается
  }

  function handleFinalFetch( promise ){
    return promise
      .then( () => closeAllPopups() )
      .catch( ( err ) =>  handleRejectMessage() )
      .finally( () => setFetchConditon( false ));
  }

  function handleRejectMessage( err ){
    alert( 'Капитан, с прискорбием сообщаю: ' + 
      (err || 'что-то пошло не так. Возможно мы попали на мель и нужно ждать прилива интернета.') 
    );
  }

  React.useEffect( () => {
    const getData = async () => {
      try {
        const userData = await api.getUserInfo();
        setCurrentUser( userData );
        const dataCard =  await api.getInitialCards();
        setCards( dataCard );
      } catch( err ) {
        handleRejectMessage( err );
      }
    };
    getData();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header />
      <Routes>
        <Route path='/sign-up' element={ <Login /> } />
        <Route path='/sign-in' element={ <Register /> } />
        <Route path='/' element={<ProtectedRoute element={
            <Main 
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          } loggedIn={ loggedIn } />
        } />
      </Routes>
      <Footer />

      <EditProfilePopup 
        isOpen={ isEditProfilePopupOpen } 
        onClose={ closeAllPopups }
        onUpdateUser={ handleUpdateUser }
        fetchCondition={ fetchCondition }
      />
      <EditAvatarPopup 
        isOpen={ isEditAvatarPopupOpen }
        onClose={ closeAllPopups }
        onUpdateAvatar={ handleUpdateAvatar }
        fetchCondition={ fetchCondition }
      />
      <AddPlacePopup
        isOpen={ isAddPlacePopupOpen }
        onClose={ closeAllPopups }
        onAddPlace={ handleAddPlaceSubmit }
        cards={ cards }
        fetchCondition={ fetchCondition }
      />
      <ConfirmDeletePopup 
        isOpen={ isConfirmDeletePopupOpen }
        onClose={ closeAllPopups }
        onConfirmDelete={ handleConfirmDelete }
        fetchCondition={ fetchCondition }
      />
      { selectedCard && <ImagePopup 
        card={selectedCard}
        onClose={ closeAllPopups }
        isOpen={isImgFullPopupOpen}
      />}

    </CurrentUserContext.Provider>
  );
}