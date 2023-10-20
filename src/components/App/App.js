import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import * as auth from '../../utils/auth.js';
import { SHORT_MOVIE_DURATION, URL_REGEX } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import imageFail from '../../images/popup-img-fail.svg';
import imageSuccess from '../../images/popup-img-success.svg';


function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: ""
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [allMovies, setAllMovies] = useState([]); 
  const [foundMovies, setFoundMovies] = useState([]); 
  const [savedMovies, setSavedMovies] = useState([]); 
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [isPreloader, setIsPreloader] = useState(false);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      handleSignOut();
    }
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loadedMovies"))) {
      if (localStorage.getItem("loadedMovies")) {
        setAllMovies(JSON.parse(localStorage.getItem("loadedMovies")));
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("searchedMovies") && localStorage.getItem("checkboxStatus")) {
      const checkboxStatus = JSON.parse(localStorage.getItem("checkboxStatus"));
      handleCheckboxMovies(checkboxStatus);
    }
  }, []);

  useEffect(() => {
    if (loggedIn && currentUser) {
      getSavedMovies();
    }
  }, [loggedIn, currentUser]);

  //проверка наличия у пользователя токена
  function tokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi.getUserInfo()
        .then((res) => {
          if (res) {
            setCurrentUser({
              name: res.name,
              email: res.email,
              _id: res._id
            });
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            handleSignOut();
          } else {
            handleSignOut();
          }
        });
    }
  }

  // Регистрация пользователя
  function handleRegister({ name, password, email }) {
    setIsLoading(true);
    auth.register({ name, password, email })
      .then(() => {
        setInfoTooltipImage(imageSuccess);
        setMessage('Вы успешно зарегистрировались!');
        setInfoTooltipOpen(true);

        handleLogin({ password, email });
        navigate('/movies');
      })
      .catch((err) => {
        setInfoTooltipImage(imageFail);
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipOpen(true);

        console.log(`Ошибка ${err}`);
      });
  }

  // Авторизация пользователя
  function handleLogin({ password, email }) {
    auth.authorize({ password, email })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          tokenCheck();

          setInfoTooltipImage(imageSuccess);
          setMessage('Вы успешно авторизованы!');
          setInfoTooltipOpen(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
       
        setInfoTooltipImage(imageFail);
        setMessage('Вы ввели неверный e-mail или пароль!');
        setInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`);
      })
  }

  //Выход из системы, удаляем всё из localStorage
  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({ name: "", email: "", _id: "" });
    setFoundMovies([]);
    setAllMovies([]);
    setSavedMovies([]);
    navigate("/");
  }

  // Обновление данных пользователя
  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi.editUserInfo({ name, email })
      .then((res) => {
        //обновляем стейт currentUser из полученных данных
        setCurrentUser({
          name: res.name,
          email: res.email
        });

        setInfoTooltipImage(imageSuccess);
        setMessage('Вы успешно изменили данные!');
        setInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setInfoTooltipImage(imageFail);
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipOpen(true);
      })
  }

  // Закрытие попапов
  function closeAllPopups() {
    setInfoTooltipOpen(false);
  }

  // Поиск фильмов
  function handleSearchMovies(movie, checked) {
    if (allMovies.length !== 0) {
      const searchMovies = allMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(movie.toLowerCase()));

      if (searchMovies.length === 0) {
        setInfoTooltipImage(imageFail);
        setMessage('По вашему запросу ничего не найдено');
        setInfoTooltipOpen(true);
      } else {
        localStorage.setItem("searchWord", movie);
        localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
        localStorage.setItem("checkboxStatus", JSON.stringify(checked));

        setFoundMovies(searchMovies);
      }
    } else {
      setIsPreloader(true);
      
      // Запрос всех фильмов с сервиса beatfilm-movies 
      moviesApi.getInitialMovies()
        .then((requestMovies) => {
          requestMovies = requestMovies.map((item) => {
            if (!URL_REGEX.test(item.trailerLink)) {
              item.trailerLink = 'https://www.youtube.com';
            }
            return item;
          });

          const searchMovies = requestMovies.filter((item) =>
            item.nameRU.toLowerCase().includes(movie.toLowerCase()));

          if (searchMovies.length === 0) {
            setInfoTooltipImage(imageFail);
            setMessage('По вашему запросу ничего не найдено');
            setInfoTooltipOpen(true);
          } else {
            localStorage.setItem("loadedMovies", JSON.stringify(requestMovies));
            setAllMovies(requestMovies);
            localStorage.setItem("searchWord", movie);
            localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
            localStorage.setItem("checkboxStatus", JSON.stringify(checked));
            setFoundMovies(searchMovies);
          }
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
        .finally(() => setIsPreloader(false));
    }
  }

  // Поиск короткометражек, управление чекбоксом 
  function handleCheckboxMovies(checkbox) {

    let shortMovies;
    let movies = JSON.parse(localStorage.getItem("searchedMovies"));

    if (checkbox) {
      shortMovies = movies.filter((item) => item.duration <= SHORT_MOVIE_DURATION);
    } else if (!checkbox) {
      shortMovies = movies;
    }
    setFoundMovies(shortMovies);
    localStorage.setItem("checkboxStatus", JSON.stringify(checkbox));
  }

  // Сохранение фильма
  function handleSaveMovie(movie) {
    mainApi.createMovie(movie)
      .then((res) => {
        setSavedMovies(savedMovies.concat(res));
        setSavedMoviesList(savedMoviesList.concat(res));
        console.log(movie.trailerLink)
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  // Удаление фильма
  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        const updatedMoviesList = savedMovies.filter((item) => item._id !== movie._id);
        setSavedMovies(updatedMoviesList);
        setSavedMoviesList(savedMoviesList.filter((item) => item._id !== movie._id));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  // Загрузка сохраненных фильмов
  function getSavedMovies() {
    mainApi.getSavedMovies()
      .then((res) => {
        const savedMovies = res.filter((movie) => movie.owner === currentUser._id);
        setSavedMovies(savedMovies);
        setSavedMoviesList(savedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  // Поиск по сохраненным фильмам
  function handleSearchSavedMovie(req) {
    setIsPreloader(true);
    const searchMovies = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(req.toLowerCase()));

    if (searchMovies.length === 0) {
      setInfoTooltipImage(imageFail);
      setMessage('По вашему запросу ничего не найдено');
      setInfoTooltipOpen(true);
      setIsPreloader(false);
    } else {
      setSavedMovies(searchMovies);
      setIsPreloader(false);
    }
  }

  // Поиск короткометражек в сохраненных фильмах, управление чекбоксом 
  function handleCheckboxSavedMovies(checkbox) {
    if (checkbox) {
      setSavedMovies(savedMovies.filter((item) => item.duration <= SHORT_MOVIE_DURATION));
    } else if (!checkbox) {
      setSavedMovies(savedMoviesList);
    }
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Routes>

          <Route exact path="/" element={
            <>
              <Header loggedIn={loggedIn}
                headerClass={'header__main'}
                navigationClass={'navigation__main-account-icon'}
              />
              <Main />
              <Footer />
            </>
          }
          />
          <Route exact path="/sign-up" element=
            {loggedIn
              ? <Navigate to="/" />
              : (
                <Register
                  onRegister={handleRegister}
                  isLoading={isLoading}
                />
              )
            }

          />
          <Route exact path="/sign-in" element=
            {loggedIn
              ? <Navigate to="/" />
              : (
                <Login onLogin={handleLogin} />
              )

            }
          />
          <Route exact path="/profile" element={
            <>
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Header}
                headerClass={'header__auth'}
                navigationClass={'navigation__account-icon'}
              />
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Profile}
                onUpdateUser={handleUpdateUser}
                onSignout={handleSignOut}
                isLoading={isLoading}

              />
            </>
          }
          />
          <Route exact path="/movies" element={
            <>
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Header}
                headerClass={'header__auth'}
                navigationClass={'navigation__account-icon'}
              />
              <ProtectedRoute
                moviesCardClassDeleteButton={"movies-card__button-delete"}
                moviesCardClassSavedButton={"movies-card__button-saved"}
                moviesCardClassSaveButton={"movies-card__button-save"}
                moviesCardClassButtonElse={"movies-card-list__button"}
                component={Movies}
                onSearch={handleSearchMovies}
                foundMovies={foundMovies}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
                onSubmitCheckbox={handleCheckboxMovies}
                preloaderStatus={isPreloader}
              />
              <ProtectedRoute
                component={Footer}
              />
            </>
          }
          />
          <Route exact path="/saved-movies" element={
            <>
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Header}
                headerClass={'header__auth'}
                navigationClass={'navigation__account-icon'}
              />
              <ProtectedRoute
                moviesCardClassDeleteButton={'movies-card__button-delete_active'}
                moviesCardClassSavedButton={"movies-card__button-saved_inactive"}
                moviesCardClassSaveButton={"movies-card__button-save_inactive"}
                moviesCardClassButtonElse={"movies-card-list__button_inactive"}
                component={SavedMovies}
                onSearch={handleSearchSavedMovie}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
                onSubmitCheckbox={handleCheckboxSavedMovies}
                preloaderStatus={isPreloader}

                renderedMovies={foundMovies}
              />
              <ProtectedRoute
                component={Footer}
              />
            </>
          }
          />
          <Route path="/*" element={
            <PageNotFound />
          }
          />
        </Routes>

        <InfoTooltip
          isOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          image={infoTooltipImage}
          message={message}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
