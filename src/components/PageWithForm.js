export default function({ textTitle, textBtnSbt, textLabelBtn='' }){
  <div 
    className={`popup popup_type_${ name } ${isOpen ? 'to-visible' : ''}`}
  >
    <div 
      className="popup__container popup__container_type_form"
    >
      <form 
        className="popup__form" 
        name={`${ name }`} 
        noValidate
        onSubmit={ onSubmit }
      >
        <h2 className="popup__title">{ title }</h2>

        <label className="popup__field">
          <input 
            className={`popup__input popup__input_type_name-place ${ !isValidName ? 'popup__input_type_error' : '' }`}
            name="namePlace" 
            placeholder="Как называется это место?" 
            type="text" 
            minLength={2} 
            maxLength={30} 
            required
            ref={ namePlaceRef }
            onChange={ handleChangeName }
          />
          <span className="popup__error">{ !isValidName ? namePlaceRef.current.validationMessage : '' }</span>
        </label>
        <label className="popup__field">
          <input 
            className={`popup__input popup__input_type_url ${ !isValidUrl ? 'popup__input_type_error' : '' }`}
            name="urlImage" 
            placeholder="Укажите ссылку на изображение" 
            type="url" 
            required
            ref={ urlPlaceRef }
            onChange={ handleChangeUrl }
          />
          <span className="popup__error">{ !isValidUrl ? urlPlaceRef.current.validationMessage : '' }</span>
        </label>

        <button 
          className="popup__btn-submit button-zeroing transition-opacity" 
          type="submit" 
          name={`submit-btn-${ name }`}
          disabled={ isValidForm ? null : 'disabled' }
        >
          { fetchCondition ? submitBtnTextFetchCondition : submitBtnText }
        </button>
      </form>
      <button 
        className="popup__btn-close button-zeroing transition-opacity" 
        type="button" 
        name={`close-btn-${ name }`}
        onClick={ onClose }
      />  
    </div>
  </div>
}