import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../../images/icon__search.svg';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__container">
        <div className="search-line">
          <img className="search-form__container_icon" src={searchIcon} alt="Лупа"></img>
          <input className="search-form__container_input" placeholder="Фильм" required></input>
          <button className="search-form__container_button" type="submit">Найти</button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  )
}

export default SearchForm;
