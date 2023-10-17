import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onUpdateUser, isLoading, onSignout }) {
  const currentUser = useContext(CurrentUserContext);

  const [userData, setUserData] = useState({
    name: {
      value: "",
      isValid: true,
      errorMessage: ""
    },
    email: {
      value: "",
      isValid: true,
      errorMessage: ""
    }
  });

  const isValid = userData.name.isValid && userData.email.isValid;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    isLoading ? setDisabled(true) : setDisabled(false);
  }, [isLoading]);

  useEffect(() => {
    isValid === true ? setDisabled(false) : setDisabled(true);
  }, [isValid]);

  useEffect(() => {
    if (
      currentUser.name === userData.name.value &&
      currentUser.email === userData.email.value
    ) {
      setDisabled(true);
    } else if (isValid) {
      setDisabled(false);
    } else if (!isValid) {
      setDisabled(true);
    }
  }, [currentUser, userData, isValid]);

  useEffect(() => {
    setUserData({
      name: {
        value: currentUser.name,
        isValid: true,
        errorMessage: ""
      },
      email: {
        value: currentUser.email,
        isValid: true,
        errorMessage: ""
      }
    });
  }, [currentUser]);

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
    onUpdateUser({
      name: userData.name.value,
      email: userData.email.value
    });
  }

  return (

    <main className="profile">
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
      <form className="profile__container" onSubmit={handleSubmit} noValidate>
        <label className="profile__info">
          <span className="profile__text">Имя</span>
          <input
            className="profile__input"
            name="name"
            type="text"
            placeholder="Ваше имя"
            value={userData.name.value || ""}
            onChange={handleChange}
            required
            minLength="2"
            maxLength="30"
          />
        </label>
        <span className="profile__span-error">{userData.name.errorMessage}</span>
        <label className="profile__info">
          <span className="profile__text">E-mail</span>
          <input
            className="profile__input"
            name="email"
            type="email"
            placeholder='Ваш email'
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            value={userData.email.value || ""}
            onChange={handleChange}
          />
        </label>
        <span className="profile__span-error">{userData.email.errorMessage}</span>
        <button
          className={`profile__edit-button ${isValid && !isLoading ? "" : "profile__edit-button_disabled"
            }`}
          type="submit"
          disabled={disabled}>
          Редактировать
        </button>
        <Link className="profile__signout-link" to="/" onClick={onSignout}>Выйти из аккаунта</Link>
      </form>
    </main>

  );
}

export default Profile;
