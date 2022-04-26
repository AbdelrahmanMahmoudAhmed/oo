<template>
  <div class="loading-bg">
    <div class="w-50 d-flex flex-column align-items-center">
      <img class="loading-logo" src="~/assets/images/logo.svg" alt="logo" />
      <p class="text-white fs-3 text-center mt-5" v-if="flashing">
        Loading live
        {{ progress > totalCategoriesCount ? "streams" : "categories" }}
      </p>
      <p style="color: transparent" class="fs-3 text-center mt-5" v-else>
        empty
      </p>
      <div class="w-100 loading-progress rounded-pill">
        <span
          class="progress-range rounded-pill"
          :style="`width: ${
            (progress / (totalStreamsCount + totalCategoriesCount)) * 100
          }%`"
        ></span>
      </div>
      <div>
        <nuxt-link class="d-flex justify-content-center fs-4" to="settings">
          <p class="text-white me-2">Press</p>
          <span class="back me-2 text-white">
            <img
              class="me-2 back-img"
              src="~/assets/images/back.svg"
              alt="back"
          /></span>
          <p class="back-text me-2">back</p>
          <p class="text-white me-2">to cancel</p></nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { get, set, getMany, del, setMany } from "idb-keyval";
export default {
  mounted() {
    setTimeout(() => {
      let focusedElement = document.querySelectorAll("body")[0];

      focusedElement.focus();
      focusedElement.addEventListener("keydown", (e) => {
        if (e.keyCode == this.TIZEN.back) {
          this.$router.go(-1);
        }
      });

      // get count from DB

      getMany(["liveCategories", "liveChannels"]).then(
        ([categories, channels]) => {
          if (!categories || !channels) {
            // // console.log("no categories or channels");
            if (this.$store.getters["requests/getToken"]) {
              // // console.log("has a token");
              this.getAllLiveCategories();
              this.getAllLiveStreams().then(() => {
                // // console.log("refresh the page");
                // reload the page
                this.reloadPageAfterStoreData();
              });
            } else {
              this.getToken().then(() => {
                this.getAllLiveCategories();
                this.getAllLiveStreams().then(() => {
                  // // console.log("refresh the page");
                  // reload the page
                  this.reloadPageAfterStoreData();
                });
              });
            }
          } else {
            this.totalCategoriesCount = categories.length;
            this.totalStreamsCount = channels.length;
          }
        }
      );

      let interval = setInterval(() => {
        if (this.totalStreamsCount && this.totalCategoriesCount) {
          // // // console.log("liveDBStreamsCount: ", this.liveDBStreamsCount);
          clearInterval(interval);
        }
      }, 1);
      let progressInterval = setInterval(() => {
        this.progress += this.TIZEN.DOWN_BUTTON;
        // // // console.log("progress: ", this.progress);
        if (
          this.progress >= this.totalStreamsCount + this.totalCategoriesCount &&
          this.totalStreamsCount &&
          this.totalCategoriesCount
        ) {
          clearInterval(progressInterval);
          // // // console.log("clear progress");
          this.$router.push("live");
        }
      }, 50);

      let flashingInterval = setInterval(() => {
        this.flashing = !this.flashing;
        if (
          this.progress >= this.totalStreamsCount + this.totalCategoriesCount &&
          this.totalStreamsCount &&
          this.totalCategoriesCount
        ) {
          clearInterval(flashingInterval);
        }
      }, 600);
    }, 500);
  },
  data() {
    return {
      progress: 0,
      totalStreamsCount: 0,
      totalCategoriesCount: 0,
      flashing: false,
    };
  },
  methods: {
    reloadPageAfterStoreData() {
      let reloadInterval = setInterval(() => {
        get("liveChannels").then((val) => {
          if (val) {
            clearInterval(reloadInterval);
            // // console.log("redirect now");
            this.$router.go();
            // // // console.log("liveChannels: ", val);
          }
        });
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
