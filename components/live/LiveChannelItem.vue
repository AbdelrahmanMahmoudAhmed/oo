<template>
  <div
    class="channel-link"
    to=""
    :class="{ active: activeElement == index }"
    @keydown="$emit('keydown-event')"
  >
    <div class="d-flex align-items-center justify-content-around py-2">
      <div class="d-flex align-items-center" style="width: 70%">
        <p
          class="mb-0 me-3"
          style="width: 40px"
          v-html="(index + 1).toString().padStart(4, 0)"
        ></p>
        <div class="color-box me-3" style="width: 80px">
          <img
            class="channel-image"
            :src="item.logo ? item.logo : '/default.png'"
            alt=""
          />
        </div>
        <div class="name-container justify-content-center">
          <p class="mb-0 name">
            {{ item.name }}
            <img
              v-if="item.isFavorite"
              style="position: absolute; right: 17px; top: 18px"
              src="/fav.svg"
              alt="fav"
            />
          </p>
          <p class="mb-0 next">
            {{ getCurrentEPGName(item) }}
          </p>
        </div>
      </div>
      <div
        class="d-flex justify-content-end align-items-center"
        style="width: 15%"
      >
        <span class="all-progress" v-if="getCurrentEPGName(item)">
          <span
            class="current-progress"
            :style="{
              width: getCurrentProgress(item) + '%',
            }"
          >
          </span> </span
        ><img
          v-if="item.archive"
          class="ms-3"
          src="~/assets/images/timeshift.svg"
          alt="timeshift"
        />
        <div class="ms-3" style="width: 42px" v-show="!item.archive"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["item", "index", "activeElement"],
  methods: {
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
  },
};
</script>
<style lang="scss" scoped>
.channel-link {
  color: #fff;
  min-height: 61px;
  &.active {
    background: rgb(182, 1, 44);
    background: linear-gradient(
      90deg,
      rgba(182, 1, 44, 1) 0%,
      rgba(145, 1, 35, 1) 64%,
      rgba(91, 1, 22, 1) 100%
    );
  }
  .name-container {
    width: calc(100% - 152px);
    min-height: 55px;
    display: flex !important;
    flex-direction: column;
    width: 100%;
    // max-width: 100%;
    // background: BLUE_BUTTON;
    .name {
      display: inline-block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
      // background: GREEN_BUTTON;
    }
    .next {
      display: inline-block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }
  }
}
.channel-image {
  width: 80px !important;
  height: 40px !important;
  border-radius: 5px;
}
.next {
  font-size: 14px;
  color: #ccc;
}
.all-progress {
  background-color: #373737;
  height: 5px;
  width: 100%;
  position: relative;
  .current-progress {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #fff;
  }
}
</style>