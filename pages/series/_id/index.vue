<template>
  <div>
    <MainNavbar ref="navbar" />
    <div v-if="getLoadingSingleSeriesData" class="d-flex flex-column season">
      <div class="slider-container">
        <b-carousel
          id="carousel-fade"
          :interval="4000"
          fade
          background="#ababab"
          img-width="1024"
          img-height="100%"
          style="text-shadow: 1px 1px 2px #333"
        >
          <b-carousel-slide
            v-for="(poster, i) in getSeriesAllData.loading_posters"
            :key="i"
            class="h-100 c-poster"
            :img-src="poster.link"
          ></b-carousel-slide>
        </b-carousel>
      </div>
      <div class="series-overlay"></div>
      <div class="row mb-5">
        <div class="z-index col-3 me-5" style="height: 360px">
          <div class="poster h-100">
            <img
              :src="getSeriesAllData.loading_poster"
              :alt="getSeriesAllData.loading_name"
            />
          </div>
        </div>
        <div class="z-index col-8">
          <h2 class="text-white">
            {{ getSeriesAllData.loading_name }}
          </h2>
          <div class="d-flex justify-content-start align-items-center mt-4">
            <img
              class="me-3 rate"
              src="~/assets/images/rate.svg"
              alt="rate"
            /><img class="me-3 imdb" src="/imdb.png" alt="imdb" />
            <p class="text-white m-0 fw-bold fs-4">
              {{ getSeriesAllData.loading_rate }}
            </p>
          </div>
          <p class="text-white mt-4 fs-3">
            Genre:
            <span>{{ getSeriesAllData.loading_genre }}</span>
          </p>
          <p class="text-white mt-3 fs-3">
            Director:
            <span>{{ getSeriesAllData.loading_director }}</span>
          </p>
          <p class="text-white mt-3 fs-3">
            Date:
            <span>{{ getSeriesAllData.loading_date }}</span>
          </p>
          <div class="description d-flex">
            <p class="text-white mt-3 fs-3 me-3">Description:</p>
            <p class="text-white all-text mt-3 fs-3 w-75">
              {{ getSeriesAllData.loading_description }}
            </p>
          </div>
          <div class="media d-flex justify-content-end">
            <button
              v-if="getSeriesAllData.loading_trailer"
              class="btn trailer fs-4"
              :class="activeTrailer ? 'active' : ''"
            >
              <img
                class="me-2"
                :src="activeTrailer ? '/play-w.svg' : '/play.svg'"
                alt="play"
              />Trailer
            </button>
          </div>
        </div>
      </div>
      <div class="seasons z-index d-flex flex-wrap">
        <SeriesSeason
          ref="season"
          v-for="(season, i) in getSeriesAllData.loading_seasons"
          :key="season + i"
          :num="i + 1"
          :isActive="activeElement == i"
          @click.native="
            goToSeasonPage({ season: season, id: getSeriesAllData.id })
          "
        />
      </div>
    </div>
    <div v-else class="d-flex flex-column season">
      <div class="slider-container">
        <b-carousel
          id="carousel-fade"
          :interval="4000"
          fade
          background="#ababab"
          img-width="1024"
          img-height="100%"
          style="text-shadow: 1px 1px 2px #333"
        >
          <b-carousel-slide
            class="h-100 c-poster"
            img-src="/playing-now.png"
          ></b-carousel-slide>
        </b-carousel>
      </div>
      <div class="series-overlay"></div>
      <div class="row mb-5">
        <div class="z-index col-3 me-5" style="height: 360px">
          <div class="poster h-100">
            <img src="/default.png" alt="default" />
          </div>
        </div>
        <div class="z-index col-8">
          <h2 class="text-white"></h2>
          <div class="d-flex justify-content-start align-items-center mt-4">
            <img
              class="me-3 rate"
              src="~/assets/images/rate.svg"
              alt="rate"
            /><img class="me-3 imdb" src="/imdb.png" alt="imdb" />
            <p class="text-white m-0 fw-bold fs-4"></p>
          </div>
          <p class="text-white mt-4 fs-3">
            Genre:
            <span></span>
          </p>
          <p class="text-white mt-3 fs-3">
            Director:
            <span></span>
          </p>
          <p class="text-white mt-3 fs-3">
            Date:
            <span></span>
          </p>
          <div class="description d-flex">
            <p class="text-white mt-3 fs-3 me-3">Description:</p>
            <p class="text-white all-text mt-3 fs-3 w-75"></p>
          </div>
          <div class="media d-flex justify-content-end">
            <button class="btn trailer fs-4 active">
              <img class="me-2" src="/play-w.svg" alt="play" />Trailer
            </button>
          </div>
        </div>
      </div>
      <div class="single-loading">
        <img src="/rolling.svg" alt="rolling" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let focusedElement = document.querySelectorAll("body")[0];
    focusedElement.classList.remove("episode-page");
    focusedElement.classList.add("season-page");
    setTimeout(() => {
      focusedElement.focus();
      focusedElement.addEventListener("keydown", (e) => {
        this.listClick(e);
      });
    }, 100);
  },
  data() {
    return {
      activeElement: 0,
      activeTrailer: false,
    };
  },
  methods: {
    goToSeasonPage(data) {
      this.$axios
        .$get(
          this.isTesting
            ? `/getSeasons?type=series&action=get_ordered_list&movie_id=${data.id}`
            : `${this.liveGetSeasons}?type=series&action=get_ordered_list&movie_id=${data.id}`
        )
        .then((res) => {
          let resData = res.js.data.find(
            (x) => x.id == `${data.id}:${data.season}`
          );
          this.$store.commit("episode/updateEpisodeData", resData);
        });
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
          this.goClick(event);
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
    goClick(e) {
      if (e.target.classList.contains("season-page")) {
        e.target.querySelectorAll(".active").forEach((el) => {
          if (
            el.classList.contains("season-link") ||
            el.classList.contains("trailer")
          ) {
            el.click();
          }
        });
      }
    },
    doLeft() {
      if (this.activeElement != 0) {
        this.activeElement -= 1;
        return;
      }
    },
    goRight() {
      if (this.activeElement <= this.getSeriesAllData.loading_seasons - 2) {
        this.activeElement += 1;
        return;
      }
    },
    goUp() {
      if (this.activeElement < 8) {
        this.activeElement = null;
        this.activeTrailer = true;
      } else {
        this.activeElement -= 8;
      }
    },

    goDown() {
      if (this.activeTrailer) {
        this.activeElement = 0;
        this.activeTrailer = false;
      } else if (
        this.activeElement + 8 >
        this.getSeriesAllData.loading_seasons - 1
      ) {
      } else {
        this.activeElement += 8;
      }
    },
  },
  watch: {
    activeElement(newVal, oldValue) {},
  },
};
</script>

<style lang="scss" scoped>
.slider-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  padding: 0;
  z-index: -1;
  .slide {
    width: 100%;
    height: 100%;
  }
}
.season {
  position: relative;
  // overflow-y: scroll;
  .series-overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    min-height: 100%;
    left: 0;
    top: 0;
    z-index: 0;
  }
  .z-index {
    z-index: 1;
  }

  .trailer {
    background-color: #fff;
    color: #000;
  }

  .trailer.active {
    background-color: #b6012c;
    color: #fff;
  }
}
.single-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.description .all-text {
  overflow: hidden;
  width: fit-content;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
