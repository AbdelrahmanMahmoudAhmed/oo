export const state = () => ({
  episodeData: {},
});

export const getters = {
  getEpisodeData(state) {
    return state.episodeData;
  },
};

export const mutations = {
  updateEpisodeData(state, val) {
    state.episodeData = val
  }
};
