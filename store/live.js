import { get, set, entries, del, setMany } from "idb-keyval";

export const state = () => ({
  isSearching: false,
  showLiveFavorite: false,
  categoryId: "*",
  allCategories: [],
  allStreams: [],
  liveStreamsCount: 0,
  favoriteLiveChannels: [],
  liveSearchText: "",
});

export const getters = {
  getAllCategories(state) {
    return state.allCategories;
  },

  getSearchText(state) {
    return state.liveSearchText;
  },
  getAllStreams(state) {
    return state.allStreams;
  },
  getCategoryId(state) {
    return state.categoryId;
  },
  getIsSearching(state) {
    return state.isSearching;
  },
  getShowLoadingPage(state) {
    return state.showPage;
  },
  getShowLiveFavorite(state) {
    return state.showLiveFavorite;
  },

  getLiveStreamsCount(state) {
    return state.liveStreamsCount; // percentage
  },
  getLiveFavoriteChannels(state) {
    return state.favoriteLiveChannels;
  },
};

export const actions = {};

export const mutations = {
  updateAllCategories(state, val) {
    let searchCategory = {
      id: "search",
      title: "Search",
      img: "search-w.svg",
      channels: [],
    };
    let favoriteCategory = {
      id: "fav",
      title: "Favourite",
      img: "fav.svg",
      channels: [],
    };
    if (val) {
      // set data in the DB
      set("liveCategories", [...val]);
      if (val.indexOf(searchCategory) == -1) {
        // // console.warn("add search and favorite");
        val.unshift(searchCategory, favoriteCategory);
      }
      val.forEach((element) => {
        element.channels = [];
        element.page = 0;
      });
      state.allCategories = val;
    }
  },
  updateAllLiveStreams(state, val) {
    if (val) {
      val.forEach((element) => {
        element.channels = [];
        element.page = 0;
        element.isFavorite = element.isFavorite || false;
      });

      state.allStreams = val;
      set("liveChannels", [...val]);

      //  add data to the indexedDB database
    }
  },
  updateLiveChannelIndex(state, data) {
    state.allStreams.find((x) => x.id == data.id).isFavorite = data.isFavorite;
  },
  updateLiveSearch(state, data) {
    // // console.log("updateLiveSearch data: ", data);
    state.liveSearchText = data;
  },

  removeFromFavoriteChannels(state, id) {
    state.allStreams.find((x) => x.id == id).isFavorite = false;
  },
  updateFavoriteChannels(state, val) {
    state.favoriteLiveChannels = val;
  },
  updateLiveStreamsCount(state, val) {
    state.liveStreamsCount = val;
  },
  updateLiveShowLoading(state, val) {
    state.showPage = val;
  },
  updateCategoryId(state, val) {
    state.categoryId = val;
  },
  updateIsSearching(state, val) {
    state.isSearching = val;
  },
  updateShowLiveFavorite(state, val) {
    state.showLiveFavorite = val;
  },

  updateChannelEPG(state, { id, epg }) {
    state.allStreams.find((x) => x.id == id).loadedEPG = epg;
    state.allStreams.find((x) => x.id == id).lastLoadedEPGTime =
      new Date().getTime();
  },
};
