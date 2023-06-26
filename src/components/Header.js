import logo from "../images/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header(){
  const curUrl = useLocation();

  return(
    <header className="header">
      <img src={logo} alt="Логотип Mesto Russia" className="header__logo" />
      <div className="header__nav">
        { curUrl.pathname === '/sign-in' && <Link className='header__link' to='sign-up'>Зарегистрироваться</Link>}
        { curUrl.pathname === '/sign-up' && <Link className='header__link' to='sign-in'>Войти</Link>}
        { curUrl.pathname === '/'}
      </div>
    </header>
  )
}