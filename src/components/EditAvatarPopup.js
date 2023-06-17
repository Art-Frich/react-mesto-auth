import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }){
  const avatarRef = React.useRef();
  const currentUser = React.useContext( CurrentUserContext )

  function handleSubmit( e ){
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect( () => {
    avatarRef.current.value = "";
  }, [currentUser])

  return(
    <PopupWithForm 
      name="edit-avatar" 
      title="Обновить аватар" 
      submitBtnText="Сохранить"
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    >
      <label className="popup__field">
        <input 
          className="popup__input popup__input_type_url" 
          name="urlImage" 
          placeholder="Укажите ссылку на новое изображение" 
          type="url" 
          required
          ref={ avatarRef }
        />
        <span className="popup__error" />
      </label>
    </PopupWithForm>
  )
}

