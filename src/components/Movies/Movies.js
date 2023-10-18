import React from 'react';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";


function Movies({moviesCardClassDeleteButton, moviesCardClassSavedButton, moviesCardClassSaveButton, onSearch, foundMovies, savedMovies, onSaveMovie, onDeleteMovie, onSubmitCheckbox, preloaderStatus}) {
  return (
    <main className="movies">
      <SearchForm
        onSearch={onSearch}
        onSubmitCheckbox={onSubmitCheckbox}
      />

      {preloaderStatus ? (
                <Preloader />
            ) : (
      <MoviesCardList
        moviesCardClassDeleteButton={moviesCardClassDeleteButton} 
        moviesCardClassSavedButton={moviesCardClassSavedButton}
        moviesCardClassSaveButton={moviesCardClassSaveButton}
        foundMovies={foundMovies}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        savedMovies={savedMovies}
      />
      )}
    </main>
  )
}

export default Movies;
