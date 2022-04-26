<template>
  <div class="col-2 sidebar">
    <div>
      <ul class="live-categories-list mb-0" id="liveCategories"></ul>

      <RecycleScroller
        class="scroller"
        :items="categories"
        :item-size="47"
        key-field="id"
        ref="moviesList"
      >
        <template v-slot="{ item, index }">
          <ListItem
            class=""
            :isActive="activeElement == index"
            :title="item.title"
            :id="item.id"
            :img="item.img"
            :index="index"
            :source="item"
            :page="item.page"
            @keydown="listClickMoviesSide"
          >
          </ListItem>
        </template>
      </RecycleScroller>
    </div>
  </div>
</template>

<script>
import { get, set, entries, del, setMany } from "idb-keyval";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
export default {
  mounted() {
    let focusedElement = document.querySelectorAll("body")[0];

    setTimeout(() => {
      focusedElement.focus();
      focusedElement.addEventListener("keydown", (e) => {
        this.listClickMoviesSide(e);
      });
    }, 100);
  },
  props: ["categories", "nowList"],
  data() {
    return {
      activeElement: 2,
    };
  },
  methods: {
    listClickMoviesSide(event) {
      switch (event.keyCode) {
        case this.TIZEN.LEFT_BUTTON:
          // left
          this.doLeft();
          break;

        case this.TIZEN.UP_BUTTON:
          // up
          this.goUp(event.target);

          this.$refs["moviesList"].scrollToItem(this.activeElement - 6);
          break;

        case this.TIZEN.RIGHT_BUTTON:
          // right
          this.goRight();
          break;

        case this.TIZEN.DOWN_BUTTON:
          // down
          this.goDown();
          this.updateListScroll();
          break;
        case this.TIZEN.ZERO:
          this.focusSearchInput();
          this.clearSearchInput();
          break;
        case this.TIZEN.OK_BUTTON:
          let categoriesId = event.target.querySelector(
            ".list-item.active a"
          ).id;

          if (categoriesId == "search") {
            event.preventDefault();
            this.focusSearchInput();
            this.clearSearchInput();
          } else if (categoriesId == "fav") {
            this.getMoviesStreams(categoriesId);
          } else {

            this.getMoviesStreams(categoriesId);
          }

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

    doLeft() {},
    goUp() {
      if (!this.nowList.list) {
        if (this.activeElement != 0) {
          this.activeElement -= 1;
          return;
        }
      } else {
      }
    },
    goRight() {
      this.nowList.list = true;
    },
    goDown() {
      if (!this.nowList.list) {
        if (this.activeElement < this.categories.length - 1) {
          this.activeElement += 1;
          return;
        }
      }
    },

    updateListScroll() {
      if (this.categories[this.activeElement - 6]) {
        this.$refs["moviesList"].scrollToItem(this.activeElement - 6);
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
</style>
