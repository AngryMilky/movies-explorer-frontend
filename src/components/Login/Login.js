import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Login({onLogin, isLoading}) {
  const [userData, setUserData] = useState({
      email: {
          value: "",
          isValid: false,
          errorMessage: ""
      },
      password: {
          value: "",
          isValid: false,
          errorMessage: ""
      }
  });

  const isValid = userData.email.isValid && userData.password.isValid;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
      isLoading ? setDisabled(true) : setDisabled(false);
  }, [isLoading]);

  useEffect(() => {
      isValid ? setDisabled(false) : setDisabled(true);
  }, [isValid]);

  const handleChange = (evt) => {
      const { name, value, validity, validationMessage } = evt.target;

      setUserData((prevState) => ({
          ...prevState,
          [name]: {
              ...userData[name],
              value,
              isValid: validity.valid,
              errorMessage: validationMessage
          }
      }));
  }

  const handleSubmit = (evt) => {
      evt.preventDefault();
      onLogin({
          email: userData.email.value,
          password: userData.password.value
      });
      setUserData({email: '', password: ''});
  }

  return (
      <main className="login">
        <Link to='/'><img src={logo} alt="Логотип" className="logo" /></Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__form-label">E-mail</label>
          <input
            className={`login__form-input ${
            userData.email.errorMessage && "login__form-input_error"
            }`}
            name="email"
            type="email"
            id="email"
            placeholder="Ваш email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            value={userData.email.value || ""}
            onChange={handleChange}
          />
          <span className="login__form-error">
            {userData.email.errorMessage}
          </span>

          <label className="login__form-label">Пароль</label>
          <input
            className={`login__form-input ${
            userData.password.errorMessage && "login__form-input_error"
            }`}
            name="password"
            type="password"
            value={userData.password.value || ""}
            id="password"
            placeholder="Ваш пароль"
            required
            onChange={handleChange}
          />
          <span className="login__form-error">
            {userData.password.errorMessage}
          </span>

          <button
            className={`login__form-button-submit ${
            isValid && !isLoading ? "" : "login__form-button-submit_disabled"
            }`}
            type="submit"
            disabled={disabled}
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
