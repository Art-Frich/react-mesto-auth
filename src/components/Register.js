import PageWithForm from "./PageWithForm";
import { Link } from "react-router-dom";

export default function Register(){
  return(
    <PageWithForm 
      textTitle="Регистрация" 
      textBtnSbt="Зарегистрироваться" 
      textLabelBtn="Уже зарегистрированы? Войти"
    >
      <p className="page-auth__label-btn">
        Уже зарегистрированы? <Link className="page-auth__label-btn-link transition-opacity" to='/sign-up'>Войти</Link>
      </p>
    </PageWithForm>
  )
}