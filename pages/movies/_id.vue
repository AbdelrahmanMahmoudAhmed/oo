<template>
  <div class="position-relative">
    <MainNavbar ref="navbar" />
    <div v-if="getLoadingSingleMovieData" class="row movie">
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
            v-for="(poster, i) in getMovieAllData.loading_posters"
            :key="i"
            class="h-100 c-poster"
            :img-src="poster.link"
          ></b-carousel-slide>
        </b-carousel>
      </div>
      <div class="movie-overlay"></div>
      <div class="z-index col-3 h-100 me-5">
        <div class="poster">
          <img
            :src="getMovieAllData.loading_poster"
            :alt="getMovieAllData.loading_name"
          />
        </div>
      </div>
      <div class="z-index col-8">
        <h2 class="text-white">
          {{ getMovieAllData.loading_name }}
        </h2>
        <div class="d-flex justify-content-start align-items-center mt-4">
          <img
            class="me-3 rate"
            src="~/assets/images/rate.svg"
            alt="rate"
          /><img class="me-3 imdb" src="~/assets/images/imdb.png" alt="imdb" />
          <p class="text-white m-0 fw-bold fs-4">
            {{ getMovieAllData.loading_rate }}
          </p>
        </div>
        <p class="text-white mt-4 fs-3">
          Genre:
          <span>{{ getMovieAllData.loading_genre }}</span>
        </p>
        <p class="text-white mt-3 fs-3">
          Director:
          <span>{{ getMovieAllData.loading_director }}</span>
        </p>
        <p class="text-white mt-3 fs-3">
          Date:
          <span>{{ getMovieAllData.loading_date }}</span>
        </p>
        <div class="description d-flex">
          <p class="text-white mt-3 fs-3 me-3">Discription:</p>
          <p class="text-white mt-3 fs-3 w-75">
            {{ getMovieAllData.loading_description }}
          </p>
        </div>
        <div class="media d-flex justify-content-end">
          <button
            :class="playButton ? 'active' : ''"
            class="btn play fs-4 me-3"
            @click="getMovieCmd(getMovieAllData.loading_cmd)"
          >
            <img
              class="me-2"
              :src="playButton ? '/play-w.svg' : '/play.svg'"
              alt="play"
            />Play
          </button>
          <button
            :class="trailerButton ? 'active' : ''"
            v-if="getMovieAllData.loading_trailer"
            class="btn trailer fs-4"
          >
            <img
              class="me-2"
              :src="trailerButton ? '/play-w.svg' : '/play.svg'"
              alt="trailer"
            />Trailer
          </button>
        </div>
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
          <div class="poster h-100 border">
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
            <p class="text-white mt-3 fs-3 w-75"></p>
          </div>
          <div class="media d-flex justify-content-end">
            <button class="btn play fs-4 me-3">
              <img class="me-2" src="/play.svg" alt="play" />Play
            </button>
            <button class="btn trailer fs-4">
              <img class="me-2" src="/play-w.svg" alt="trailer" />Trailer
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
    setTimeout(() => {
      focusedElement.focus();
      focusedElement.addEventListener("keydown", (e) => {
        this.listClick(e);
      });
    }, 100);
  },
  data() {
    return {
      playButton: true,
      trailerButton: false,
    };
  },
  methods: {
    getMovieCmd(cmd) {
      this.$axios
        .$get(
          this.isTesting
            ? `/getMovie?type=vod&action=create_link&cmd=${cmd}`
            : `${this.liveGetMovie}?type=vod&action=create_link&cmd=${cmd}`
        )
        .then((res) => {});
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
          this.goEnter(event);
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
    goEnter(e) {
      e.target.querySelectorAll(".active").forEach((el) => {
        if (el.classList.contains("play") || el.classList.contains("trailer")) {
          el.click();
        }
      });
    },
    doLeft() {
      this.playButton = true;
      this.trailerButton = false;
      if (this.getMovieAllData.loading_trailer) {
        this.playButton = true;
        this.trailerButton = false;
        return;
      }
    },
    goRight() {
      if (this.getMovieAllData.loading_trailer) {
        this.playButton = false;
        this.trailerButton = true;
        return;
      }
    },
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
.movie {
  position: relative;
  .movie-overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 0;
  }
  .z-index {
    z-index: 1;
  }
}
.list-li.fav {
  display: none;
}

.c-poster {
  img {
    height: 100% !important;
    object-fit: cover;
  }
}

.play {
  background-color: #fff;
  color: #000;
}

.play.active {
  background-color: #b6012c;
  color: #fff;
}

.trailer.active {
  background-color: #b6012c;
  color: #fff;
}

.single-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
