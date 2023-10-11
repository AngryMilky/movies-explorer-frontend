import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Login() {
  return (
      <section className="login">
        <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form">
          <label className="login__form-label">E-mail</label>
          <input
            className="login__form-input"
            name="email"
            type="email"
            id="email"
            required
          />
          <label className="login__form-label">Пароль</label>
          <input
            className="login__form-input"
            name="password"
            type="password"
            id="password"
            required
          />
          <button
            className="login__form-button-submit"
            type="submit"
          >Войти
          </button>
        </form>
          <div className="login__form-signup-block">
            <p className="login__form-signup-text">Еще не зарегистрированы? </p>
            <Link className="login__form-signup-link" to="/sign-up">Регистрация</Link>
          </div>
      </section>
    )
}

export default Login;
