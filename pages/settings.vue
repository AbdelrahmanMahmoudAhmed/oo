<template>
  <div>
    <MainNavbar />

    <div class="setting d-flex justify-content-center align-items-center">
      <div class="settings d-flex justify-content-start flex-wrap">
        <div
          class="
            setting-card
            d-flex
            align-items-center
            justify-content-center
            me-4
            mb-5
          "
          v-for="(setting, i) in allSetings"
          :key="i"
          @keydown="handleItemKeyDown"
        >
          <div
            :tabindex="i"
            :id="i"
            :data-bs-toggle="setting.target.accept ? 'modal' : false"
            :data-bs-target="setting.target.modal"
            :to="setting.href"
            class="
              item
              w-100
              h-100
              d-flex
              flex-column
              align-items-center
              justify-content-center
            "
          >
            <img
              class="mb-3"
              :src="require(`~/assets/images/${setting.img}.svg`)"
              alt="player"
            />
            <h3 class="text-white">{{ setting.name }}</h3>
          </div>
        </div>
      </div>
    </div>
    <SettingsChangePlayerModal />
    <SettingsUserInfoModal />
    <SettingsLookCategoriesModal />
    <SettingsChangePasswordModal />
  </div>
</template>

<script>
export default {
  mounted() {
    if (document.getElementById("navbarTitle")) {
      document.getElementById("navbarTitle").textContent = this.pageTitle;
    }

    // setTimeout(() => {
    //   }, 1000);
    $(document).ready(() => {
      // // console.warn("this.$refs: ", this.$nuxt.$refs);
      document.getElementById("0").focus();

      if (!this.isTesting) {
        tizen.tvinputdevice.registerKey("ColorF0Red");
        tizen.tvinputdevice.registerKey("ColorF1Green");
        tizen.tvinputdevice.registerKey("ColorF2Yellow");
        tizen.tvinputdevice.registerKey("ColorF3Blue");
        tizen.tvinputdevice.registerKey("MediaFastForward");
        tizen.tvinputdevice.registerKey("MediaRewind");
        tizen.tvinputdevice.registerKey("MediaStop");
        tizen.tvinputdevice.registerKey("MediaPause");
        tizen.tvinputdevice.registerKey("MediaPlay");
        tizen.tvinputdevice.registerKey("ChannelUp");
        tizen.tvinputdevice.registerKey("ChannelDown");
        tizen.tvinputdevice.registerKey("0");
        tizen.tvinputdevice.registerKey("1");
        tizen.tvinputdevice.registerKey("2");
        tizen.tvinputdevice.registerKey("3");
        tizen.tvinputdevice.registerKey("4");
        tizen.tvinputdevice.registerKey("5");
        tizen.tvinputdevice.registerKey("6");
        tizen.tvinputdevice.registerKey("7");
        tizen.tvinputdevice.registerKey("8");
        tizen.tvinputdevice.registerKey("9");
        $(window).keydown(function (inEvent) {
          var keycode;
          var code;

          if (window.event) {
            keycode = inEvent.keyCode;
            code = inEvent.code;
          } else if (e.which) {
            keycode = inEvent.which;
            code = inEvent.code;
          }

          switch (keycode) {
            case this.TIZEN.RED_BUTTON: // RED_BUTTON
              // this.code = code;
              // this.keyCode = keycode;
              this.$router.push("live");
              break;
            case this.TIZEN.GREEN_BUTTON: // GREEN_BUTTON
              // this.code = code;
              // this.keyCode = keycode;

              this.$router.push("series");

              break;
            case this.TIZEN.YELLOW_BUTTON: //YELLOW_BUTTON
              // this.code = code;
              // this.keyCode = keycode;

              this.$router.push("settings");

              break;
            case this.TIZEN.BLUE_BUTTON: //BLUE_BUTTON
              // this.code = code;
              // this.keyCode = keycode;

              this.$router.push("movies");

              break;
            case this.TIZEN.BACK_BUTTON:
              history.back(-1);
              break;
          }
        });
      }
      // // console.warn("content loaded");
    });
  },
  data() {
    return {
      pageTitle: "Settings",
      allSetings: [
        {
          name: "Change Player",
          img: "player",
          target: { accept: true, modal: "#changePlayerModal" },
          href: "",
        },
        {
          name: "User Info",
          img: "user-info",
          target: { accept: true, modal: "#userInfoModal" },
          href: "",
        },
        {
          name: "Reload list",
          img: "reload",
          target: { accept: false },
          href: "",
        },
        {
          name: "Portal setting",
          img: "settings",
          target: { accept: false },
          href: "portal",
        },
        {
          name: "Lock categories",
          img: "lock-categories",
          target: { accept: true, modal: "#lookModal" },
          href: "",
        },
        {
          name: "Change password",
          img: "change-password",
          target: { accept: true, modal: "#changePasswordModal" },
          href: "",
        },
        {
          name: "Logout",
          img: "logout",
          target: { accept: false },
          href: "",
        },
      ],
    };
  },
  methods: {
    handleItemKeyDown(event) {
      // // console.warn("keyCode: ", event.keyCode);
      let currentId = $(document.activeElement).attr("id") - 1 + 1;
      switch (event.keyCode) {
        case this.TIZEN.LEFT_BUTTON:
          // left
          if (currentId != 0) {
            $(`#${currentId - 1}`).focus();
          }
          break;

        case this.TIZEN.UP_BUTTON:
          // up
          if ($(`#${currentId - 4}`).length) {
            $(`#${currentId - 4}`).focus();
          } else {
            $("#" + 0).focus();
          }
          break;

        case this.TIZEN.RIGHT_BUTTON:
          // right
          if (currentId != this.allSetings.length - 1) {
            $(`#${currentId + 1}`).focus();
          }
          break;

        case this.TIZEN.DOWN_BUTTON:
          // down
          if ($(`#${currentId + 4}`).length) {
            // // console.warn("Down not found");

            $(`#${currentId + 4}`).focus();
          } else {
            $(`#${this.allSetings.length - 1}`).focus();
          }

          break;

        case this.TIZEN.OK_BUTTON:
          // goToPage
          let toRoute = $(document.activeElement).attr("to");

          if (toRoute) {
            this.$router.push(toRoute);
          }
          break;

        // Global Keys
        case this.TIZEN.RED_BUTTON: // RED_BUTTON
          // this.code = code;
          // this.keyCode = keycode;
          this.$router.push("live");
          break;
        case this.TIZEN.GREEN_BUTTON: // GREEN_BUTTON
          // this.code = code;
          // this.keyCode = keycode;

          this.$router.push("series");

          break;
        case this.TIZEN.YELLOW_BUTTON: //YELLOW_BUTTON
          // this.code = code;
          // this.keyCode = keycode;

          this.$router.push("settings");

          break;
        case this.TIZEN.BLUE_BUTTON: //BLUE_BUTTON
          // this.code = code;
          // this.keyCode = keycode;

          this.$router.push("movies");

          break;
        case this.TIZEN.BACK_BUTTON:
          history.back(-1);
          break;

        default:
          return;
      }
    },
  },
  toGoPage(link) {
    this.$router.push(link);
  },
};
</script>

<style lang="scss" scoped>
</style>
