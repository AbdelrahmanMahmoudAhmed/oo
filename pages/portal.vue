<template>
  <div>
    <MainNavbar ref="navbar" />

    <div class="row portal mx-0">
      <div class="col-4 left pt-5 ps-5">
        <h3 class="text-white">Choose Portal</h3>
        <button
          class="btn rounded-pill text-white fs-3 add-portal"
          id="0"
          @click="addPortalClicked"
          @keydown="itemKeyDown"
        >
          <img class="me-2" src="~/assets/images/add.svg" alt="add" />Add portal
        </button>
        <ul
          class="portal-list mt-5 pe-4"
          id="portalList"
          @keydown="itemKeyDown"
        >
          <PortalSelect
            :class="{ focused: item.id == lastClicked }"
            :id="index + 1"
            v-for="(item, index) in allPortalsList"
            :key="item.name"
            :portal="item"
            :isActive="item.name == connectedPortal.name"
            :isFocused="index + 1 == lastClicked && enterClicked"
            :tabindex="index"
            @portalClicked="portalClicked"
            @portalDBLClicked="portalDBLClicked"
          />
        </ul>
      </div>
      <div class="col-8 right">
        <div class="information text-end mt-4 me-5">
          <p class="text-white fs-5 mb-1">App Version: 1.5.0</p>
          <p class="text-white fs-5 mb-1">
            {{ storedMac }}
          </p>
        </div>
        <div
          class="
            portal-info
            d-flex
            flex-column
            justify-content-center
            align-items-center
          "
        >
          <img class="logo mb-2" src="~/assets/images/logo.svg" alt="logo" />

          <div class="w-100 my-3"></div>
          <div
            class="alert text-danger my-1 w-100 text-center h3"
            v-if="error || globalError"
          >
            {{ error + " " + globalError }}
          </div>

          <!-- <div
            class="alert text-success my-1 w-100 text-center h3"
            v-if="successMessage"
          >
            {{ successMessage }}
          </div> -->

          <PortalFormField
            ref="portalForm"
            @focusBack="focusBack"
            @focusFirstButton="focusFirstButton"
          />
          <div
            class="
              buttons-collection
              mt-5
              d-flex
              flex-wrap
              justify-content-around
              w-100
            "
            id="buttonsRow"
          >
            <!-- :class="{ 'd-none': button.type != viewState }" -->
            <button
              v-for="(button, i) in portalButtons"
              @click="handleButtonAction(button.action)"
              :hidden="button.type != viewState"
              @keydown="buttonsKeyDown"
              :key="i"
              :id="button.action"
              class="btn rounded-pill text-white fs-3 add-portal mb-4"
              :data-bs-toggle="button.target.accept ? 'modal' : false"
              :data-bs-target="button.target ? button.target.modal : ''"
            >
              <template v-if="button.img">
                <img
                  class="me-1"
                  :src="require(`~/assets/images/${button.img}.svg`)"
                  alt="add"
                />
              </template>
              {{ button.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <PortalAddByPinModal ref="addPinModal" @save-clicked="loadFromPin" />
  </div>
</template>

<script>
import { get, set, entries, del } from "idb-keyval";

export default {
  beforeMount() {
    if (document.getElementsByClassName("header-search").length) {
      document
        .getElementsByClassName("header-search")[0]
        .classList.add("d-none");
    }
  },
  mounted() {
    $(document).ready(() => {
      this.$refs["navbar"].currentPage = "Portal Settings";

      if (document.getElementById("navbarTitle").length) {
        document.getElementById("navbarTitle").textContent = this.pageTitle;
      }
      if (!this.isTesting) {
        // send requests
        this.getToken().then(() => {
          this.getProfileData().then(() => {
            this.registerDevice().then(() => {
              this.getAccountInfo();
            });
          });
        });

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

    this.loadFromDB();

    setTimeout(() => {
      get("deviceMac").then((val) => {
        if (!val) {
          this.genMac().then(() => {
            get("deviceMac").then((val) => {
              this.storedMac = val.replaceAll("%3A", ":");
            });
          });
        } else {
          this.storedMac = val.replaceAll("%3A", ":");
          // // console.warn(this.storedMac);
        }
      });
    }, 500);
  },
  data() {
    return {
      pageTitle: "Portal Settings",
      enterClicked: false,
      storedMac: "",
      currentMac: "",
      connectedPortal: { name: "", url: "" },
      activePortal: "",
      viewState: "add",
      allPortalsList: [],
      currentActiveId: 2,
      portalButtons: [
        {
          name: "Add Manual",
          img: "save",
          target: { accept: false },
          type: "add",
          isVisible: true,
          action: "addManual",
        },
        {
          name: "Delete",
          img: "delete",
          type: "edit",
          target: { accept: false },
          isVisible: false,
          action: "delete",
        },
        {
          name: "Add By Pin",
          type: "add",
          img: null,
          target: { accept: true, modal: "#pinModal" },
          isVisible: true,
          action: "addByPin",
        },
        {
          name: "Update",
          type: "edit",
          img: "update",
          target: { accept: false },
          isVisible: false,
          action: "update",
        },
        {
          name: "Connect",
          type: "edit",
          img: "connect",
          target: { accept: false },
          isVisible: false,
          action: "connect",
        },
      ],
      error: "",
      successMessage: "",
      lastClicked: 0,
    };
  },
  methods: {
    handleButtonAction(action) {
      // // console.warn("action: ", action);
      let id = this.activePortal.id;
      switch (action) {
        case "delete":
          this.allPortalsList = this.allPortalsList.filter((x) => x.id != id);
          del(id).then(() => {
            this.activePortal = "";
            this.viewState = "add";

            this.$refs["portalForm"].portal = { name: "", url: "" };

            // // console.warn("delete: ", this.activePortal);
            // focus first portal in list
            if (document.querySelectorAll(".portal-li").length) {
              document.querySelectorAll(".portal-li")[0].focus();
              // set active element from the last clicked one
              // // console.warn("lastclicked: ", this.lastClicked);
            } else {
              // document.getElementById("portalNickname").focus();
            }
          });
          break;

        case "update":
          // get new values
          // // console.warn("id: ", id);
          let updatedPortal = this.$refs["portalForm"].portal;
          get(id).then((val) => set(id, updatedPortal));
          this.allPortalsList.find((x) => x.id == id).name = updatedPortal.name;
          this.allPortalsList.find((x) => x.id == id).url = updatedPortal.url;

          // // console.warn("update: ", updatedPortal);
          break;

        case "addManual":
          let item = this.$refs["portalForm"].portal;
          if (item.name && item.url) {
            item.isActive = false;
            item.id = `qslive.portals.0.${item.name}`.toLowerCase();
            item.fromPin = false;

            set(item.id, item).then(() => {
              if (this.allPortalsList.indexOf(item) == -1) {
                this.allPortalsList.push(item);
              }
              this.$refs["portalForm"].portal = { name: "", url: "" };
              this.loadFromDB();
            });
          }

          break;
        case "addByPin":
          $(".modal-backdrop").css("display", "block");
          $("#pinModal").css("display", "block");
          setTimeout(() => {
            $("#addPinInput").focus();
          }, 300);
          break;

        case "connect":
          this.canGoThrough().then(() => {
            this.activePortal.isActive = true;
            this.connectedPortal = { ...this.activePortal };
            this.selectedHost = this.activePortal.url;
            // // console.warn("this.selectedHost: ", this.selectedHost);

            set(this.connectedPortal.id, this.connectedPortal).then(() => {
              // this.allPortalsList.find(
              //   (x) => x.id == this.connectedPortal.id
              // ).isActive = true;
              this.updateDB();
            });
            this.$store.commit("live/updateLiveShowLoading", true);

            this.$router.push("loading-live");
          });

          break;

        default:
          break;
      }
    },
    loadFromPin(pin) {
      // close modal
      document.getElementById("cancelPortalPin").click();

      this.$refs["addPinModal"].pin = "";
      // request
      let requestPinUrl = `https://qslivetv.com/api/shortcodes/${pin}`;

      this.$axios.get(requestPinUrl).then((res) => {
        // // console.warn("pin res: ", res);
        if (res.data.status) {
          this.error = "";
          let listFromPin = res.data.data;
          // store in the DB
          listFromPin.forEach((item) => {
            item.isActive = false;
            item.fromPin = true;
            item.id = `qslive.portals.${pin}.${item.name}`.toLowerCase();
            get(item.id).then((val) => {
              // // console.warn("val: ", val);

              if (!val) {
                // // console.warn("Not Found");
                set(item.id, item).then(() => {
                  this.showSuccessMessage(res.data.message);
                  this.allPortalsList.push(item);
                });
              }
            });
          });
        } else {
          this.error = res.data.message;
        }
      });
    },
    portalClicked(portal) {
      this.viewState = "edit";
      let currentPortal = { ...portal };
      this.activePortal = portal;
      this.$refs["portalForm"].portal = currentPortal;
      // focus input
      // document.getElementById("portalNickname").focus();
      setTimeout(() => {
        document.getElementById("connect").focus();
      }, 200);
    },
    portalDBLClicked(portal) {
      this.viewState = "edit";
      let currentPortal = { ...portal };
      this.activePortal = portal;
      this.$refs["portalForm"].portal = currentPortal;
      // focus input
      // document.getElementById("portalNickname").focus();
      setTimeout(() => {
        document.getElementById("connect").click();
      }, 200);
    },
    showSuccessMessage(msg) {
      this.successMessage = msg;
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
    },
    showErrorMessage(msg) {
      this.error = msg;
      setTimeout(() => {
        this.error = "";
      }, 5000);
    },
    addPortalClicked() {
      this.viewState = "add";
      this.activePortal = "";
      this.$refs["portalForm"].portal = { name: "", url: "" };
    },
    loadFromDB() {
      entries().then((allData) => {
        // // // console.warn("allData: ", allData);
        let storedPortals = allData
          .filter((x) => x[0].includes("qslive.portals"))
          .map((x) => x[1]);

        // let arrangedPortals = storedPortals.reverse();

        // this.allPortalsList = arrangedPortals;
        this.allPortalsList = storedPortals;

        let connectedPortal = this.allPortalsList.find(
          (item) => item.isActive == true
        );

        if (connectedPortal) {
          this.connectedPortal = connectedPortal;

          this.selectedHost = this.connectedPortal.url;
        }
        setTimeout(() => {
          if (document.querySelectorAll(".portal-li").length) {
            let firstPortal = document.querySelectorAll(".portal-li")[0];
            firstPortal.focus();
            this.lastClicked = firstPortal.getAttribute("id");
          } else {
            document.getElementById("portalNickname").focus();
          }
          // // // console.warn("LI", document.querySelectorAll(".portal-li")[0]);
        }, 500);
      });
    },

    updateDB() {
      entries().then((allData) => {
        // // console.warn("allData: ", allData);
        let storedPortals = allData
          .filter((x) => x[0].includes("qslive.portals"))
          .map((x) => x[1]);

        // // console.warn("storedPortals: ", storedPortals);
        let otherPortals = storedPortals.filter(
          (x) => x.id != this.connectedPortal.id
        );
        for (let index = 0; index < otherPortals.length; index++) {
          const element = otherPortals[index];
          element.isActive = false;
          set(element.id, element);
        }

        //  check if there is a connected one
        // this.connectedPortal.name =
        //   this.allPortalsList.filter((item) => item.isActive == true).name || "";
      });
    },

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
          event.preventDefault();
          this.enterClicked = true;
          if (document.activeElement.getAttribute("id") == "0") {
            // focus name input
            this.viewState = "add";
            this.$refs["portalForm"].portal = { name: "", url: "" };
            document.getElementById("portalNickname").focus();
          } else {
            document.activeElement.click();
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

    buttonsKeyDown(event) {
      // // // console.warn("Active Element: ", document.activeElement);
      // alert("Clicked");
      switch (event.keyCode) {
        case this.TIZEN.LEFT_BUTTON:
          // left
          this.doButtonLeft();
          break;

        case this.TIZEN.UP_BUTTON:
          // up
          this.goButtonUp();
          // this.$refs["moviesList"].scrollToItem(this.activeElement - 3);
          break;

        case this.TIZEN.RIGHT_BUTTON:
          // right
          this.goButtonRight();
          break;

        case this.TIZEN.DOWN_BUTTON:
          // down
          this.goButtonDown();
          // this.$refs["moviesList"].scrollToItem(this.activeElement - 3);

          break;
        case this.TIZEN.OK_BUTTON: // enter .. OK
          document.activeElement.click();
          // this.lastClicked = document.activeElement.getAttribute("id");
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
    doLeft() {},
    goUp() {
      let currentId = document.activeElement.getAttribute("id") - 1 + 1;
      if (currentId > 0) {
        // // console.warn("currentId: ", currentId);
        document.getElementById(currentId - 1).focus();
        this.lastClicked = document.activeElement.getAttribute("id");
      }
    },
    goRight() {
      // focus portal input
      document.getElementById("portalNickname").focus();
    },
    goDown() {
      let currentId = document.activeElement.getAttribute("id") - 1 + 1;
      if (currentId < this.allPortalsList.length) {
        // // console.warn("currentId: ", currentId);
        document.getElementById(currentId + 1).focus();
        this.lastClicked = document.activeElement.getAttribute("id");
      }
      // if (this.activeElement < this.categories.length - 1) {
      //   this.activeElement += 1;
      //   return;
      // }
    },

    doButtonLeft() {
      let currentButtonId = document.activeElement.getAttribute("id");
      if (this.viewState == "add") {
        // focus next button
        switch (currentButtonId) {
          case "addManual":
            this.focusBack();

            break;
          case "addByPin":
            document.getElementById("addManual").focus();
            break;

          default:
            break;
        }
      } else {
        // update state view
        switch (currentButtonId) {
          case "delete":
            this.focusBack();

            break;
          case "update":
            document.getElementById("delete").focus();
            break;
          case "connect":
            document.getElementById("update").focus();
            break;

          default:
            break;
        }
      }
    },
    goButtonUp() {
      // focus portal url
      document.getElementById("portalURL").focus();
    },
    goButtonRight() {
      let currentButtonId = document.activeElement.getAttribute("id");
      if (this.viewState == "add") {
        // focus next button
        switch (currentButtonId) {
          case "addManual":
            document.getElementById("addByPin").focus();
            break;

          default:
            break;
        }
      } else {
        // update state view
        switch (currentButtonId) {
          case "delete":
            document.getElementById("update").focus();

            break;
          case "update":
            document.getElementById("connect").focus();
            break;
          case "connect":
            break;

          default:
            break;
        }
      }
    },
    goButtonDown() {},
    focusBack() {
      this.enterClicked = false;

      if (document.getElementById(this.lastClicked)) {
        document.getElementById(this.lastClicked).focus();
      } else {
        if (document.querySelectorAll(".portal-li").length) {
          // // console.warn("found List");
          document.querySelectorAll(".portal-li")[0].focus();
        } else {
          document.getElementById("0").focus();
        }
        // document.getElementById(this.lastClicked).focus();
      }
    },
    focusFirstButton() {
      if (this.viewState == "add") {
        document.getElementById("addManual").focus();
      } else {
        document.getElementById("delete").focus();
      }
    },
  },
  computed: {
    savedMac() {
      let mac = "";
      get("deviceMac")
        .then((val) => {
          mac = val;
        })
        .then(() => {
          // // console.warn("saved mac: ", mac);
          return mac;
        });
    },
  },
  watch: {
    connectedPortal(val) {
      if (val.url) {
        this.$store.dispatch("requests/updateSelectedPortal", val.url);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

