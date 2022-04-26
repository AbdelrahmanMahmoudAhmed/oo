import Vue from "vue";
import { get, set, entries, del } from "idb-keyval";

const mixins = {
  data() {
    return {
      isTesting: true,

      globalError: "",
      liveTokenURL: `http://mag.4k-ott.com/portal.php?type=stb&action=handshake&token=&JsHttpRequest=1-xml`,
      liveProfileURL: `http://mag.4k-ott.com/portal.php?type=stb&action=get_profile&JsHttpRequest=1-xml`,
      liveInfoURL: `http://mag.4k-ott.com/portal.php?type=account_info&action=get_main_info&JsHttpRequest=1-xml`,
      liveChannelPlayLink: `http://mag.4k-ott.com/portal.php?type=vod&action=create_link&cmd=`,

      // ${this.selectedHost}
      liveMoviesCategories: `http://mag.4k-ott.com/portal.php?type=vod&action=get_categories&JsHttpRequest=1-xml`,
      liveMoviesStreams: `http://mag.4k-ott.com/portal.php?type=vod&action=get_ordered_list&JsHttpRequest=1-xml`,
      liveSeriesCategories: `http://mag.4k-ott.com/portal.php?type=series&action=get_categories&JsHttpRequest=1-xml`,
      liveSeriesStreams: `http://mag.4k-ott.com/portal.php?type=series&action=get_ordered_list&force_ch_link_check=&JsHttpRequest=1-xml`,
      liveSingleMovie: `https://qslivetv.com/getimdb.php?type=SearchMovie&title=`,
      liveSingleSeries: `https://qslivetv.com/getimdb.php?type=SearchSeries&title=`,
      liveGetSeasons: `http://mag.4k-ott.com/portal.php?type=series&action=get_ordered_list&movie_id=`,
      liveGetEpisode: `http://mag.4k-ott.com/portal.php?type=vod&action=create_link&cmd=&series=`,
      liveGetMovie: `http://mag.4k-ott.com/portal.php?type=vod&action=create_link&cmd=`,
    };
  },
  methods: {
    registerDevice() {
      let portalAddress = this.getSelectedHost || "mag.4k-ott.com";
      let UID = !this.isTesting
        ? tizen.systeminfo.getCapability("http://tizen.org/system/tizenid")
        : "WOmWiaxfri7EQMY21Y2TipauywA=";

      let mac = this.genMacData ? this.genMacData.mac : "da:c3:e0:06:aa:2d";
      return this.$axios
        .$post("https://qslivetv.com/api/device", {
          portal_address: portalAddress,
          mac_address: mac,
          uid: UID,
          username: "1",
          password: "1",
          firebase_token: "1",
        })
        .then((res) => {
        })
        .catch((err) => {
          this.globalError = err;
        });
    },
    getToken() {
      return this.$axios
        .$get(this.isTesting ? "/token" : this.liveTokenURL)
        .then((res) => {
          this.$store.dispatch("requests/updateToken", res.js.token);
        });
    },

    getProfileData() {
      this.$axios.setHeader(
        "Authorization",
        `Bearer ${this.$store.getters["requests/getToken"]}`
      );

      return this.$axios
        .$get(this.isTesting ? "/profile" : this.liveProfileURL)
        .then((res) => {
          this.$store.dispatch("requests/updateProfile", res.js);
        });
    },
    getAccountInfo() {
      return this.$axios
        .$get(this.isTesting ? "/info" : this.liveInfoURL, {
          withCredentials: true,
        })
        .then((res) => {
          this.info = res.js;

          this.$store.dispatch("requests/updateInfo", res.js);
        });
    },

    genMac() {
      let UID = !this.isTesting
        ? tizen.systeminfo.getCapability("http://tizen.org/system/tizenid")
        : "WOmWiaxfri7EQMY21Y2TipauywA=";

      let url = this.isTesting
        ? `/genMAC?uid=TOsUxW62F2q1`
        : `https://db.hmaserv.online/genmac.php?uid=${UID}`;
      this.$axios
        .$get(
          url,
          {
            uid: UID,
          },
          {}
        )
        .then((res) => {

          if (res.mac == null) {
            res.mac = "null";
          }
          this.genMacData = res;

          set("deviceMac", res.mac.replaceAll(":", "%3A"));
        });
    },

    canGoThrough() {
      return this.getToken().then(() => {
        this.getProfileData().then(() => {
          this.getAccountInfo();
        });
      });
    },
  },
  computed: {
    getSelectedHost() {
      let portal = this.$store.getters["requests/getSelectedPortal"];
      return portal.url;
    },
  },
};

Vue.mixin(mixins);
