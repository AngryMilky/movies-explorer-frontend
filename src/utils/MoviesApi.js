import { BASE_BEATFILMMOVIES_URL } from './constants';

export class MoviesApi {
  constructor({ url }) {
    this._url = url;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialMovies = () => {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(this._checkServerResponse);
  };
}

const moviesApi = new MoviesApi({
  url: BASE_BEATFILMMOVIES_URL
});

export default moviesApi;
