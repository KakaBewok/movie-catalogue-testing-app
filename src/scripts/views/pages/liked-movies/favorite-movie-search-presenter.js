/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class FavoriteMovieSearchPresenter {
  constructor({ favoriteMovies, view }) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteMovies = favoriteMovies;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchMovies(latestQuery);
    });
  }

  async _searchMovies(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundMovies;
    if (this.latestQuery.length > 0) {
      foundMovies = await this._favoriteMovies.searchMovies(this.latestQuery);
    } else {
      foundMovies = await this._favoriteMovies.getAllMovies();
    }

    this._showFoundMovies(foundMovies);
  }

  // _showFoundMovies(movies) {
  //   const html = movies.map(
  //     (movie) => `
  //         <li class="movie">
  //           <span class="movie__title">${movie.title || '-'}</span>
  //         </li>
  //       `
  //   );
  //   document.querySelector('.movies').innerHTML = html;
  //   document
  //     .getElementById('movie-search-container')
  //     .dispatchEvent(new Event('movies:searched:updated'));
  // }

  _showFoundMovies(movies) {
    this._view.showFavoriteMovies(movies);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteMovieSearchPresenter;
