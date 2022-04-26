import { get, set, entries, del } from "idb-keyval";

export const state = () => ({
  token: "",
  profile: "",
  info: "",
  UID: 'get("deviceUID")',
  mac: 'get("deviceMac")',
  selectedPortal: {},
});

export const getters = {
  getToken(state) {
    return state.token;
  },
  getProfile(state) {
    return state.profile;
  },
  getInfo(state) {
    return state.info;
  },
  getMac(state) {
    return state.mac;
  },
  getUID(state) {
    return state.UID;
  },
  getSelectedPortal(state) {
    return state.selectedPortal;
  },
};

export const actions = {
  updateToken({ commit }, payload) {
    commit("UPDATE_TOKEN", payload);
  },
  updateProfile({ commit }, payload) {
    commit("UPDATE_PROFILE", payload);
  },
  updateInfo({ commit }, payload) {
    //   save the mac in the idb databse
    if (this.isTesting) {
      payload.mac = "42:17:4E:FE:7C:AA";
    }
    if (payload.mac) {
      set("deviceMac", payload.mac.replaceAll(":", "%3A"));
    }
    commit("UPDATE_INFO", payload);
  },
  updateSelectedPortal({ commit }, payload) {
    commit("UPDATE_PORTAL", payload);
  },
};

export const mutations = {
  UPDATE_TOKEN(state, val) {
    // // console.warn("Update Token Mutation");
    state.token = val;
  },
  UPDATE_PROFILE(state, val) {
    // // console.warn("Update Profile Mutation");
    state.profile = val;
  },
  UPDATE_INFO(state, val) {
    // // console.warn("Update Info Mutation");

    state.info = val;
  },
  UPDATE_PORTAL(state, val) {
    // // console.warn("selectedPortal Mutation");
    state.selectedPortal = val;
  },
};
