<template>
  <div class="col-2 sidebar">
    <div>
      <RecycleScroller
        class="scroller"
        :items="liveCategories"
        :item-size="47"
        key-field="id"
        ref="liveCategoriesList"
      >
        <template v-slot="{ item, index }">
          <LiveListItem
            :class="{
              isOpen:
                (lastOpened == index && index != 0) ||
                (isSearchingLive && index == 0 && !activeElement),
            }"
            :isActive="activeElement == index"
            :title="item.title"
            :id="item.id"
            :img="item.img"
            :index="index"
            :source="item"
            :page="item.page"
            @keydown="handleLiveCategoryKey"
          >
          </LiveListItem>
        </template>
      </RecycleScroller>
    </div>
  </div>
</template>

<script>
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { get, set, entries, del, setMany } from "idb-keyval";

export default {
  mounted() {},
  props: ["categories", "nowList"],
  data() {
    return {
      activeElement: 2,
      lastOpened: 0,
    };
  },
  methods: {
    handleLiveCategoryKey(event) {
      switch (event.keyCode) {
        case this.TIZEN.LEFT_BUTTON:
          // left
          this.doLeft();
          break;

        case this.TIZEN.UP_BUTTON:
          // up
          this.goUp(event.target);
          this.$refs["liveCategoriesList"].scrollToItem(this.activeElement - 6);
          break;

        case this.TIZEN.RIGHT_BUTTON:
          // right

          this.goRight();

          break;

        case this.TIZEN.DOWN_BUTTON:
          // down

          this.goDown();
          this.$refs["liveCategoriesList"].scrollToItem(this.activeElement - 6);

          break;
        case this.TIZEN.OK_BUTTON:
          event.preventDefault();

          if (this.activeElement == 0) {
            // search
            this.focusSearchInput();
          } else {
            this.$store.commit("live/updateIsSearching", false);

            // this.commit;
            this.$emit("clear-live-search");
            this.loadStreams();
            // if ($(document.activeElement).attr("id") != "searchField") {
            // do nothing the navbar submit will do it
            // }
          }

          break;

        // Global Keys
        case this.TIZEN.RED_BUTTON: // RED_BUTTON
          // this.code = code;
          // this.keyCode = keycode;
          this.$router.push("live");
          break;
        case this.TIZEN.GREEN_BUTTON: // GREEN_BUTTON
          // this.code = code;
          // this.keyCode = keycode;

          this.$router.push("series");

          break;
        case this.TIZEN.YELLOW_BUTTON: //YELLOW_BUTTON
          // this.code = code;
          // this.keyCode = keycode;

          this.$router.push("settings");

          break;
        case this.TIZEN.BLUE_BUTTON: //BLUE_BUTTON
          // this.code = code;
          // this.keyCode = keycode;

          this.$router.push("movies");

          break;
        case this.TIZEN.BACK_BUTTON:
          history.back(-1);
          break;

        default:
          return;
      }
    },

    doLeft() {},
    goUp() {
      if (this.activeElement != 0) {
        this.activeElement -= 1;
        return;
      }
    },
    goRight() {
      if (!this.isSearchingLive) {
        this.loadStreams();
      }
    },
    goDown() {
      if (this.activeElement < this.liveCategories.length - 1) {
        this.activeElement += 1;
        return;
      }
    },

    loadStreams() {
      // if search
      if (this.activeElement == 0) {
        // search
        this.$store.commit("live/updateIsSearching", true);
        this.$store.commit("live/updateCategoryId", "search");
        setTimeout(() => {
          this.emitToFocusChannels();
        }, 200);
      } else {
        this.$store.commit("live/updateIsSearching", false);

        // pressed category id
        let activeListElement = event.target.querySelector(
          ".list-item.active a"
        );
        if (activeListElement) {
          let categoryId = activeListElement.id;

          if (categoryId == "fav") {
            // get all favorite
            this.$store.commit("live/updateShowLiveFavorite", true);

            let favoriteStreams = this.allLiveStreams.filter(
              (x) => x.isFavorite == true
            );
            // // console.log("favoriteStreams: ", favoriteStreams);
            this.$store.commit("live/updateFavoriteChannels", favoriteStreams);
            // setTimeout(() => {
            if (favoriteStreams.length) {
              this.emitToFocusChannels();
            }
            // }, 500);
          } else {
            this.$store.commit("live/updateShowLiveFavorite", false);

            // updateCategoryId
            // this.getLiveCategoryStreams(categoryId);
            setTimeout(() => {
              this.$store.commit("live/updateCategoryId", categoryId);
              this.emitToFocusChannels();
            }, 500);
          }
        }
      }
    },

    focusLastCategory() {
      this.activeElement = this.lastOpened;
      this.lastOpened = null;
    },
    emitToFocusChannels() {
      // // // console.log("focus channels activeElement: ", this.activeElement);
      this.lastOpened = this.activeElement;

      this.activeElement = null;
      this.$emit("go-right");
    },
  },
  watch: {
    selectedLiveCategoryId(newVal) {
      // // console.log("selectedLiveCategoryId: ", newVal);
      if (newVal != "search") {
        this.$store.commit("live/updateIsSearching", false);
      }

      if (newVal != "fav") {
        this.$store.commit("live/updateShowLiveFavorite", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scroller {
  height: calc(100vh - 158px) !important;
  overflow: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
}

.active {
  background: rgb(182, 1, 44);
  background: linear-gradient(
    90deg,
    rgba(182, 1, 44, 1) 0%,
    rgba(145, 1, 35, 1) 64%,
    rgba(91, 1, 22, 1) 100%
  );
}
</style>
