<template>
  <div class="">
    <div
      v-if="
        (!liveChannels.length && !rendered) ||
        (showLiveFavoriteChannels && !savedFavoriteLiveChannels.length)
      "
      class="loading-container"
      style="display: flex; justify-content: center; margin-top: 40%"
    >
      <h2 v-if="searchText">No Results</h2>
      <h2
        v-else-if="
          !savedFavoriteLiveChannels.length &&
          showLiveFavoriteChannels &&
          !isLoadingFavorite
        "
      >
        No Favorite Streams
      </h2>
      <img
        v-else
        class="w-20"
        style="margin: 0 auto"
        src="/rolling.svg"
        alt="rolling"
      />
    </div>
    <div class="" v-else>
      <!-- selected category channels -->
      <LiveCategoryChannels
        v-if="!showLiveFavoriteChannels || isSearchingLive"
        :activeElement="activeElement"
        @keydown-event="handleLiveChannelKey"
        ref="liveChannelsList"
      />

      <!-- favorite channels -->
      <LiveFavoriteChannels
        v-else
        :activeElement="activeElement"
        @keydown-event="handleLiveChannelKey"
        ref="liveFavoriteChannelsList"
      />
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { get, set, entries, del, setMany } from "idb-keyval";

export default {
  mounted() {
    let updateCurrentEPG = setInterval(() => {
      if (this.showLiveFavoriteChannels) {
        setTimeout(() => {
          this.isLoadingFavorite = false;
        }, 2000);
      }
      this.$emit("change-epg", this.getCurrentEPG());
      if (this.$route.path != "/live") {
        clearInterval(updateCurrentEPG);
      }
    }, 1000);
  },
  data() {
    return {
      isLoadingFavorite: true,
      liveLink: "",
      rendered: false,
      activeElement: null,
      searchText: "",
      loadedEPGCount: 0,
      currentFavoriteId: 0,
    };
  },
  computed: {},
  methods: {
    loadEPGFor(count) {
      let channels = [];
      if (this.selectedLiveCategoryId == "*") {
        channels = this.allLiveStreams;
        setTimeout(() => {
          this.rendered = true;
        }, 500);
      } else {
        if (this.selectedLiveCategoryId == "fav") {
          channels = this.savedFavoriteLiveChannels;
        } else {
          channels = this.allLiveStreams.filter(
            (x) => x.tv_genre_id == this.selectedLiveCategoryId
          );
        }
      }
      if (channels.length) {
        for (
          let index = this.loadedEPGCount;
          index <= this.loadedEPGCount + count;
          index++
        ) {
          const element = channels[index];
          if (element) {
            this.getChannelEPG(element.id);
          }
        }
        this.loadedEPGCount += count;
      }
    },
    handleLiveChannelKey(event) {
      switch (event.keyCode) {
        case this.TIZEN.LEFT_BUTTON:
          // left
          this.doLeft();
          break;
        case this.TIZEN.UP_BUTTON:
          // up
          this.goUp(event.target);
          this.updateChannelsScroll();

          this.$emit("change-epg", this.getCurrentEPG());
          break;
        case this.TIZEN.RIGHT_BUTTON:
          // right
          this.goRight();
          break;
        case this.TIZEN.DOWN_BUTTON:
          // down
          this.goDown();
          this.updateChannelsScroll();

          this.loadEPGFor(5);
          this.$emit("change-epg", this.getCurrentEPG());
          break;
        case this.TIZEN.OK_BUTTON:
          // get the play link
          if ($(".channel-link.active").length) {
            let currentChannel = this.allLiveStreams[this.activeElement];
            // // console.log("currentChannel: ", currentChannel);
            this.getChannelPlayLink(currentChannel.cmd);
          }

          break;

        case this.TIZEN.FIVE: // 5
          this.addCurrentChannelToFavorite();

          break;
        // Global Keys
        case this.TIZEN.RED_BUTTON: // RED_BUTTON
          this.$router.push("live");
          break;
        case this.TIZEN.GREEN_BUTTON: // GREEN_BUTTON
          this.$router.push("series");
          break;
        case this.TIZEN.YELLOW_BUTTON: //YELLOW_BUTTON
          this.$router.push("settings");
          break;
        case this.TIZEN.BLUE_BUTTON: //BLUE_BUTTON
          this.$router.push("movies");
          break;
        case this.TIZEN.BACK_BUTTON:
          history.back(-1);
          break;
        default:
          return;
      }
    },
    updateChannelsScroll() {
      if (this.$refs["liveChannelsList"]) {
        this.$refs["liveChannelsList"].$refs["list"].scrollToItem(
          this.activeElement - 6
        );
      }
      if (this.$refs["liveFavoriteChannelsList"]) {
        this.$refs["liveFavoriteChannelsList"].$refs["list"].scrollToItem(
          this.activeElement - 6
        );
      }
    },
    doLeft() {
      // focus last focused category
      this.$emit("focus-category");
      // remove focus from the channel
      this.activeElement = null;
    },
    goUp() {
      if (this.activeElement != 0) {
        this.activeElement -= 1;
        return;
      }
    },
    goRight() {
      this.nowList.list = true;
    },
    goDown() {
      if (!this.showLiveFavoriteChannels) {
        if (this.activeElement < this.liveChannels.length - 1) {
          this.activeElement += 1;
          return;
        }
      } else {
        if (this.activeElement < this.savedFavoriteLiveChannels.length - 1) {
          this.activeElement += 1;
          return;
        }
      }
    },
    addCurrentChannelToFavorite() {
      let currentChannel;
      let currentActiveElement = this.activeElement;
      //  favorite category opened
      if (this.showLiveFavoriteChannels) {
        currentChannel = this.savedFavoriteLiveChannels[this.activeElement];

        this.$store.commit(
          "live/removeFromFavoriteChannels",
          currentChannel.id
        );

        get("liveChannels").then((val) => {
          if (val) {
            val.filter((x) => x.id == currentChannel.id).isFavorite = false;
            set("liveChannels", [...val]);
          }
        });

        // this.$store.commit("live/updateShowLiveFavorite", true);

        let favoriteStreams = this.allLiveStreams.filter(
          (x) => x.isFavorite == true
        );
        this.$store.commit("live/updateFavoriteChannels", favoriteStreams);
        if (favoriteStreams.length) {
          if (currentActiveElement != 0) {
            this.activeElement = currentActiveElement - 1;
          }
        } else {
          this.$emit("focus-category");
        }
      } else {
        // update current page
        currentChannel = this.liveChannels[this.activeElement];
        let focusedElement = this.activeElement;
        get("liveChannels").then((val) => {
          if (val) {
            val.find((x) => x.id == currentChannel.id).isFavorite = true;
            set("liveChannels", [...val]);
          }
        });

        this.$store.commit("live/updateLiveChannelIndex", {
          id: currentChannel.id,
          isFavorite: true,
        });
        this.currentFavoriteId = this.liveChannels[this.activeElement].id;
      }
    },
    getChannelPlayLink(cmd) {
      this.$axios
        .$get(
          this.isTesting
            ? `/getChannelLink?type=itv&action=create_link&cmd=${cmd}`
            : `${this.liveChannelPlayLink}?type=itv&action=create_link&cmd=${cmd}`
        )
        .then((res) => {
          if (res.js.cmd) {
            let playLink = res.js.cmd.replaceAll("ffmpeg ", "");
            // // console.log("playLink; ", playLink);
            this.allLiveStreams[this.activeElement].playLink = playLink;
            this.liveLink = res.js.cmd.replaceAll("ffmpeg ", "");
            this.$emit("channel-link", this.liveLink);
          }
        });
    },
    focusFirstItem() {
      this.activeElement = 0;
      this.loadedEPGCount = 0;

      // if live
      if (!this.showLiveFavoriteChannels) {
        // console.log("focusFirstItem Case 1");
        // console.log("this.liveChannels case 1: ", this.liveChannels.length);
        if (this.liveChannels.length > 0) {
          setTimeout(() => {
            this.$refs["liveChannelsList"].$refs["list"].scrollToItem(0);
          }, 500);
        } else {
          // focus category back
          this.$emit("focus-category");
        }
      } else {
        // console.log("focusFirstItem Case 2");
        if (this.savedFavoriteLiveChannels.length > 0) {
          setTimeout(() => {
            this.$refs["liveFavoriteChannelsList"].$refs["list"].scrollToItem(
              0
            );
          }, 500);
        }
      }
    },
    getCurrentEPGName(item) {
      let currentEPG = "";
      let nextEPGArray = [];
      if (item.loadedEPG && item.loadedEPG[0]) {
        let nowTime = Math.round(new Date().getTime() / 1000);
        for (let index = 0; index < item.loadedEPG.length; index++) {
          const element = item.loadedEPG[index];
          let end = element.stop_timestamp;
          let start = element.start_timestamp;
          if (end > nowTime && nowTime > start) {
            nextEPGArray.push(element);
          }
        }
      }
      if (nextEPGArray[0]) {
        currentEPG = nextEPGArray[0].name;
      }
      return currentEPG;
    },
    getCurrentProgress(item) {
      let currentEPG = "";
      let formattedNow = moment().format("yyyy-MM-DD kk:mm:SS");
      let nowTime = Math.round(new Date(formattedNow).getTime() / 1000);
      let nextEPGArray = [];
      if (item.loadedEPG && item.loadedEPG[0]) {
        for (let index = 0; index < item.loadedEPG.length; index++) {
          const element = item.loadedEPG[index];
          let end = element.stop_timestamp;
          let start = element.start_timestamp;
          if (end > nowTime && nowTime > start) {
            nextEPGArray.push(element);
          }
        }
      }
      if (nextEPGArray[0]) {
        currentEPG = nextEPGArray[0];
      }
      let endTime = currentEPG.stop_timestamp;
      let startTime = currentEPG.start_timestamp;
      let progress = ((nowTime - startTime) / (endTime - startTime)) * 100;

      return progress;
    },
    getCurrentEPG(shift = 0) {
      let currentActiveIndex = this.activeElement + shift;
      let item;
      if (this.showLiveFavoriteChannels) {
        item = this.savedFavoriteLiveChannels[currentActiveIndex];
      } else {
        item = this.liveChannels[currentActiveIndex];
      }
      let currentEPG = "";
      let nextEPGArray = [];
      let currentIndex;
      if (item.loadedEPG && item.loadedEPG[0]) {
        let nowTime = Math.round(new Date().getTime() / 1000);
        for (let index = 0; index < item.loadedEPG.length; index++) {
          const element = item.loadedEPG[index];
          let end = element.stop_timestamp;
          let start = element.start_timestamp;
          if (end > nowTime && nowTime > start) {
            nextEPGArray.push(element);
            currentIndex = index;
          }
        }
      }
      if (nextEPGArray[0]) {
        let today = new Date();
        currentEPG = { ...nextEPGArray[0] };
        currentEPG.channelName = item.name;
        currentEPG.name = currentEPG.name;
        currentEPG.decription = currentEPG.descr;

        currentEPG.nowTime = this.getEPGNowTime(today);
        currentEPG.startEndTime = this.getEPGStartEndTime(currentEPG);
        currentEPG.remainingDuration = currentEPG.t_time;
        let nextEPG = item.loadedEPG[currentIndex + 1];
        if (nextEPG) {
          currentEPG.nextEPGTime = this.getEPGStartTime(nextEPG);
          currentEPG.nextEPGName = nextEPG.name;
        }

        let afterNextEPG = item.loadedEPG[currentIndex + 2];
        if (afterNextEPG) {
          currentEPG.afterNextEPGTime = this.getEPGStartTime(afterNextEPG);
          currentEPG.afterNextEPGName = afterNextEPG.name;
        }
      }
      return currentEPG;
    },
  },
  watch: {
    activeElement(newVal) {
      if (newVal == 0) {
        this.loadEPGFor(10);
      }
    },
    searchText(val) {
      setTimeout(() => {
        if (!this.liveChannels.length) {
          //  no search results found .. emit to focus the search category again
          this.$emit("focus-search-category");
        }
      }, 500);
    },
  },
};
</script>
<style lang="scss" scoped>
.scroller {
  height: calc(100vh - 204px) !important;
  overflow: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
