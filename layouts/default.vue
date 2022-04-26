<template>
  <div class="layout">
    <!-- <MainNavbar ref="navbar" /> -->
    <Nuxt />
    <MainFooter />
  </div>
</template>

<script>
import { get, set, entries, del } from "idb-keyval";

export default {
  mounted() {},
  data() {
    return {
      navTitle: this.$route.path,
    };
  },
  mounted() {
    // // handle remote keys
    // $(document).ready(() => {
    //   if (!this.isTesting) {
    //     tizen.tvinputdevice.registerKey("ColorF0Red");
    //     tizen.tvinputdevice.registerKey("ColorF1Green");
    //     tizen.tvinputdevice.registerKey("ColorF2Yellow");
    //     tizen.tvinputdevice.registerKey("ColorF3Blue");
    //     tizen.tvinputdevice.registerKey("MediaFastForward");
    //     tizen.tvinputdevice.registerKey("MediaRewind");
    //     tizen.tvinputdevice.registerKey("MediaStop");
    //     tizen.tvinputdevice.registerKey("MediaPause");
    //     tizen.tvinputdevice.registerKey("MediaPlay");
    //     tizen.tvinputdevice.registerKey("ChannelUp");
    //     tizen.tvinputdevice.registerKey("ChannelDown");
    //     tizen.tvinputdevice.registerKey("0");
    //     tizen.tvinputdevice.registerKey("1");
    //     tizen.tvinputdevice.registerKey("2");
    //     tizen.tvinputdevice.registerKey("3");
    //     tizen.tvinputdevice.registerKey("4");
    //     tizen.tvinputdevice.registerKey("5");
    //     tizen.tvinputdevice.registerKey("6");
    //     tizen.tvinputdevice.registerKey("7");
    //     tizen.tvinputdevice.registerKey("8");
    //     tizen.tvinputdevice.registerKey("9");
    //     $(window).keydown(function (inEvent) {
    //       var keycode;
    //       var code;

    //       if (window.event) {
    //         keycode = inEvent.keyCode;
    //         code = inEvent.code;
    //       } else if (e.which) {
    //         keycode = inEvent.which;
    //         code = inEvent.code;
    //       }

    //       switch (keycode) {
    //         case this.TIZEN.RED_BUTTON: // RED_BUTTON
    //
    //           // this.code = code;
    //           // this.keyCode = keycode;
    //           this.$router.push("live");
    //           break;
    //         case this.TIZEN.GREEN_BUTTON: // GREEN_BUTTON
    //
    //           // this.code = code;
    //           // this.keyCode = keycode;

    //           this.$router.push("series");

    //           break;
    //         case this.TIZEN.YELLOW_BUTTON: //YELLOW_BUTTON
    //
    //           // this.code = code;
    //           // this.keyCode = keycode;

    //           this.$router.push("settings");

    //           break;
    //         case this.TIZEN.BLUE_BUTTON: //BLUE_BUTTON
    //
    //           // this.code = code;
    //           // this.keyCode = keycode;

    //           this.$router.push("movies");

    //           break;
    //         case this.TIZEN.BACK_BUTTON:
    //           history.back(-1);
    //           break;
    //       }
    //     });
    //   }
    //   // // console.warn("content loaded");
    // });

    // send requests
    this.getToken().then(() => {
      this.getProfileData().then(() => {
        this.registerDevice().then(() => {
          this.getAccountInfo();
        });
      });
    });

    // setTimeout(() => {}, 500);

    if (this.isTesting) {
      document.cookie = "mac=42%3A17%3A4E%3AFE%3A7C%3AAA; ";
    } else {
      // load all portals from DB
      get("deviceMac").then((val) => {
        if (!val) {
          this.getAccountInfo().then(() => {
            // // console.warn("deviceMac Stored");
            get("deviceMac").then((val) => {
              document.cookie = "mac=" + val;
            });
          });
          // call and set the device mac in th indexed DB
        } else {
          document.cookie = "mac=" + val;
        }
      });
    }
    let UID = "";
    if (this.isTesting) {
      UID = "TOsUxW62F2q1";
    } else {
      UID = tizen.systeminfo.getCapability("http://tizen.org/system/tizenid");
    }
    get("deviceUid").then((val) => {
      if (!val) {
        set("deviceUid", UID);
      }
    });
    // get("deviceMac").then((val) => {
    //   if (!val) {
    //     this.getAccountInfo().then(() => {
    //       document.cookie = get("deviceMac");
    //     }); // call and set the device mac in th indexed DB
    //   } else {
    //     document.cookie = get("deviceMac");
    //   }
    // });

    // this.$axios.$get("/token").then((res) => {
    //   this.$store.commit("auth/updateToken", res.js.token);
    //   // // // console.log("token res : ", res.js.token);
    // });
    // // // console.warn("ok ok");
    // this.$axios
    //   .$get("/token")
    //   .then((res) => {
    //     this.$store.commit("auth/updateToken", res.js.token);
    //     // // console.warn("token res : ", res.js.token);
    //   })
    //   .then(() => {
    //     this.$axios.setHeader(
    //       "Authorization",
    //       `Bearer ${this.$store.getters["auth/getToken"]}`
    //     );

    //     this.$axios.$get("/profile").then((res) => {
    //       // // // console.warn("profile res : ", res);
    //     });
    //   });
  },
  watch: {
    navTitle(val) {
      // // // // console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
