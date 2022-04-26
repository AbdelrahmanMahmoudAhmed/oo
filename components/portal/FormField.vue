<template>
  <div class="form-inputs w-100" @keydown="itemKeyDown">
    <div class="input-group mb-3 form-floating">
      <span class="input-group-text" id="basic-addon1"
        ><img src="~/assets/images/portal.svg" alt="portal"
      /></span>
      <input
        class="form-control"
        id="portalNickname"
        type="text"
        placeholder=""
        value=""
        aria-label="Nickname"
        v-model="portal.name"
        aria-describedby="basic-addon1"
      />
      <label class="text-white float-label" for="floatingInputGrid"
        >Portal nickname</label
      >
    </div>
    <div class="input-group mb-3 form-floating">
      <span class="input-group-text" id="basic-addon1"
        ><img src="~/assets/images/url.svg" alt="portal"
      /></span>
      <input
        id="portalURL"
        class="form-control"
        type="text"
        placeholder=""
        aria-label="URL"
        aria-describedby="basic-addon1"
        v-model="hiddenUrl"
        readonly
        v-if="portal.fromPin"
      />

      <input
        id="portalURL"
        v-else
        class="form-control"
        type="text"
        placeholder=""
        aria-label="URL"
        aria-describedby="basic-addon1"
        v-model="portal.url"
      />
      <label class="text-white float-label" for="floatingInputGrid"
        >Portal URL</label
      >
    </div>
    <!-- <div class="uid text-center py-2">
      <p class="text-white fs-5 mb-1" id="uid">Uid</p>
      <p class="text-white fs-5 mb-1" id="uidText">b243531149508add</p>
    </div> -->
  </div>
</template>

<script>
export default {
  mounted() {
    // // console.warn("portal; ", this.portal);
  },
  data() {
    return {
      hiddenUrl: "******",
      portal: { name: "", url: "" },
    };
  },
  methods: {
    itemKeyDown(event) {
      // // // console.warn("Active Element: ", document.activeElement);
      // alert("Clicked");
      switch (event.keyCode) {
        case this.TIZEN.LEFT_BUTTON:
          // left
          this.doLeft();
          break;

        case this.TIZEN.UP_BUTTON:
          // up
          this.goUp();
          // this.$refs["moviesList"].scrollToItem(this.activeElement - 3);
          break;

        case this.TIZEN.RIGHT_BUTTON:
          // right
          this.goRight();
          break;

        case this.TIZEN.DOWN_BUTTON:
          // down
          this.goDown();
          // this.$refs["moviesList"].scrollToItem(this.activeElement - 3);

          break;
        case this.TIZEN.OK_BUTTON: // enter .. OK
          // alert("Hello From the Form");
          document.activeElement.click();
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
    doLeft() {
      this.$emit("focusBack");
    },
    goUp() {
      switch (document.activeElement.getAttribute("id")) {
        case "portalURL":
          document.getElementById("portalNickname").focus();
          break;

        default:
          break;
      }
    },
    goRight() {},
    goDown() {
      switch (document.activeElement.getAttribute("id")) {
        case "portalNickname":
          document.getElementById("portalURL").focus();
          break;
        case "portalURL":
          this.$emit("focusFirstButton");
          break;

        default:
          break;
      }

      // if (this.activeElement < this.categories.length - 1) {
      //   this.activeElement += 1;
      //   return;
      // }
    },
  },
  // props: ["portal"],
  computed: {
    checkPortalUrl() {
      return this.portal.fromPin ? "****" : this.portal.url;
    },
  },
  watch: {
    portal(val) {
      // // console.warn(val);
      // val.url
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
