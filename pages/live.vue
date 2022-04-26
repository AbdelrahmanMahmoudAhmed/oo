<template>
  <div class="">
    <MainNavbar ref="navbar" @search="searchLive" />
    <!-- @focus-search-results="focusSearchResults" -->
    <div class="row page-type live me-0">
      <LiveSidebar
        ref="liveCategories"
        @go-right="focusFirstChannel"
        @clear-live-search="clearLiveSearch"
      />
      <div class="col-4 p-0 live-lists">
        <div class="live-channel">
          <div class="live-m-head text-center p-1 text-white">
            <h3
              v-if="
                liveCategories.length &&
                !isSearchingLive &&
                !showLiveFavoriteChannels
              "
            >
              {{ selectedLiveCategory ? selectedLiveCategory.title : "All" }}
              {{ "(" + liveChannels.length + ")" }}
            </h3>
            <h3 v-else-if="isSearchingLive">
              Search {{ "(" + liveChannels.length + ")" }}
            </h3>
            <h3 v-else-if="showLiveFavoriteChannels">
              Favorite
              {{
                "(" +
                liveChannels.filter((x) => x.isFavorite == true).length +
                ")"
              }}
            </h3>
            <h3 style="color: transparent" v-else>empty</h3>
          </div>
          <LiveChannels
            @channel-link="playChannel"
            ref="liveChannels"
            @focus-category="focusLastCategory"
            @change-epg="changeCurrentEPG"
            @focus-search-category="focusSearchCategory"
          />
        </div>
      </div>
      <div class="col-6 show-live">
        <LiveEPGColumn ref="liveEPGData" :EPGData="currentEPG" />
      </div>
    </div>
  </div>
</template>
<script>
import LiveChannels from "~/components/live/LiveChannels.vue";
import LiveEPGColumn from "~/components/live/LiveEPGColumn.vue";
import settingsVue from "./settings.vue";
export default {
  components: { LiveEPGColumn, LiveChannels },
  data() {
    return {
      pageTitle: "Live",
      currentEPG: {},
      actionsList: [],
    };
  },
  mounted() {
    this.$refs["navbar"].currentPage = "Live";
    $(document).ready(() => {
      $("#searchForm").removeClass("d-none");
      // setTimeout(() => {
      let focusedElement = document.querySelectorAll("body")[0];
      focusedElement.focus();
      focusedElement.addEventListener("keydown", (e) => {
        if ($(".list-item.active").length) {
          // alert("handleLiveCategoryKey");
          // e.preventDefault();
          this.$refs["liveCategories"].handleLiveCategoryKey(e);
        } else if ($(".channel-link.active").length) {
          this.$refs["liveChannels"].handleLiveChannelKey(e);
        }
      });
      if (this.$store.getters["requests/getToken"]) {
        this.getAllLiveCategories();
        this.getAllLiveStreams();
      } else {
        this.getToken().then(() => {
          this.getAllLiveCategories();
          this.getAllLiveStreams();
        });
      }
      // }, 500);
    });
  },
  methods: {
    searchLive(searchText) {
      if (searchText) {
        // this.$refs["liveChannels"].searchText = searchText;
        // this.LiveSearchText = searchText;
        this.$refs["liveCategories"].loadStreams();
        // liveSearchText
      } else {
        this.$refs["liveChannels"].searchText = "";
      }
      this.$store.commit("live/updateLiveSearch", searchText);
      // change category to all
      this.$store.commit("live/updateCategoryId", "*");

      // // console.log("LiveSearchText: ", this.LiveSearchText);
    },
    clearLiveSearch() {
      this.$refs["navbar"].searchText = "";
    },
    focusFirstChannel() {
      this.$refs["liveChannels"].focusFirstItem();
    },
    focusLastCategory() {
      this.$refs["liveCategories"].focusLastCategory();
    },
    focusSearchCategory() {
      this.$refs["liveCategories"].activeElement = 0;
    },
    changeCurrentEPG(currentEPG) {
      this.currentEPG = currentEPG;
    },
    playChannel(url) {
      // this.currentEPG.playLink = url;
    },
  },
  computed: {
    selectedLiveCategory() {
      let selectedCategory = this.liveCategories.find(
        (x) => x.id == this.selectedLiveCategoryId
      );
      return selectedCategory;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
