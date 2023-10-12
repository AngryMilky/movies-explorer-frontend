import React from 'react';
import logo from '../../images/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, headerClass, navigationClass }) {

  // для хедера на главной странице
  // headerClass = {"header__main"};
  // для хедера на остальных страницах
  // headerClass = "header__auth";

  return (

    <header className={headerClass}>

      {loggedIn && (
        < >
          <Link to='/'><img src={logo} alt="Логотип" className="logo header__logo" /></Link>
          <div className="header__auth-container">
            <Navigation navigationClass={navigationClass} />
          </div>
          <button className="header__burger-menu-button" type="button" />
          <BurgerMenu />
        </>
      )}


      {!loggedIn && (
        <>
          <Link to='/'><img src={logo} alt="Логотип" className="logo header__logo" /></Link>
          <div className="header__container">
            <nav className="header__navigation">
              <NavLink to="/sign-up" className="header__register-link">Регистрация</NavLink>
              <NavLink to="/sign-in" className="header__login-link">Войти</NavLink>
            </nav>
          </div>
        </>
      )
      }
    </header >
  )
}

export default Header;
