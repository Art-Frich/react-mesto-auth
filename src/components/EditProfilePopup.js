import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }){
  const currentUser = React.useContext( CurrentUserContext );
  const [ name, setName ] = React.useState("");
  const [ description, setDescription ] = React.useState("");

  function handleChangeName( e ){
    setName( e.target.value );
  }

  function handleChangeAbout( e ){
    setDescription( e.target.value );
  }

  function handleSubmit( e ){
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect( () => {
    setName( currentUser.name );
    setDescription( currentUser.about );
  }, [ currentUser ]);

  return (
    <PopupWithForm 
      name="edit-profile" 
      title="Редактировать профиль" 
      submitBtnText="Сохранить"
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
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
          onChange={ handleChangeName }
          value={ name }
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
          onChange={ handleChangeAbout }
          value={ description }
        />
        <span className="popup__error" />
      </label>
    </PopupWithForm>
  )
}

