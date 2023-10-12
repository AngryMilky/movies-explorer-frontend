import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Register() {
    return (
        <main className="register">
            <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
            <h1 className="register__title">Добро пожаловать!</h1>
            <form className="register__form">
                <label className="register__form-label">Имя</label>
                <input
                    className="register__form-input"
                    name="name"
                    type="text"
                    id="name"
                    minLength="2"
                    maxLength="30" 
                    placeholder="Ваше имя"
                    required
                />
                <label className="register__form-label">E-mail</label>
                <input
                    className="register__form-input"
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Ваш email"
                    required
                />
                <label className="register__form-label">Пароль</label>
                <input
                    className="register__form-input"
                    name="password"
                    type="password"
                    id="password"
                    minLength="2"
                    maxLength="30"
                    placeholder="Ваш пароль"
                    required
                />
                <button
                    className="register__form-button-submit"
                    type="submit"
                >
                    Зарегистрироваться
                </button>
            </form>
            <div className="register__form-signin-block">
                <p className="register__form-signin-text">Уже зарегистрированы? </p>
                <Link className="register__form-signin-link" to="/sign-in">Войти</Link>
            </div>
        </main>
    )
}

export default Register;
