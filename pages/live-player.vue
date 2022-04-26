<template>
  <!-- <div class="live-player-container" style="background: url('/test.jpg')"> -->
  <div class="live-player-container p-2">
    <div class="live-bar">
      <div class="live-info d-flex justify-content-between">
        <div class="left-info d-flex">
          <img class="me-5" src="/logo.svg" alt="logo" />
          <div>
            <p class="mb-0 text-white">013</p>
            <p class="mb-0 text-white">[MA] [HD] MEDI 1 MAGHREB HD</p>
          </div>
        </div>
        <div class="right-info">
          <img src="/timeshift.svg" alt="timeshift" />
        </div>
      </div>
      <div class="live-more-info text-white d-flex justify-content-between">
        <h3>Luca 24</h3>
        <div class="d-flex">
          <p class="mp-0 me-3">17:00</p>
          <p class="mp-0">17:00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "player",
};
</script>

<style lang="scss" scoped>
.live-player-container {
  background-color: #000;
  background-size: cover;
  height: 100vh;
  .live-bar {
    .live-info {
      .right-info {
        margin-right: 100px;
      }
    }
  }
}
</style>
