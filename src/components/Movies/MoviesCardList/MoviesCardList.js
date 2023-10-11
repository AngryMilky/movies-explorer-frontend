import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <div className="movies-card-list">
      <ul className="movies-card-list__container">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className="movies-card-list__button" type="button">Ещё</button>
    </div>
  );
}

export default MoviesCardList;
