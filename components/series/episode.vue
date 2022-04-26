<template>
  <div class="episode-content">
    <b-button
      :id="index"
      class="btn episode-link fw-bold fs-4 px-4 me-3 mb-3"
      :class="isActive ? 'active' : ''"
      v-b-modal="`modal-${index}`"
    >
      {{
        "S" +
        number.padStart(2, 0) +
        " E" +
        (index + 1).toString().padStart(2, 0)
      }}</b-button
    >

    <b-modal @hide="triggerModal" centered :id="`modal-${index}`">
      <p
        class="my-4 fs-1 text-white text-center"
        style="margin-top: -40px !important"
      >
        Select Type {{ index }}
      </p>
      <div class="text-center">
        <button
          class="play-player btn btn-light text-black fw-bold me-3"
          :class="activeSingle ? 'active' : ''"
          style="width: 200px; height: 70px; font-size: 26px"
          @keydown="togglePlayer($event)"
        >
          <img
            class="me-2"
            :src="activeSingle ? '/movies-w.svg' : '/movies.svg'"
            alt="playlist"
            style="height: 40px"
          />
          Single
        </button>
        <button
          class="playlist-player btn btn-light text-black fw-bold"
          :class="activePlaylist ? 'active' : ''"
          style="width: 200px; height: 70px; font-size: 26px"
          @keydown="togglePlayer($event)"
        >
          <img
            class="me-2"
            :src="activeSingle ? '/movies.svg' : '/movies-w.svg'"
            alt="playlist"
            style="height: 40px"
          />
          PlayList
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  mounted() {},
  props: ["number", "index", "isActive"],
  data() {
    return {
      activeSingle: true,
      activePlaylist: false,
    };
  },
  methods: {
    togglePlayer(e) {
      if (e.keyCode == this.TIZEN.RIGHT_BUTTON) {
        this.activeSingle = false;
        this.activePlaylist = true;
        $(".playlist-player").focus();
      } else if (e.keyCode == this.TIZEN.LEFT_BUTTON) {
        this.activeSingle = true;
        this.activePlaylist = false;
        $(".play-player").focus();
      } else {
        return;
      }
    },
    triggerModal() {
      this.$emit("triggerModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.episode-content {
  width: 12%;
  margin-right: 0.5%;
}
#modalContainer {
  display: flex !important;
}
.episode-link {
  color: #000 !important;
}
.episode-link.active {
  border: 4px solid #b6012c !important;
  background-color: #fff !important;
}

.modal {
  display: flex !important;
  align-items: center;
}

.play-player.active {
  background-color: #b6012c !important;
  color: #fff !important;
  border-color: #b6012c !important;
}

.playlist-player.active {
  background-color: #b6012c !important;
  color: #fff !important;
  border-color: #b6012c !important;
}
</style>
