import logo from "../images/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../utils/Api";

export default function Header(){
  const curUrl = useLocation();

  function onSignOut(){
    localStorage.removeItem('jwt');
  }

  const divStyle = {
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    gap: "24px"
  };

  return(
    <header className="header">
      <img src={logo} alt="Логотип Mesto Russia" className="header__logo" />
      <div className="header__nav">
        { curUrl.pathname === '/sign-in' && <Link className='header__link' to='sign-up'>Зарегистрироваться</Link>}
        { curUrl.pathname === '/sign-up' && <Link className='header__link' to='sign-in'>Войти</Link>}
        { curUrl.pathname === '/' && 
          <div style={divStyle}>
            {api.getEmail()}
            <Link className="header__link" to='sign-in' onClick={ onSignOut }>Выйти</Link>
          </div>
        }
      </div>
    </header>
  )
}