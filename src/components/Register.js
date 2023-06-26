import PageWithForm from "./PageWithForm";
import { Link } from "react-router-dom";
import InfoTooltip from "./popups/InfoTooltip";

export default function Register(){
  function handleSubmit( e ){
    e.preventDefault();
  }

  return(
    <PageWithForm 
      textTitle="Регистрация" 
      textBtnSbt="Зарегистрироваться" 
      textLabelBtn="Уже зарегистрированы? Войти"
      onSubmit={ handleSubmit }
    >
      <p className="page-auth__label-btn">
        Уже зарегистрированы? <Link className="page-auth__label-btn-link transition-opacity" to='/sign-in'>Войти</Link>
      </p>
    </PageWithForm>
  )
}