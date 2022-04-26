import Vue from "vue";
import moment from "moment";
const mixins = {
  data() {
    return {
      currentPageName: "",
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      TIZEN: {
        RED_BUTTON: 403, // red
        GREEN_BUTTON: 404, // green
        YELLOW_BUTTON: 405, //yellow
        BLUE_BUTTON: 406, //blue
        BACK_BUTTON: 10009,

        LEFT_BUTTON: 37, // left
        UP_BUTTON: 38, //up
        RIGHT_BUTTON: 39, //right
        DOWN_BUTTON: 40, // down
        OK_BUTTON: 13, // ok

        FIVE: 53,
        ZERO: 48,
      },
    };
  },
  methods: {
    focusSearchInput() {
      document.getElementById("searchField").focus();
    },
    clearSearchInput() {
      setTimeout(() => {
        document.getElementById("searchField").value = "";
      }, 1);
    },
    getEPGNowTime(today) {
      let nowTime = `${today.getHours().toString().padStart(2, "00")}:${today
        .getMinutes()
        .toString()
        .padStart(2, "00")} ${today.getDate().toString().padStart(2, "00")}
        ${this.monthNames[today.getMonth() + 1]
          .toString()
          .padStart(2, "00")} ${today.getFullYear()}`;
      return nowTime;
    },
    getEPGStartEndTime(currentEPG) {
      let startEnd = `${moment
        .unix(currentEPG.start_timestamp)
        .format("kk:mm")} - ${moment
        .unix(currentEPG.stop_timestamp)
        .format("kk:mm")}`;
      return startEnd;
    },

    getEPGStartTime(nextEPG) {
      let nextStart = moment.unix(nextEPG.start_timestamp).format("kk:mm");
      return nextStart;
    },

    getEPGData(item) {
      let currentIndex;
      let nextEPGArray = [];
      if (item.loadedEPG && item.loadedEPG[0]) {
        let nowTime = Math.round(new Date().getTime() / 1000);
        for (let index = 0; index < item.loadedEPG.length; index++) {
          const element = item.loadedEPG[index];
          let end = element.stop_timestamp;
          let start = element.start_timestamp;
          if (end > nowTime && nowTime > start) {
            nextEPGArray.push(element);
            currentIndex = index;
          }
        }
      }
      return { nextEPGArray, currentIndex };
    },
  },
};

Vue.mixin(mixins);
