<template>
  <div>
    <MainNavbar ref="navbar" />
    <div v-if="getSeriesAllData" class="d-flex flex-column episode">
      <div class="row mb-5">
        <div class="col-3 me-5" style="height: 360px">
          <div class="poster h-100">
            <img
              :src="getSeriesAllData.loading_poster"
              :alt="getSeriesAllData.loading_name"
            />
          </div>
        </div>
        <div class="col-8">
          <h2 class="text-white">{{ getSeriesAllData.loading_name }}</h2>
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
            Genre: <span>{{ getSeriesAllData.loading_genre }}</span>
          </p>
          <p class="text-white mt-3 fs-3">
            Director: <span>{{ getSeriesAllData.loading_director }}</span>
          </p>
          <p class="text-white mt-3 fs-3">
            Date: <span>{{ getSeriesAllData.loading_date }}</span>
          </p>
          <div class="description d-flex">
            <p class="text-white mt-3 fs-3 me-3">Discription:</p>
            <p class="text-white all-text mt-3 fs-3 w-75">
              {{ getSeriesAllData.loading_description }}
            </p>
          </div>
          <div class="media d-flex justify-content-end">
            <button
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
      <div class="episodes d-flex flex-wrap">
        <seriesEpisode
          v-for="(episode, i) in getEpisodeLiveData.series"
          :key="i"
          :isActive="activeElement == i"
          :index="i"
          :number="number"
          @triggerModal="triggerModal"
          @click.native="getEpisode(episode, getEpisodeLiveData)"
        />
      </div>
    </div>
    <div v-else class="d-flex flex-column episode">
      <!-- <div class="slider-container">
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
      </div> -->
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
    focusedElement.classList.remove("season-page");
    focusedElement.classList.add("episode-page");
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
      number: this.$route.params.number,
      modalOpen: false,
    };
  },
  methods: {
    getEpisode(e_number, e_cmd) {
      this.$axios
        .$get(
          this.isTesting
            ? `/getEpisode?type=vod&action=create_link&cmd=${e_cmd.cmd}&series=${e_number}`
            : `${this.liveGetEpisode}?type=vod&action=create_link&cmd=${e_cmd.cmd}&series=${e_number}`
        )
        .then((res) => {})
        .then(() => {
          document.querySelector(".play-player").focus();

          this.modalOpen = true;
        });
    },
    triggerModal() {
      this.modalOpen = false;
      document.querySelector(".play-player").blur();
    },
    listClick(event) {
      switch (event.keyCode) {
        case this.TIZEN.LEFT_BUTTON: // left
          if (!this.modalOpen) {
            this.doLeft();
          }
          break;

        case this.TIZEN.UP_BUTTON:
          // up
          if (!this.modalOpen) {
            this.goUp();
          }

          break;

        case this.TIZEN.RIGHT_BUTTON:
          // right
          if (!this.modalOpen) {
            this.goRight(event);
          }
          break;

        case this.TIZEN.DOWN_BUTTON:
          // down
          if (!this.modalOpen) {
            this.goDown();
          }

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
      e.target.querySelector(".episode-content .active").click();
    },
    doLeft() {
      if (this.activeElement != 0) {
        this.activeElement -= 1;
        this.episodeFocus("left");
        return;
      }
    },
    goRight() {
      if (this.activeElement <= this.getEpisodeLiveData.series.length - 2) {
        this.activeElement += 1;
        this.episodeFocus("right");

        return;
      }
    },
    goUp() {
      if (this.activeElement < 8) {
        this.activeElement = null;
        this.activeTrailer = true;
        document.querySelector(".trailer").focus();
      } else {
        this.activeElement -= 8;
        this.episodeFocus("up");
      }
    },

    goDown() {
      if (this.activeTrailer) {
        this.activeElement = 0;
        this.activeTrailer = false;
        document.querySelector(".trailer").blur();
      } else if (
        this.activeElement + 8 >
        this.getEpisodeLiveData.series.length - 1
      ) {
      } else {
        this.activeElement += 8;
        this.episodeFocus("down");
      }
    },
    episodeFocus(dir) {
      // check if modal is open
      if ($(".modal.fade.show").length) {
        if (dir == "right") {
          $(".play-player.active").next().focus();
        } else if (dir == "left") {
          $(".play-player.active").prev().focus();
        }
      } else {
        let currentId = +$(".active").attr("id");
        switch (dir) {
          case "right":
            $(`#${currentId + 1}`).focus();
            break;

          case "left":
            $(`#${currentId - 1}`).focus();
            break;

          case "up":
            $(`#${currentId - 8}`).focus();
            break;

          case "down":
            $(`#${currentId + 8}`).focus();
            break;

          default:
            break;
        }
      }
    },
  },
  watch: {
    activeElement(newer, old) {},
  },
};
</script>

<style lang="scss" scoped>
.trailer {
  background-color: #fff;
  color: #000;
}

.trailer.active {
  background-color: #b6012c;
  color: #fff;
}
.description .all-text {
  overflow: hidden;
  width: fit-content;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.single-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
