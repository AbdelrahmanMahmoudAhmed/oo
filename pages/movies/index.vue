<template>
  <div>
    <MainNavbar ref="navbar" @search="moviesSearch" />
    <div class="row page-type pt-0 vod me-0">
      <MainMoviesSidebar :categories="allMoviesCategories" :nowList="nowList" />
      <div class="col-10 vod" id="vod">
        <div
          class="row position-relative"
          :class="allMoviesStreams ? 'h-100' : ''"
        >
          <template
            v-if="allMoviesStreams.length && selectedMoviesCategoryId == '*'"
          >
            <MovieCard
              v-for="(movie, i) in allMoviesStreams"
              :key="i"
              :isActive="activeElement == i"
              :mainActiveElement="i"
              :movieData="movie"
              :nowList="nowList"
              :whichList="'streamList'"
            />
          </template>
          <template v-else-if="selectedCategory">
            <MovieCard
              v-for="(movie, i) in selectedCategory.movies"
              :key="i"
              :isActive="activeElement == i"
              :mainActiveElement="i"
              :movieData="movie"
              :nowList="nowList"
              :whichList="'categoryList'"
            />
          </template>
          <div v-if="moviesIsLoading" class="loading-container">
            <img src="/rolling.svg" alt="rolling" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, set, entries, del, setMany } from "idb-keyval";

export default {
  mounted() {
    let focusedElement = document.querySelectorAll("body")[0];
    setTimeout(() => {
      focusedElement.focus();
      // focusedElement.click();
      focusedElement.addEventListener("keydown", (e) => {
        this.listClickMovies(e);
      });
    }, 100);
    this.$refs["navbar"].currentPage = "Movies";

    $(document).ready(() => {
      if (!this.isTesting) {
        tizen.tvinputdevice.registerKey("ColorF0Red");
        tizen.tvinputdevice.registerKey("ColorF1Green");
        tizen.tvinputdevice.registerKey("ColorF2Yellow");
        tizen.tvinputdevice.registerKey("ColorF3Blue");
        tizen.tvinputdevice.registerKey("MediaFastForward");
        tizen.tvinputdevice.registerKey("MediaRewind");
        tizen.tvinputdevice.registerKey("MediaStop");
        tizen.tvinputdevice.registerKey("MediaPause");
        tizen.tvinputdevice.registerKey("MediaPlay");
        tizen.tvinputdevice.registerKey("ChannelUp");
        tizen.tvinputdevice.registerKey("ChannelDown");
        tizen.tvinputdevice.registerKey("0");
        tizen.tvinputdevice.registerKey("1");
        tizen.tvinputdevice.registerKey("2");
        tizen.tvinputdevice.registerKey("3");
        tizen.tvinputdevice.registerKey("4");
        tizen.tvinputdevice.registerKey("5");
        tizen.tvinputdevice.registerKey("6");
        tizen.tvinputdevice.registerKey("7");
        tizen.tvinputdevice.registerKey("8");
        tizen.tvinputdevice.registerKey("9");
        $(window).keydown(function (inEvent) {
          var keycode;
          var code;

          if (window.event) {
            keycode = inEvent.keyCode;
            code = inEvent.code;
          } else if (e.which) {
            keycode = inEvent.which;
            code = inEvent.code;
          }

          switch (keycode) {
            case this.TIZEN.RED_BUTTON: // RED_BUTTON
              this.$router.push("/live");
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
          }
        });
      }
    });

    document
      .getElementsByClassName("header-search")[0]
      .classList.remove("d-none");

    setTimeout(() => {
      this.$axios.setHeader(
        "Authorization",
        `Bearer ${this.$store.getters["requests/getToken"]}`
      );
      if (!this.allMoviesStreams.length) {
        this.$axios
          .$get(
            this.isTesting ? "/moviesCategories" : this.liveMoviesCategories
          )
          .then((res) => {
            this.$store.commit("movies/updateAllCategories", res.js);
          })
          .then(() => {
            this.getMoviesStreams("*");
          });
      } else {
        this.moviesIsLoading = false;
      }
    }, 1000);
  },
  data() {
    return {
      activeElement: null,
      nowList: {
        list: false,
      },
    };
  },
  components: {},
  methods: {
    moviesSearch(text) {
      this.allMoviesCategories[0].movies.length = 0;
      this.moviesSearchText = text;
      this.getMoviesStreams("*", 1, this.moviesSearchText);
      this.$store.commit("movies/updateMoviesSearch", this.moviesSearchText);
    },
    listClickMovies(event) {
      switch (event.keyCode) {
        case this.TIZEN.LEFT_BUTTON:
          // left
          this.doLeft();
          break;

        case this.TIZEN.UP_BUTTON:
          // up
          this.goUp();

          break;

        case this.TIZEN.RIGHT_BUTTON:
          // right
          this.goRight(event);
          break;

        case this.TIZEN.DOWN_BUTTON:
          // down
          this.goDown();

          break;
        case this.TIZEN.OK_BUTTON:
          $(".vod-card.active div").click();
          break;

        case 53: // 5
          this.addCurrentMovieToFavorite(event);
          break;

        // Global Keys
        case this.TIZEN.RED_BUTTON: // RED_BUTTON
          this.$router.push("/live");
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

    addCurrentMovieToFavorite(e) {
      let currentElementId =
        e.target.querySelector(".vod-card.active").dataset.id;

      let currentCategoryId =
        e.target.querySelector(".vod-card.active").dataset.category;

      if (this.selectedMoviesCategoryId == "*") {
        let pickedData = this.allMoviesStreams.filter(
          (x) => x.id == currentElementId
        );
        this.$store.commit("movies/updateMoviesStreams", {
          show_icon: "stream",
          id: pickedData[0].id,
        });

        pickedData[0].from = "all";

        let found = false;
        get("favorite.movies").then((val) => {
          if (val) {
            val.forEach((el) => {
              if (el.id == pickedData[0].id) {
                found = true;
                return;
              }
            });
            if (!found) {
              set("favorite.movies", [...val, ...pickedData]);
            }
          } else {
            set("favorite.movies", [...pickedData]);
          }
        });
      } else if (this.selectedMoviesCategoryId == "fav") {
        let found = false;
        get("favorite.movies").then((val) => {
          if (val) {
            val.forEach((el) => {
              if (el.id == currentElementId) {
                found = true;
                return;
              }
            });
            if (found) {
              let filtered = val.filter(function (value, index, arr) {
                return value.id != currentElementId;
              });
              // all streams
              del("favorite.movies");
              set("favorite.movies", filtered);
              this.activeElement -= 1;
              this.getMoviesStreams("fav");
              this.$store.commit("movies/hideFavIcon", {
                id: currentElementId,
                categoryId: currentCategoryId,
              });
              if (this.allMoviesCategories[1].movies.length - 1 == 0) {
                this.activeElement = null;
                this.nowList.list = false;
              }
            }
          }
        });
      } else {
        let getTheCategory = this.allMoviesCategories.filter(
          (x) => x.id == currentCategoryId
        )[0];

        let pickedData = getTheCategory.movies.filter(
          (x) => x.id == currentElementId
        );

        // pickedData[0].show_fav = true;
        this.$store.commit("movies/updateMoviesStreams", {
          show_icon: "not-stream",
          id: pickedData[0].id,
          category_id: getTheCategory.id,
        });

        pickedData[0].from = "other";

        let found = false;
        get("favorite.movies").then((val) => {
          if (val) {
            val.forEach((el) => {
              if (el.id == pickedData[0].id) {
                pickedData[0].from = "other";
                found = true;
                return;
              }
            });
            if (!found) {
              set("favorite.movies", [...val, ...pickedData]);
            }
          } else {
            set("favorite.movies", [...pickedData]);
          }
        });
      }
    },

    doLeft() {
      if (this.activeElement % 6 == 0) {
        this.activeElement = null;
        this.nowList.list = false;

        this.updatePageScroll();

        return;
      }
      if (this.activeElement > 0) {
        this.activeElement -= 1;
        this.updatePageScroll();
      } else if (this.activeElement == 0) {
        this.activeElement = null;
        this.nowList.list = false;
        this.updatePageScroll();
      }
    },
    goUp() {
      if (this.activeElement >= 6) {
        if (this.nowList.list) {
          this.activeElement -= 6;
          this.updatePageScroll();
        }
        return;
      }
    },
    goRight() {
      if (this.activeElement || this.activeElement == 0) {
        this.activeElement += 1;
        this.updatePageScroll();
      } else {
        this.activeElement = 0;
        this.updatePageScroll();
      }
    },

    goDown() {
      if (this.nowList.list) {
        if (this.activeElement + 6 <= this.allMoviesStreams.length - 1) {
          this.activeElement += 6;
          this.updatePageScroll();
        }
      }
    },

    updatePageScroll() {
      if (this.activeElement >= 6) {
        document.getElementById(`${this.activeElement - 6}`).scrollIntoView();
      } else {
        document.getElementById(`0`).scrollIntoView();
      }
    },
  },
  computed: {
    selectedCategory() {
      let selected = {};
      if (this.selectedMoviesCategoryId != "*") {
        selected = this.allMoviesCategories.find(
          (x) => x.id == this.selectedMoviesCategoryId
        );
      }

      return selected;
    },
  },

  watch: {
    activeElement(newVal, oldValue) {
      if (!newVal) {
        return;
      }

      if (this.selectedMoviesCategoryId == "*") {
        if (!this.allMoviesStreams[newVal]) {
          if (newVal % 6 == 0) {
            this.activeElement = null;
          } else {
            this.activeElement = oldValue;
          }
        }
        if (
          newVal <= this.allMoviesStreams.length - 1 &&
          newVal >= this.allMoviesStreams.length - 6
        ) {
          this.getMoviesStreams(this.selectedMoviesCategoryId);
        }
      } else if (this.selectedMoviesCategoryId == "search") {
        if (!this.selectedCategory.movies[newVal]) {
          if (newVal % 6 == 0) {
            this.activeElement = null;
          } else {
            this.activeElement = oldValue;
          }
        }
        if (
          newVal <= this.selectedCategory.movies.length - 1 &&
          newVal > this.selectedCategory.movies.length - 6
        ) {
          this.getMoviesStreams(
            this.selectedMoviesCategoryId,
            null,
            this.$store.getters["movies/getMoviesSearch"]
          );
        }
      } else {
        if (!this.selectedCategory.movies[newVal]) {
          if (newVal % 6 == 0) {
            this.activeElement = null;
          } else {
            this.activeElement = oldValue;
          }
        }
        if (
          newVal <= this.selectedCategory.movies.length - 1 &&
          newVal > this.selectedCategory.movies.length - 6
        ) {
          this.getMoviesStreams(this.selectedMoviesCategoryId);
        }
      }

      // else if (this.selectedMoviesCategoryId == "fav") {
      //   // console.warn(
      //     "mother fucker",
      //     this.selectedCategory.movies.length,
      //     newVal
      //   );
      //   if (this.selectedCategory.movies.length - 1 >= newVal) {
      //     // console.warn("top");
      //     this.activeElement = newVal;
      //   } else if (newVal > this.selectedCategory.movies.length - 1) {
      //     // console.warn("bottom");
      //     this.activeElement = oldValue;
      //   }
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 50%;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-42%);
}
</style>
