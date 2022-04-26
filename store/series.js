export const state = () => ({
  allCategories: [],
  allSeriesStreams: [],
  categoryId: "*",
  seriesSearch: ""
});

export const getters = {
  getAllCategories(state) {
    return state.allCategories
  },
  getSeriesStreams(state) {
    return state.allSeriesStreams
  },
  getCategoryId(state) {
    return state.categoryId
  },
  getSeriesSearch(state) {
    return state.seriesSearch
  }

};

export const actions = {
};

export const mutations = {
  updateAllSeriesCategories(state, val) {
    val.unshift(
      { id: "search", title: "Search", img: "search-w.svg", series: [] },
      { id: "fav", title: "Favourite", img: "fav.svg", series: [] })
    val.forEach(element => {
      element.series = []
      element.page = 0
    });
    state.allCategories = val

  },
  updateCategoryId(state, val) {
    state.categoryId = val
  },
  updateSeriesStreams(state, val) {
    if (val.show_icon == "stream") {
      state.allSeriesStreams.filter(x => x.id == val.id)[0].show_fav = true
    } else if (val.show_icon == "not-stream") {
      let getTheCategory = state.allCategories.filter(
        (x) => x.id == val.category_id
      );
      let pickedData = getTheCategory[0].series.filter(x => x.id == val.id)[0]
      pickedData.show_fav = true
    } else {
      if (val.search) {
        state.allCategories.find(x => x.id == val.categoryId).page = val.page
        state.allCategories.find(x => x.id == val.categoryId).series.push(...val.categoryData)
      } else {
        if (val.categoryId == "*") {
          state.allCategories.find(x => x.id == val.categoryId).page = val.page
          state.allSeriesStreams.push(...val.categoryData)
        } else if (val.categoryId == "fav") {
          // state.allCategories.find(x => x.id == val.categoryId).page = val.page
          state.allCategories.find(x => x.id == val.categoryId).series = val.categoryData
        } else {
          state.allCategories.find(x => x.id == val.categoryId).page = val.page
          state.allCategories.find(x => x.id == val.categoryId).series.push(...val.categoryData)
        }
      }
    }
  },
  updateSeriesSearch(state, val) {
    state.seriesSearch = val
  },
  hideFavIcon(state, val) {
    let isStream = state.allSeriesStreams.find(x => x.id == val.id)
    if (isStream) {
      isStream.show_fav = false
    } else {
      let isCategory = state.allCategories.find(x => x.id == val.categoryId)
      isCategory.series.find(x => x.id == val.id).show_fav = false
    }
  }

};
