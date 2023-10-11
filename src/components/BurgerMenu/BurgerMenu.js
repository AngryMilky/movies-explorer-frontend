import {Link} from 'react-router-dom';

function BurgerMenu() {
  return (
      <div className="burger-menu burger-menu__hidden">
        <button className="burger-menu__close-button" type="button">
        </button>
        <div className="burger-menu__container">
          <Link className="burger-menu__movies-link" to="/" >Главная</Link>
          <Link className="burger-menu__movies-link" to="/movies">Фильмы</Link>
          <Link className="burger-menu__movies-link" to="/saved-movies">Сохранённые фильмы</Link>
          <div className="burger-menu__account">
            <Link className="burger-menu__account-link"to="/profile">Аккаунт</Link>
            <button className="navigation__account-icon"/>
          </div>
        </div>
      </div>
    );
}

export default BurgerMenu;
