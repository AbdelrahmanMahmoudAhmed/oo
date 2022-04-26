<template>
  <div class="container" style="">
    <h1 class="text-left ml-4 mb-4 pb-4" style="font-size: 50px">
      Days: {{ daysCount }}
    </h1>
  </div>
</template>

<script>
import moment from "moment";
export default {
  layout: "empty",
  data() {
    return {
      isTesting: false,
      isEmulator: false,
      token: "",
      error: "",
      profile: "",
      info: "",
      UID: "",
      genMacData: "",
      registerRes: "",
      daysCount: 0,
    };
  },
  mounted() {
    var a = moment("2022-02-02");
    var b = moment("2022-02-09");
    // a.diff(b, "days"); //

    // // console.warn('b.diff(a, "days"): ', b.diff(a, "days"));
    // // console.warn('a.diff(b, "days"): ', a.diff(b, "days"));
    this.daysCount = b.diff(a, "days");

    // if (this.isTesting) {
    //   this.UID = "TOsUxW62F2q1";
    // } else {
    //   this.UID = tizen.systeminfo.getCapability(
    //     "http://tizen.org/system/tizenid"
    //   );
    // }

    // const liveTokenURL =
    //   "http://mag.4k-ott.com/portal.php?type=stb&action=handshake&token=&JsHttpRequest=1-xml";
    // const liveProfileURL =
    //   "http://mag.4k-ott.com/portal.php?type=stb&action=get_profile&JsHttpRequest=1-xml";
    // const liveInfoURL =
    //   "http://mag.4k-ott.com/portal.php?type=account_info&action=get_main_info&JsHttpRequest=1-xml";

    // setTimeout(() => {
    //   this.$axios.setHeader("Access-Control-Allow-Origin", "*");
    //   this.$axios.setHeader(
    //     "Accept",
    //     "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
    //   );
    //   setTimeout(() => {
    //     this.$axios
    //       .$get(this.isTesting ? "/token" : liveTokenURL)
    //       .then((res) => {
    //         this.token = res.js.token;

    //         this.response = res;
    //       })
    //       .then(() => {
    //         this.$axios.setHeader("Authorization", `Bearer ${this.token}`);

    //         this.$axios
    //           .$get(this.isTesting ? "/profile" : liveProfileURL)
    //           .then((res) => {
    //             this.profile = res.js;
    //             // // console.warn(res.js);
    //           });
    //       })
    //       //   .then(() => {
    //       //     this.$axios.setHeader("Authorization", `Bearer ${this.token}`);

    //       //     this.$axios
    //       //       .$get(this.isTesting ? "/info" : liveInfoURL)
    //       //       .then((res) => {
    //       //         this.info = res.js;
    //       //         if (this.info.mac == null) {
    //       //           this.info.mac = "null";
    //       //         }
    //       //         // // console.warn(this.info.mac);
    //       //       });
    //       //   })
    //       .then(() => {
    //         let url = this.isTesting
    //           ? `/genMAC?uid=TOsUxW62F2q1`
    //           : `https://db.hmaserv.online/genmac.php?uid=${this.UID}`;
    //         this.$axios
    //           .$get(
    //             url,
    //             {
    //               uid: this.UID,
    //             },
    //             {}
    //           )
    //           .then((res) => {
    //             // // console.warn(res);

    //             if (res.mac == null) {
    //               res.mac = "null";
    //             }
    //             // this.mac = res.mac;
    //             this.genMacData = res;
    //           })
    //           .then(() => {
    //             //   /device
    //             // let url = this.isTesting
    //             //   ? `/device?portal_address=1&mac_address=1&uid=1`
    //             //   : `https://qslivetv.com/api/device`;

    //             // // // console.warn("url: ", url);

    //             // mac_address: this.genMacData.mac,
    //             this.$axios.setHeader("Accept", `application/json`);
    //             // let formattedMAC = this.genMacData.mac.replaceAll(":", "%3A");

    //             // XX TESTING ONLY XX
    //             if (this.isTesting) {
    //               this.UID = "WOmWiaxfri7EQMY21Y2TipauywA=";
    //               this.genMacData.mac = "da:c3:e0:06:aa:2d";
    //             }

    //             if (this.isEmulator && this.isTesting) {
    //               this.UID = "WOmWiaxfri7EQMY21Y2TipauywA=";
    //             }
    //             // XX TESTING ONLY XX

    //             this.$axios
    //               .$post("https://qslivetv.com/api/device", {
    //                 portal_address: "mag.4k-ott.com",
    //                 mac_address: this.genMacData.mac,
    //                 uid: this.UID,
    //                 username: "1",
    //                 password: "1",
    //                 firebase_token: "1",
    //               })
    //               .then((res) => {
    //                 // // console.warn("res: ", res);
    //                 this.registerRes = res;
    //               })
    //               .catch((err) => {
    //                 this.error = err;
    //               });

    //             // mac_address: this.genMacData.mac,
    //             // this.$axios
    //             //   .$post(url, {
    //             //     portal_address: "mag.4k-ott.com",
    //             //     mac_address: "12315321",
    //             //     uid: this.UID,
    //             //   })
    //             //   .then((res) => {
    //             //     // // console.warn("res: ", res);
    //             //     this.registerRes = res;
    //             //   });
    //           });
    //       })
    //       .catch((err) => {
    //         this.error = err;
    //       });
    //   }, 1000);
    // }, 1000);
  },
};
</script>

<style>
</style>
