<template>
  <div
    class="modal fade"
    id="changePlayerModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog h-100 d-flex align-items-center">
      <div class="modal-content our-modal p-4">
        <div class="modal-header mx-auto border-0">
          <h5 class="modal-title text-white fw-bold" id="exampleModalLabel">
            Change Player
          </h5>
        </div>
        <div class="modal-body">
          <ul class="player-list">
            <li
              class="
                player-li
                active
                d-flex
                justify-content-between
                pt-4
                pb-3
                rounded
                mb-1
              "
              id="vlcPlayer"
            >
              <p class="text-white m-0 ms-4">VLC Player</p>
              <img
                class="check-img me-4"
                src="~/assets/images/check.png"
                alt="check"
              />
            </li>
            <li
              class="player-li d-flex justify-content-between pt-4 pb-3 rounded"
              id="exoPlayer"
            >
              <p class="text-white m-0 ms-4">Exo Player</p>
              <img
                class="check-img me-4"
                src="~/assets/images/check.png"
                alt="check"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
