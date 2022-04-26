<template>
  <div>
    <MainNavbar ref="navbar" @search="seriesSearch" />
    <div class="row page-type pt-0 series me-0">
      <MainSeriesSidebar :categories="allSeriesCategories" :nowList="nowList" />
      <div class="col-10 series" id="series">
        <div
          class="row position-relative"
          :class="allSeriesStreams ? 'h-100' : ''"
        >
          <template
            v-if="allSeriesStreams.length && selectedSeriesCategoryId == '*'"
          >
            <SeriesCard
              v-for="(series, i) in allSeriesStreams"
              :key="i"
              :isActive="activeElement == i"
              :mainActiveElement="i"
              :seriesData="series"
              :nowList="nowList"
            />
          </template>
          <template v-else-if="selectedCategory">
            <SeriesCard
              v-for="(series, i) in selectedCategory.series"
              :key="i"
              :isActive="activeElement == i"
              :mainActiveElement="i"
              :seriesData="series"
              :nowList="nowList"
            />
          </template>
          <div v-if="seriesIsLoading" class="loading-container">
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
      focusedElement.addEventListener("keydown", (e) => {
        this.listClick(e);
      });
    }, 100);

    this.$refs["navbar"].currentPage = "Series";

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
              this.$router.push("series");
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
      if (!this.allSeriesStreams.length) {
        this.$axios
          .$get(
            this.isTesting ? "/seriesCategories" : this.liveSeriesCategories
          )
          .then((res) => {
            this.$store.commit("series/updateAllSeriesCategories", res.js);
          })
          .then(() => {
            this.getSeriesStreams("*");
          });
      } else {
        this.seriesIsLoading = false;
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
  methods: {
    seriesSearch(text) {
      this.allSeriesCategories[0].series.length = 0;
      this.seriesSearchText = text;
      this.getSeriesStreams("*", 1, this.seriesSearchText);
      this.$store.commit("series/updateSeriesSearch", this.seriesSearchText);
    },
    listClick(event) {
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
          $(".series-card.active div").click();
          break;

        case this.TIZEN.FIVE: // 5
          this.addCurrentSeriesToFavorite(event);
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

    addCurrentSeriesToFavorite(e) {
      let currentElementId = e.target.querySelector(".series-card.active")
        .dataset.id;

      let currentCategoryId = e.target.querySelector(".series-card.active")
        .dataset.category;

      if (this.selectedSeriesCategoryId == "*") {
        let pickedData = this.allSeriesStreams.filter(
          (x) => x.id == currentElementId
        );
        this.$store.commit("series/updateSeriesStreams", {
          show_icon: "stream",
          id: pickedData[0].id,
        });

        pickedData[0].from = "all";

        let found = false;
        get("favorite.series").then((val) => {
          if (val) {
            val.forEach((el) => {
              if (el.id == pickedData[0].id) {
                found = true;
                return;
              }
            });
            if (!found) {
              set("favorite.series", [...val, ...pickedData]);
            }
          } else {
            set("favorite.series", [...pickedData]);
          }
        });
      } else if (this.selectedSeriesCategoryId == "fav") {
        let found = false;
        get("favorite.series").then((val) => {
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
              del("favorite.series");
              set("favorite.series", filtered);
              this.activeElement -= 1;
              this.getSeriesStreams("fav");
              this.$store.commit("series/hideFavIcon", {
                id: currentElementId,
                categoryId: currentCategoryId,
              });
              if (this.allSeriesCategories[1].series.length - 1 == 0) {
                this.activeElement = null;
                this.nowList.list = false;
              }
            }
          }
        });
      } else {
        // console.warn("else far from home");
        let getTheCategory = this.allSeriesCategories.filter(
          (x) => x.id == currentCategoryId
        )[0];

        let pickedData = getTheCategory.series.filter(
          (x) => x.id == currentElementId
        );

        // pickedData[0].show_fav = true;
        this.$store.commit("series/updateSeriesStreams", {
          show_icon: "not-stream",
          id: pickedData[0].id,
          category_id: getTheCategory.id,
        });

        pickedData[0].from = "other";

        let found = false;
        get("favorite.series").then((val) => {
          if (val) {
            // console.warn("yes");
            val.forEach((el) => {
              if (el.id == pickedData[0].id) {
                pickedData[0].from = "other";
                found = true;
                return;
              }
            });
            if (!found) {
              // console.warn("this series not found");
              set("favorite.series", [...val, ...pickedData]);
            }
          } else {
            set("favorite.series", [...pickedData]);
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
        if (this.activeElement + 6 <= this.allSeriesStreams.length - 1) {
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
      if (this.selectedSeriesCategoryId != "*") {
        selected = this.allSeriesCategories.find(
          (x) => x.id == this.selectedSeriesCategoryId
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

      if (this.selectedSeriesCategoryId == "*") {
        if (!this.allSeriesStreams[newVal]) {
          if (newVal % 6 == 0) {
            this.activeElement = null;
          } else {
            this.activeElement = oldValue;
          }
        }
        if (
          newVal <= this.allSeriesStreams.length - 1 &&
          newVal >= this.allSeriesStreams.length - 6
        ) {
          this.getSeriesStreams(this.selectedSeriesCategoryId);
        }
      } else if (this.selectedSeriesCategoryId == "search") {
        if (!this.selectedCategory.series[newVal]) {
          if (newVal % 6 == 0) {
            this.activeElement = null;
          } else {
            this.activeElement = oldValue;
          }
        }
        if (
          newVal <= this.selectedCategory.series.length - 1 &&
          newVal > this.selectedCategory.series.length - 6
        ) {
          this.getSeriesStreams(
            this.selectedSeriesCategoryId,
            null,
            this.$store.getters["series/getSeriesSearch"]
          );
        }
      } else {
        if (!this.selectedCategory.series[newVal]) {
          if (newVal % 6 == 0) {
            this.activeElement = null;
          } else {
            this.activeElement = oldValue;
          }
        }
        if (
          newVal <= this.selectedCategory.series.length - 1 &&
          newVal > this.selectedCategory.series.length - 6
        ) {
          this.getSeriesStreams(this.selectedSeriesCategoryId);
        }
      }
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
