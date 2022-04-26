<template>
  <div
    class="w-100 d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <p style="font-size: 90px" v-if="code">{{ code }} => {{ keyCode }}</p>
  </div>
</template>

<script>
export default {
  layout: "empty",
  beforeMount() {
    document
      .getElementsByTagName("body")[0]
      .addEventListener("keydown", this.handleKeyDown);
  },
  mounted() {
    $(document).ready(() => {
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
            case this.TIZEN.RED_BUTTON:
              this.code = code;
              this.keyCode = keycode;
              //   this.$router.push('/movies')
              break;
            case this.TIZEN.GREEN_BUTTON:
              this.code = code;

              // this.$router.push('/movies')
              this.keyCode = keycode;

              break;
            case this.TIZEN.YELLOW_BUTTON:
              this.code = code;

              // this.$router.push('/movies')
              this.keyCode = keycode;

              break;
            case this.TIZEN.BLUE_BUTTON:
              this.code = code;

              // this.$router.push('/movies')
              this.keyCode = keycode;

              break;
            case this.TIZEN.BACK_BUTTON:
              this.code = code;

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
      keyCode: "",
      code: "",
    };
  },
  methods: {
    handleKeyDown(e) {
      this.keyCode = e.keyCode;
      this.code = e.code;
      if (!this.isTesting) {
        switch (e.keyCode) {
          case tizen.tvinputdevice.getKey("ColorF0Red").code:
            // Something you want to do
            this.keyCode = e.keyCode;
            this.code = e.code;
            break;

          case tizen.tvinputdevice.getKey("ColorF1Green").code:
            // Something you want to do
            this.keyCode = e.keyCode;
            this.code = e.code;
            break;
          case tizen.tvinputdevice.getKey("ColorF2Yellow").code:
            // Something you want to do
            this.keyCode = e.keyCode;
            this.code = e.code;
            break;
          case tizen.tvinputdevice.getKey("ColorF3Blue").code:
            // Something you want to do
            this.keyCode = e.keyCode;
            this.code = e.code;
            break;
        }
        // // console.warn("e keyCode: ", e.keyCode);
      }
    },
  },
};
</script>

<style>
</style>