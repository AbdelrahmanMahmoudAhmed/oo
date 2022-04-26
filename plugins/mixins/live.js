import { get, set, entries, del, setMany } from "idb-keyval";
import Vue from "vue";

const mixins = {
  data() {
    return {
      liveStreamsLoaded: 0,
      reloadEPGAfter: 7200000, // 2 hours
      isChannelsLoading: true,
      liveCategoriesURL: `http://${this.getSelectedHost}/portal.php?action=get_genres&type=itv&JsHttpRequest=1-xml`,
      liveStreamsURL: `http://${this.getSelectedHost}/portal.php?type=itv&action=get_all_channels&force_ch_link_check=&JsHttpRequest=1-xml`,
      liveChannelEPG: `http://${this.getSelectedHost}/portal.php?JsHttpRequest=1-xml&size=200&type=itv&action=get_short_epg&ch_id=741`,
    };
  },
  computed: {
    liveCategories() {
      return this.$store.getters["live/getAllCategories"];
    },
    LiveSearchText() {
      return this.$store.getters["live/getSearchText"];
    },
    allLiveStreams() {
      return this.$store.getters["live/getAllStreams"];
    },
    selectedLiveCategoryId() {
      return this.$store.getters["live/getCategoryId"];
    },
    isSearchingLive() {
      return this.$store.getters["live/getIsSearching"];
    },
    liveDBStreamsCount() {
      return this.$store.getters["live/getLiveStreamsCount"];
    },
    showLoadingPage() {
      return this.$store.getters["live/getShowLoadingPage"];
    },
    savedFavoriteLiveChannels() {
      return this.$store.getters["live/getLiveFavoriteChannels"];
    },

    showLiveFavoriteChannels() {
      return this.$store.getters["live/getShowLiveFavorite"];
    },

    liveChannels() {
      // console.log("Live channels isSearchingLive: ", this.isSearchingLive);
      // console.log("Live channels searchText: ", this.searchText);
      // console.log("Live channels LiveSearchText: ", this.LiveSearchText);
      // console.log("this.selectedLiveCategoryId: ", this.selectedLiveCategoryId);
      // console.log("----------------------------------------------------");

      let channels = [];
      if (this.selectedLiveCategoryId == "*" && !this.isSearchingLive) {
        channels = this.allLiveStreams;
        // this.$store.commit("live/updateShowLiveFavorite", false);

        // console.log("CASE 1");
      } else {
        // console.log("-------------------------------");

        // console.log("-------------------------------");
        if (
          (this.selectedLiveCategoryId == "*" && this.isSearchingLive) ||
          this.selectedLiveCategoryId == "search"
        ) {
          // this.$store.commit("live/updateShowLiveFavorite", false);

          // console.log("CASE 2");
          // let searchWord = this.searchText || "";
          channels = this.allLiveStreams.filter(
            (x) =>
              x.name.includes(this.LiveSearchText) ||
              x.name
                .toLocaleLowerCase()
                .includes(this.LiveSearchText.toLocaleLowerCase())
          );

          // console.log("channels: ", channels);
          if (channels.length) {
          }
        } else {
          if (this.selectedLiveCategoryId == "fav") {
            // console.log("CASE 3");
            // this.$store.commit("live/updateShowLiveFavorite", true);
            // get("favorite.channels").then((val) => {
            //   if (val) {
            //     this.$store.commit("live/updateFavoriteChannels", [...val]);
            //   }
            // });
          } else {
            // this.$store.commit("live/updateShowLiveFavorite", false);

            // console.log("CASE 4");
            channels = this.allLiveStreams.filter(
              (x) => x.tv_genre_id == this.selectedLiveCategoryId
            );
          }
        }
      }

      return channels;
    },
  },

  methods: {
    // loadFavoriteChennels() {
    //   this.$store.commit("live/updateShowLiveFavorite", true);

    //   let favoriteStreams = this.allLiveStreams.filter(
    //     (x) => x.isFavorite == true
    //   );
    //   // console.log("favoriteStreams: ", favoriteStreams);
    //   this.$store.commit("live/updateFavoriteChannels", favoriteStreams);
    //   if (favoriteStreams.length) {
    //     this.emitToFocusChannels();
    //   }
    // },
    getAllLiveCategories() {
      get("liveCategories").then((value) => {
        if (value) {
          this.$store.commit("live/updateAllCategories", value);
        } else {
          this.$axios.setHeader(
            "Authorization",
            `Bearer ${this.$store.getters["requests/getToken"]}`
          );

          this.$axios
            .$get(this.isTesting ? "/live-categories" : this.liveCategoriesURL)
            .then((res) => {
              this.$store.commit("live/updateAllCategories", res.js);
            });
        }
      });
    },
    getAllLiveStreams() {
      return get("liveChannels").then((value) => {
        if (value) {
          // // console.log("value.length: ", value.length);
          this.$store.commit("live/updateLiveStreamsCount", value.length);
          this.$store.commit("live/updateAllLiveStreams", value);
        } else {
          this.$axios.setHeader(
            "Authorization",
            `Bearer ${this.$store.getters["requests/getToken"]}`
          );

          this.$axios
            .$get(this.isTesting ? "/live-streams" : this.liveStreamsURL)
            .then((res) => {
              this.$store.commit(
                "live/updateLiveStreamsCount",
                res.js.data.length
              );
              this.$store.commit("live/updateAllLiveStreams", res.js.data);

              // // console.warn("live streams: ", res.js.data);
              this.isChannelsLoading = false;
            });
        }
      });
    },
    getChannelEPG(channelId) {
      if (
        !this.channelHasLoadedEPG(channelId) ||
        this.canReloadChannelEPG(channelId)
      ) {
        this.$axios.setHeader(
          "Authorization",
          `Bearer ${this.$store.getters["requests/getToken"]}`
        );

        this.$axios
          .$get(
            this.isTesting
              ? `/channelEpg&ch_id=${channelId}`
              : this.liveChannelEPG
          )
          .then((res) => {
            let data = res.js;
            this.$store.commit("live/updateChannelEPG", {
              id: channelId,
              epg: data,
            });
            return data;
          });
      }
    },
    channelHasLoadedEPG(channelId) {
      let hasEPG = false;
      let currentChannel = this.allLiveStreams.find((x) => x.id == channelId);
      if (currentChannel.loadedEPG) {
        hasEPG = true;
        // // console.warn(`channel: ${channelId}: `, "hasEPG");
      }
      return hasEPG;
      // return currentChannel.loadedEPG;
    },
    canReloadChannelEPG(channelId) {
      let canReloadEPG = false;
      let currentChannel = this.allLiveStreams.find((x) => x.id == channelId);
      if (
        currentChannel.lastLoadedEPGTime - new Date().getTime >=
          this.reloadEPGAfter ||
        !currentChannel.loadedEPG
      ) {
        canReloadEPG = true;
        // // console.warn(`channel: ${channelId}: `, "canReloadEPG");
      }
      return canReloadEPG;
      // return currentChannel.loadedEPG;
    },
  },
};

Vue.mixin(mixins);
