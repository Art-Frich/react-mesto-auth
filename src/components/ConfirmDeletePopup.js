import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup( { isOpen, onClose, onConfirmDelete } ){
  const [ fetchCondition, setFetchConditon ] = React.useState( false );

  function handleSubmit( e ){
    e.preventDefault();
    setFetchConditon( true );
    onConfirmDelete()
      .then( () => setFetchConditon( false ) );
  }

  return(
    <PopupWithForm 
      name="confirm-delete" 
      title="Вы уверены?" 
      submitBtnText="Да"
      submitBtnTextFetchCondition="Ладно..."
      fetchCondition={ fetchCondition }
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    ></PopupWithForm>
  )
}     