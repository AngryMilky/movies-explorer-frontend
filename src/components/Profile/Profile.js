import { Link } from "react-router-dom";

function Profile() {
  return (

    <main className="profile">
      <h1 className="profile__title">Привет, Таня!</h1>
      <form className="profile__container">
        <label className="profile__info">
          <span className="profile__text">Имя</span>
          <input
            className="profile__input"
            name="name"
            type="text"
            placeholder="Ваше имя"
            required
            minLength="2"
            maxLength="30"
          />
        </label>
        <label className="profile__info">
          <span className="profile__text">E-mail</span>
          <input
            className="profile__input"
            name="email"
            type="email"
            placeholder='Ваш email'
            required
          />
        </label>
        <button
          className="profile__edit-button"
          type="button">
          Редактировать
        </button>
        <Link className="profile__signout-link" to="/">Выйти из аккаунта</Link>
      </form>
    </main>

  );
}

export default Profile;
