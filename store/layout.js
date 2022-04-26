export const state = () => ({
  navHeader: 'live',
})

export const mutations = {
  changeNavLayout(state, navHeader) {
    state.navHeader = navHeader;
  }
}
