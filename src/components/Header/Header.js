import React, {useState} from 'react';
import logo from '../../images/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, headerClass, navigationClass }) {

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function handleOpenBurgerMenu() {
    setIsBurgerMenuOpen(true);
    console.log(isBurgerMenuOpen)
  }

  function handleCloseBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  return (

    <header className={headerClass}>

      {loggedIn && (
        < >
          <Link to='/'><img src={logo} alt="Логотип" className="logo header__logo" /></Link>
          <div className="header__auth-container">
            <Navigation navigationClass={navigationClass} />
          </div>
          <button
            className="header__burger-menu-button"
            onClick={handleOpenBurgerMenu}
            type="button" />

          <BurgerMenu
            isOpen={isBurgerMenuOpen}
            onCloseBurgerMenu={handleCloseBurgerMenu}
          />

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
