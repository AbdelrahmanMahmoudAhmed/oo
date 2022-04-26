export const state = () => ({
  movieData: null,
  loadingSingleMovieData: false,
});

export const getters = {
  getMovieData(state) {
    return state.movieData;
  },
  getLoadingSingleMovieData(state) {
    return state.loadingSingleMovieData;
  },
};

export const mutations = {
  resetMoviesLoading(state) {
    state.loadingSingleMovieData = false;
  },
  updateMovieDataLive(state, val) {
    state.movieData = {};

    let isNew = false;
    if (val.newData) {
      isNew = true;
    }

    let newObject = val.newData;
    let oldObject = val.oldData;

    let stateObject = {};
    //  data
    stateObject.loading_poster = isNew ? newObject.image : oldObject.screenshot_uri
    stateObject.loading_name = isNew ? newObject.title : oldObject.name
    stateObject.loading_rate = isNew ? newObject.imDbRating : oldObject.rating_imdb
    stateObject.loading_genre = isNew ? newObject.genres : oldObject.genres_str
    stateObject.loading_director = isNew ? newObject.directors : oldObject.director
    stateObject.loading_date = isNew ? newObject.releaseDate : oldObject.added
    stateObject.loading_description = isNew ? newObject.plot : oldObject.description
    stateObject.loading_id = isNew ? newObject.id : oldObject.id
    stateObject.loading_category_id = isNew ? newObject.category_id : oldObject.category_id
    stateObject.loading_posters = isNew ? newObject.posters.posters : null
    stateObject.loading_trailer = isNew ? newObject.trailer.link : null
    stateObject.loading_cmd = oldObject.cmd
    state.movieData = { ...stateObject }
    state.loadingSingleMovieData = true
  },
  clearMovieData(state) {
    state.movieData = {}
  }
}
