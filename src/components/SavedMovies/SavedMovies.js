import React from 'react';
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({onSearch, onSubmitCheckbox, onSaveMovie, onDeleteMovie, savedMovies, preloaderStatus}) {
    return (
        <section className="saved-movies">
            <SearchForm
                onSearch={onSearch}
                onSubmitCheckbox={onSubmitCheckbox}
            />

            {preloaderStatus ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    foundMovies={savedMovies}
                    onSaveMovie={onSaveMovie}
                    onDeleteMovie={onDeleteMovie}
                    savedMovies={savedMovies}
                />
            )}
        </section>
    )
}

export default SavedMovies;
