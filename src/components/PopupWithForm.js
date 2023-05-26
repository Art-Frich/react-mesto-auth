export default function PopupWithForm(
  { title, name, submitBtnText, isOpen, onClose, children }
  ){

  return(
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
        >
          <h2 className="popup__title">{ title }</h2>
          { children }
          <button 
            className="popup__btn-submit button-zeroing transition-opacity" 
            type="submit" 
            name={`submit-btn-${ name }`}
          >
            { submitBtnText }
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
  )
}