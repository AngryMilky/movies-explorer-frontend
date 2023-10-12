import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Login() {
  return (
      <main className="login">
        <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form">
          <label className="login__form-label">E-mail</label>
          <input
            className="login__form-input"
            name="email"
            type="email"
            id="email"
            placeholder="Ваш email"
            required
          />
          <label className="login__form-label">Пароль</label>
          <input
            className="login__form-input"
            name="password"
            type="password"
            id="password"
            placeholder="Ваш пароль"
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
      </main>
    )
}

export default Login;
