<template>
  <div class="row page-type me-0 lock">
    <div class="col-2 lock-sidebar">
      <ul class="lock-list pt-3">
        <li class="lock-li py-2 ps-5 rounded mb-2">
          <nuxt-link
            class="lock-link d-flex align-items-center justify-content-start"
            to=""
          >
            <img
              class="me-3 lock-img"
              src="~/assets/images/series-w.svg"
              alt="series"
            />
            <p class="m-0 fs-4">Series</p>
          </nuxt-link>
        </li>
        <li class="lock-li py-2 ps-5 rounded mb-2">
          <nuxt-link
            class="lock-link d-flex align-items-center justify-content-start"
            to=""
          >
            <img
              class="me-3 lock-img"
              src="~/assets/images/movies-w.svg"
              alt="series"
            />
            <p class="m-0 fs-4">Movies</p>
          </nuxt-link>
        </li>
        <li class="lock-li active py-2 ps-5 rounded mb-2">
          <nuxt-link
            class="lock-link d-flex align-items-center justify-content-start"
            to=""
          >
            <img
              class="me-3 lock-img"
              src="~/assets/images/live-w.svg"
              alt="series"
            />
            <p class="m-0 fs-4">Live</p></nuxt-link
          >
        </li>
      </ul>
    </div>
    <div class="col-10 lock-page" id="lock">
      <ul class="categories-list p-0 d-flex justify-content-between flex-wrap">
        <li
          v-for="(item, i) in alldata"
          :key="i"
          class="categories-li d-flex align-items-center w-50 ps-4 py-3"
        >
          <p class="text-white m-0 fs-3 me-4">
            {{ item.name }}
            <img
              v-if="item.look_img"
              class="categories-img"
              src="~/assets/images/lock.svg"
              alt="lock-categories"
            />
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alldata: [
        { name: "[ASIA] INDIA", look_img: true },
        { name: "[ASIA] INDIA", look_img: true },
        { name: "[ASIA] INDIA", look_img: false },
        { name: "[ASIA] INDIA", look_img: true },
        { name: "[ASIA] INDIA", look_img: true },
        { name: "[ASIA] INDIA", look_img: false },
        { name: "[ASIA] INDIA", look_img: true },
        { name: "[ASIA] INDIA", look_img: true },
        { name: "[ASIA] INDIA", look_img: true },
        { name: "[ASIA] INDIA", look_img: false },
        { name: "[ASIA] INDIA", look_img: true },
        { name: "[ASIA] INDIA", look_img: false },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
