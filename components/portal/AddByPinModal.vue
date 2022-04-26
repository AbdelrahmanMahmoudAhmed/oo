<template>
  <div
    class="modal"
    id="pinModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog h-100 d-flex align-items-center">
      <div class="modal-content our-modal p-4" @keydown="modalKeyDown">
        <div class="modal-header mx-auto border-0">
          <h5
            class="modal-title text-white fw-bold fs-3"
            id="exampleModalLabel"
          >
            Portal PIN
          </h5>
        </div>
        <div class="modal-body">
          <input
            class="our-input w-100 py-4 rounded border-0 ps-4 text-white active"
            id="addPinInput"
            type="password"
            v-model="pin"
            placeholder="Enter Portal PIN"
          />
        </div>
        <div class="modal-footer border-0 m-auto">
          <button
            class="rounded-pill active btn text-white fw-bold mx-4 fs-4"
            id="cancelPortalPin"
            type="button"
            data-bs-dismiss="modal"
          >
            <img
              class="img-btn me-2"
              src="~/assets/images/cancel.svg"
              alt="close"
            />Cancel
          </button>
          <button
            class="rounded-pill active btn text-white fw-bold mx-4 fs-4"
            id="savePortalPin"
            type="button"
            @click="saveClicked"
          >
            <img
              class="img-btn me-2"
              src="~/assets/images/save.svg"
              alt="save"
            />
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import settingsVue from "~/pages/settings.vue";
export default {
  mounted() {
    let pimModalElement = document.getElementById("pinModal");
    let pimModalInput = document.getElementById("addPinInput");
    pimModalElement.addEventListener("shown.bs.modal", function () {
      pimModalInput.focus();
    });
  },
  data() {
    return {
      pin: "",
    };
  },
  methods: {
    saveClicked() {
      this.$emit("save-clicked", this.pin);
    },

    modalKeyDown(event) {
      // // // console.warn("Active Element: ", document.activeElement);
      // alert("Clicked");
      switch (event.keyCode) {
        case this.TIZEN.LEFT_BUTTON:
          // left
          this.doModalLeft();
          break;

        case this.TIZEN.UP_BUTTON:
          // up
          this.goModalUp();
          // this.$refs["moviesList"].scrollToItem(this.activeElement - 3);
          break;

        case this.TIZEN.RIGHT_BUTTON:
          // right
          this.goModalRight();
          break;

        case this.TIZEN.DOWN_BUTTON:
          // down
          this.goModalDown();
          // this.$refs["moviesList"].scrollToItem(this.activeElement - 3);

          break;
        case this.TIZEN.OK_BUTTON: // enter .. OK
          // if (document.activeElement.getAttribute("id") == "cancelPortalPin") {
          setTimeout(() => {
            $(".modal-backdrop").css("display", "none");
            $("#pinModal").css("display", "none");

            $("#portalNickname").focus();
          }, 100);
          // }

          //   document.activeElement.click();
          //   this.lastClicked = document.activeElement.getAttribute("id");
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

    doModalLeft() {
      switch (document.activeElement.getAttribute("id")) {
        case "savePortalPin":
          document.getElementById("cancelPortalPin").focus();

          break;

        default:
          break;
      }
    },
    goModalUp() {
      document.getElementById("addPinInput").focus();
    },
    goModalRight() {
      // focus portal input
      switch (document.activeElement.getAttribute("id")) {
        case "cancelPortalPin":
          document.getElementById("savePortalPin").focus();

          break;

        default:
          break;
      }
    },
    goModalDown() {
      document.getElementById("cancelPortalPin").focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  overflow: hidden !important;
}
</style>
