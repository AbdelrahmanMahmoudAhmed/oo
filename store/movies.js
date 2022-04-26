export const state = () => ({
  allCategories: [],
  allMoviesStreams: [],
  categoryId: "*",
  moviesSearch: ""
});

export const getters = {
  getAllCategories(state) {
    return state.allCategories
  },
  getMoviesStreams(state) {
    return state.allMoviesStreams
  },
  getCategoryId(state) {
    return state.categoryId
  },
  getMoviesSearch(state) {
    return state.moviesSearch
  }

};

export const actions = {

};

export const mutations = {
  updateAllCategories(state, val) {
    val.unshift(
      { id: "search", title: "Search", img: "search-w.svg", movies: [] },
      { id: "fav", title: "Favourite", img: "fav.svg", movies: [] })
    val.forEach(element => {
      element.movies = []
      element.page = 0
    });
    state.allCategories = val

  },
  updateCategoryId(state, val) {
    state.categoryId = val
  },
  updateMoviesStreams(state, val) {
    if (val.show_icon == "stream") {
      state.allMoviesStreams.filter(x => x.id == val.id)[0].show_fav = true
    } else if (val.show_icon == "not-stream") {

      let getTheCategory = state.allCategories.filter(
        (x) => x.id == val.category_id
      );
      let pickedData = getTheCategory[0].movies.filter(x => x.id == val.id)[0]
      pickedData.show_fav = true
    } else {

      if (val.search) {
        state.allCategories.find(x => x.id == val.categoryId).page = val.page
        state.allCategories.find(x => x.id == val.categoryId).movies.push(...val.categoryData)
      } else {
        if (val.categoryId == "*") {
          state.allCategories.find(x => x.id == val.categoryId).page = val.page
          state.allMoviesStreams.push(...val.categoryData)
        } else if (val.categoryId == "fav") {
          // state.allCategories.find(x => x.id == val.categoryId).page = val.page
          state.allCategories.find(x => x.id == val.categoryId).movies = val.categoryData
        } else {
          state.allCategories.find(x => x.id == val.categoryId).page = val.page
          state.allCategories.find(x => x.id == val.categoryId).movies.push(...val.categoryData)
        }
      }
    }

  },
  updateMoviesSearch(state, val) {
    state.moviesSearch = val
  },
  hideFavIcon(state, val) { 
    let isStream = state.allMoviesStreams.find(x => x.id == val.id)
    if (isStream) {
      isStream.show_fav = false
    } else {
      let isCategory = state.allCategories.find(x => x.id == val.categoryId)
      isCategory.movies.find(x => x.id == val.id).show_fav = false
    }
  }

};
