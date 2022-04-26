export const state = () => ({
  seriesData: null,
  loadingSingleSeriesData: false,
});

export const getters = {
  getSeriesData(state) {
    return state.seriesData;
  },
  getLoadingSingleSeriesData(state) {
    return state.loadingSingleSeriesData;
  },
};

export const mutations = {
  resetSeriesLoading(state) {
    state.loadingSingleSeriesData = false;
  },
  updateSeriesDataLive(state, val) {
    state.seriesData = {};

    let isNew = false;
    if (val.newData) {
      isNew = true;
    }

    let newObject = val.newData;
    let oldObject = val.oldData;

    let stateObject = {};

    //  data
    stateObject.loading_poster = isNew
      ? newObject.image
      : oldObject.screenshot_uri;
    stateObject.loading_name = isNew ? newObject.title : oldObject.name;
    stateObject.loading_rate = isNew
      ? newObject.imDbRating
      : oldObject.rating_imdb;
    stateObject.loading_genre = isNew ? newObject.genres : oldObject.genres_str;
    stateObject.loading_director = isNew
      ? newObject.directors
      : oldObject.director;
    stateObject.loading_date = isNew ? newObject.releaseDate : oldObject.added;
    stateObject.loading_description = isNew
      ? newObject.plot
      : oldObject.description;
    stateObject.loading_id = isNew ? newObject.id : oldObject.id;
    stateObject.loading_category_id = isNew
      ? newObject.category_id
      : oldObject.category_id;
    stateObject.loading_posters = isNew ? newObject.posters.posters : [];
    stateObject.loading_trailer = isNew ? newObject.trailer.link : null;
    stateObject.loading_seasons = isNew
      ? newObject.tvSeriesInfo.seasons.length
      : 1;
    stateObject.id = oldObject.id;
    state.seriesData = { ...stateObject };
    state.loadingSingleSeriesData = true;
  },
  clearSeriesData(state) {
    state.seriesData = {};
  },
};
