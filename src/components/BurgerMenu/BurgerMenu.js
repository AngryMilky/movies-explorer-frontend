import {Link} from 'react-router-dom';

function BurgerMenu({isOpen, onCloseBurgerMenu}) {
  return (
      <div className={`burger-menu ${isOpen ? "burger-menu_opened" : "burger-menu_hidden"}`}>
        <button 
          className="burger-menu__close-button" 
          type="button"
          onClick={onCloseBurgerMenu}>
        </button>
        <div className="burger-menu__container">
          <Link 
            className="burger-menu__movies-link" 
            to="/" 
            onClick={onCloseBurgerMenu}>Главная
          </Link>
          <Link 
            className="burger-menu__movies-link" 
            to="/movies" 
            onClick={onCloseBurgerMenu}>Фильмы
          </Link>
          <Link 
            className="burger-menu__movies-link" 
            to="/saved-movies" 
            onClick={onCloseBurgerMenu}>Сохранённые фильмы
          </Link>
          <div className="burger-menu__account">
            <Link 
              className="burger-menu__account-link"
              to="/profile" 
              onClick={onCloseBurgerMenu}>Аккаунт
            </Link>
            <button className="navigation__account-icon"/>
          </div>
        </div>
      </div>
    );
}

export default BurgerMenu;
