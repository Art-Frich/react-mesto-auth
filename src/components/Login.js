import PageWithForm from "./PageWithForm";
import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function Login(){
  const curUrl = useLocation();
  React.useEffect(() => {
    curUrl.pathname = '/mesto-react/sign-up';
  }, [] )
  
  return(
    <PageWithForm textTitle="Вход" textBtnSbt="Войти">
      <p className="page-auth__label-btn">
        Ещё не зарегистрированы? <Link className="page-auth__label-btn-link transition-opacity" to='/sign-up'>Зарегистрироваться</Link>
      </p>
    </PageWithForm>
  )
}