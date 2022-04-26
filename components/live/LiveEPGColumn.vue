<template>
  <div class="container-fluid" style="">
    <nuxt-link to="">
      <h3 class="h4 text-white">{{ nowTime }}</h3>
      <LiveSmallPlayer :url="EPGData.playLink" />
      <h5 class="text-white mt-2">{{ EPGData.channelName }}</h5>
      <p class="text-white kill mb-1">
        <span class="">{{ EPGData.name ? EPGData.name.trim() : "" }}</span>
      </p>
      <p class="text-white fs-6 time mb-1">{{ EPGData.startEndTime }}</p>
      <div
        class="
          d-flex
          justify-content-between
          align-items-center
          progress-container
        "
        v-if="EPGData.remainingDuration"
      >
        <p class="mb-1 progress">
          <span :style="`width: ${getRemainingPercentage}%`"></span>
        </p>
        <p class="text-white mb-1 time-left">{{ getCurrentRemaining }}</p>
      </div>
      <template v-if="EPGData">
        <p class="info mb-4">
          {{ EPGData.decription }}
        </p>
        <p class="text-white mb-1">
          {{ EPGData.nextEPGTime }} {{ EPGData.nextEPGName }}
        </p>
        <p class="text-white">
          {{ EPGData.afterNextEPGTime }} {{ EPGData.afterNextEPGName }}
        </p>
      </template>
      <template v-else>
        <h2 class="text-center mt-4" style="color: #444">No EPG Found</h2>
      </template>
    </nuxt-link>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["EPGData"],

  mounted() {
    setInterval(this.getNowTime, 1000); // recursive!
  },
  data() {
    return {
      nowTime: "",
      currentTimestamp: "",
    };
  },
  methods: {
    getNowTime() {
      this.currentTimestamp = Math.round(new Date().getTime() / 1000);

      this.nowTime = `${new Date()
        .getHours()
        .toString()
        .padStart(2, "00")}:${new Date()
        .getMinutes()
        .toString()
        .padStart(2, "00")} ${new Date().getDate().toString().padStart(2, "00")}
          ${this.monthNames[new Date().getMonth() + 1]
            .toString()
            .padStart(2, "00")} ${new Date().getFullYear()}`;
    },
  },
  computed: {
    getCurrentRemaining() {
      // time formate is 2/this.TIZEN.OK_BUTTON/2022, 1:00:00 PM
      let start = this.EPGData.start_timestamp;
      let end = this.EPGData.stop_timestamp;
      let now = Math.round(this.currentTimestamp);

      let remain = end - now; // secondes

      let duration = moment
        .utc(moment.duration(remain, "seconds").asMilliseconds())
        .format("HH:mm");

      let durationH = duration.split(":")[0];
      let durationMin = duration.split(":")[1];

      let formattedRemaining = "";
      if (Number(durationH)) {
        formattedRemaining += durationH + "h ";
        if (Number(durationMin)) {
          formattedRemaining += " " + durationMin + "min";
        }
      } else {
        if (Number(durationMin) > 0 && Number(durationMin) < 1) {
          formattedRemaining += "a few seconds";
        } else {
          formattedRemaining += durationMin + "min";
        }
      }

      if (formattedRemaining == "00min") {
        formattedRemaining = "< 01min";
      }
      // return formattedRemaining;
      return formattedRemaining;
    },

    getRemainingPercentage() {
      // time formate is 2/this.TIZEN.OK_BUTTON/2022, 1:00:00 PM
      let start = this.EPGData.start_timestamp;
      let end = this.EPGData.stop_timestamp;
      let now = Math.round(this.currentTimestamp);

      let progress = ((now - start) / (end - start)) * 100;

      // // // console.log("progress: ", progress);
      return progress;
    },
  },
};
</script>

<style>
</style>