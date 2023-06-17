import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }){
  const avatarRef = React.useRef();
  const currentUser = React.useContext( CurrentUserContext )
  const [ fetchCondition, setFetchConditon ] = React.useState( false );

  function handleSubmit( e ){
    e.preventDefault();
    setFetchConditon( true );
    onUpdateAvatar({
      avatar: avatarRef.current.value
    }).then( () => setFetchConditon( false ) );
  }

  React.useEffect( () => {
    avatarRef.current.value = "";
  }, [currentUser])

  return(
    <PopupWithForm 
      name="edit-avatar" 
      title="Обновить аватар" 
      submitBtnText="Сохранить"
      submitBtnTextFetchCondition="Я тебя вижу..."
      fetchCondition={ fetchCondition }
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

