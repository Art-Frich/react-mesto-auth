import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, cards }){
  const namePlaceRef = React.useRef();
  const urlPlaceRef = React.useRef();

  function handleSubmit( e ){
    e.preventDefault();
    onAddPlace( {
      namePlace: namePlaceRef.current.value,
      urlPlace: urlPlaceRef.current.value
    });
  }

  React.useEffect( () => {
    namePlaceRef.current.value = "";
    urlPlaceRef.current.value = ""
  }, [ cards ]);

  return(
    <PopupWithForm 
      name="add-place" 
      title="Новое место" 
      submitBtnText="Создать"
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
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
          ref={ namePlaceRef }
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
          ref={ urlPlaceRef }
        />
        <span className="popup__error" />
      </label>
    </PopupWithForm>
  )
}