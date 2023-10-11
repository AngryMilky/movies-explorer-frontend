import React from 'react';

function FilterCheckbox() {
  return (
    <label className="filter-checkbox">
      <div className="filter-checkbox__container">
        <input className="filter-checkbox__input" type="checkbox" />
        <span className="filter-checkbox__tumbler" />
      </div>
      <p className="filter-checkbox__text">Короткометражки</p>
    </label>
  )
}

export default FilterCheckbox;
