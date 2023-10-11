import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Register() {
    return (
        <section className="register">
            <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form">
                <label className="register__form-label">Имя</label>
                <input
                    className="register__form-input"
                    name="name"
                    type="text"
                    id="name"
                    required
                />
                <label className="register__form-label">E-mail</label>
                <input
                    className="register__form-input"
                    name="email"
                    type="email"
                    id="email"
                    required
                />
                <label className="register__form-label">Пароль</label>
                <input
                    className="register__form-input"
                    name="password"
                    type="password"
                    id="password"
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
        </section>
    )
}

export default Register;
