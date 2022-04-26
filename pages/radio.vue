<template>
  <div class="page-type radio">
    <div class="row w-100 h-100 ms-0">
      <div class="col-6 left ps-0">
        <ul class="radio-list mt-4" id="radioList">
          <li
            v-for="(radio, i) in radioList"
            :key="i"
            class="my-2 py-3 ps-3 radio-li"
          >
            <nuxt-link class="text-white" to="">
              <p class="m-0">
                <span v-html="(i + 1).toString().padStart(4, 0)"> </span>
                {{ radio.name }}
              </p>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div
        class="
          col-6
          right
          d-flex
          flex-column
          justify-content-center
          align-items-end
        "
      >
        <h4 class="text-white fw-bold fs-3 img-head">21:47 22 December 2021</h4>
        <div class="radio-img">
          <img src="~/assets/images/equalizer.png" alt="equalizer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioList: [
        { name: "Radio Name" },
        { name: "Radio Name" },
        { name: "Radio Name" },
        { name: "Radio Name" },
        { name: "Radio Name" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
