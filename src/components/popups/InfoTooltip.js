import failedIcon from "../../images/icon-failed-auth.svg";
import successfullIcon from "../../images/icon-successful-auth.svg";

export default function InfoTooltip({
  isOpen, isRegister, onClose
}){
  return(
    <div 
      className={`popup ${isOpen ? 'to-visible' : ''}`}
    >
      <div 
        className="popup__container popup_container_type_auth-msg"
      >
        <img className="popup__auth-icon" src={ isRegister ? successfullIcon : failedIcon } />
        <h2 className="popup__title">{ isRegister ? 'Вы успешно зарегистрировались!' : "Что-то пошло не так! Попробуйте ещё раз." }</h2>
        <button 
          className="popup__btn-close button-zeroing transition-opacity" 
          type="button" 
          name={`close-btn-auth-msg`}
          onClick={ onClose }
        />  
      </div>
    </div>
  )
}