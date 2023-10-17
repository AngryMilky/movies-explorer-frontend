import React from 'react';

function FilterCheckbox({isChecked, onSubmitCheckbox}) {
  return (
    <label className="filter-checkbox">
      <div className="filter-checkbox__container">
        <input 
          className="filter-checkbox__input" 
          type="checkbox"
          checked={isChecked}
          onChange={onSubmitCheckbox} />
        <span className="filter-checkbox__tumbler" />
      </div>
      <p className="filter-checkbox__text">Короткометражки</p>
    </label>
  )
}

export default FilterCheckbox;
