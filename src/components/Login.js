import PageWithForm from "./PageWithForm";
import { Link } from "react-router-dom";

export default function Login(){
    return(
      <PageWithForm textTitle="Вход" textBtnSbt="Войти">
        <p className="page-auth__label-btn">
          Ещё не зарегистрированы? <Link className="page-auth__label-btn-link transition-opacity" to='/sign-in'>Зарегистрироваться</Link>
        </p>
      </PageWithForm>
    )
}