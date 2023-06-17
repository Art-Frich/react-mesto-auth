import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup( { isOpen, onClose, onConfirmDelete } ){
  function handleSubmit( e ){
    e.preventDefault();
    onConfirmDelete();
  }

  return(
    <PopupWithForm 
      name="confirm-delete" 
      title="Вы уверены?" 
      submitBtnText="Да"
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    ></PopupWithForm>
  )
}     