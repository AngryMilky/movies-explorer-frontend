import {useLocation} from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";
import {
    DEVICE_WIDTH_1280,
    MAX_CARDS,
    DEVICE_WIDTH_320,
    DEVICE_WIDTH_625,
    DEVICE_WIDTH_1101,
    ADD_CARDS_1280,
    ADD_CARDS_768,
    ADD_CARDS_320,
    ADD_CARDS_DEFAULT,
    LOAD_CARDS_DEFAULT,
    LOAD_CARDS_1101,
    LOAD_CARDS_625, LOAD_CARDS_320
} from "../../../utils/constants";

function MoviesCardList({moviesCardClassDeleteButton, moviesCardClassSavedButton, moviesCardClassSaveButton, foundMovies, onSaveMovie, onDeleteMovie, savedMovies}) {
  const location = useLocation();

  //max количество карточек в блоке при первом поиске
  const [maxCards, setMaxCards] = useState(LOAD_CARDS_DEFAULT);

  //Блок результатов появляется только после обработки запроса.
  // Если пользователь ещё ничего не искал, блока с карточками на странице нет.
  const [renderedMovies, setRenderedMovies] = useState([]);

  // Ширина экрана устройства
  const [deviceWidth, setDeviceWidth] = useState(DEVICE_WIDTH_1280);

  useEffect(() => {
      setMovies();
  }, [maxCards]);

  // Отслеживание ширины экрана устройства
  useEffect(() => {
      checkDeviceWidth();
  }, [deviceWidth, foundMovies, location]);

  // Проверка ширины экрана устройства при монтировании компонента результатов
  useEffect(() => {
      onSubscribeResize();
      return () => offSubscribeResize();
  }, [deviceWidth]);

  // Количество найденных фильмов в блоке результата
  function setFoundMovies(count) {
      setMaxCards(count);
      let movies = [];
      foundMovies.forEach((item, i) => {
          if (i < count) {
              movies.push(item);
          }
      });
      setRenderedMovies(movies);
  }

  // Количество карточек, которые отображаются на странице, зависит от ширины экрана устройства
  function checkDeviceWidth() {
      if (deviceWidth >= DEVICE_WIDTH_1101) {
          //Ширина 1280px — 12 карточек по 3 в ряд
          setFoundMovies(LOAD_CARDS_1101);

      } else if (deviceWidth >= DEVICE_WIDTH_625) {
          //Ширина 768px — 8 карточек по 2 в ряд
          setFoundMovies(LOAD_CARDS_625);

      } else if (deviceWidth >= DEVICE_WIDTH_320) {
          //Ширина от 320px до 480px — 5 карточек по 1 в ряд
          setFoundMovies(LOAD_CARDS_320);
      }

      if (location.pathname === "/saved-movies") {
          setMaxCards(MAX_CARDS);
      }
  }

  function handleSubscribeResize() {
      setDeviceWidth(window.innerWidth);
  }

  function onSubscribeResize() {
      window.addEventListener("resize", handleSubscribeResize);
  }

  function offSubscribeResize() {
      window.removeEventListener("resize", handleSubscribeResize);
  }

  function setMovies() {
      let movies = [];
      foundMovies.forEach((item, i) => {
          if (i < maxCards) {
              movies.push(item);
          }
      });
      setRenderedMovies(movies);
  }

  function handleAddButtonClick() {
      if (deviceWidth >= DEVICE_WIDTH_1101) {
          //Ширина 1280px — 12 карточек по 3 в ряд. Кнопка «Ещё» загружает по 3 карточки.
          setMaxCards(maxCards + ADD_CARDS_1280);

      } else if (deviceWidth >= DEVICE_WIDTH_625) {
          //Ширина 768px — 8 карточек по 2 в ряд. Кнопка «Ещё» загружает по 2 карточки
          setMaxCards(maxCards + ADD_CARDS_768);

      } else if (deviceWidth >= DEVICE_WIDTH_320) {
          //Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.
          setMaxCards(maxCards + ADD_CARDS_320);

      } else {
          setMaxCards(maxCards + ADD_CARDS_DEFAULT);
      }
  }

  return (
    <section className="movies-card-list">
      <p className="movies-card-list__not-found">Фильмы не найдены</p>
      <ul className="movies-card-list__container">
        {renderedMovies.map((item) => (
          <MoviesCard
            movie={item}
            key={item.id || item._id}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
            savedMovies={savedMovies}
            moviesCardClassDeleteButton={moviesCardClassDeleteButton} 
            moviesCardClassSavedButton={moviesCardClassSavedButton}
            moviesCardClassSaveButton={moviesCardClassSaveButton}
          />
        ))}
      </ul>
      
      {foundMovies.length !== renderedMovies.length ? (
        <button
          className="movies-card-list__button"
          type="button"
          onClick={handleAddButtonClick}
        >
          Ещё
        </button>
      ) : (
        
        ""
      )}

    </section>
  );
}

export default MoviesCardList;
