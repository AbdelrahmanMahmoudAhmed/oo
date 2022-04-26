<template>
  <div class="col-2 mb-5">
    <div
      class="vod-card position-relative d-flex flex-column"
      :class="isActive ? 'active' : ''"
      :id="mainActiveElement"
      :data-id="movieData.id"
      :data-category="movieData.category_id"
      :data-list="whichList"
    >
      <nuxt-link :to="`movies/${movieData.id}`">
        <div class="vod-body" @click="updateData(movieData)">
          <img
            class="vod-img"
            loading="lazy"
            :src="movieData.screenshot_uri"
            alt="default"
          />
        </div>
        <h3
          class="vod-title text-center text-white mt-2 py-1"
          :title="movieData.name"
        >
          {{ movieData.name }}
        </h3>
        <div class="parent-vod-progress">
          <div
            class="vod-progress"
            :style="{ width: movieData.progress + '%' }"
          ></div>
        </div>
        <div class="vod-padge py-1 px-2">
          {{ movieData.show_date | formatDate }}
        </div>
      </nuxt-link>
      <img
        v-if="movieData.show_fav"
        class="fav-icon"
        src="/favred.svg"
        alt="fav"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["movieData", "isActive", "mainActiveElement", "whichList"],
  data() {
    return {
      all: {},
    };
  },
  methods: {
    updateData(data) {
      this.$store.commit("single-movies/resetMoviesLoading");
      this.$store.commit("single-movies/clearMovieData");
      this.getMovieDataLive(data);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.vod-body {
  height: 280px;
  img {
    height: 100% !important;
  }
}
.vod-card.active {
  border: 3px solid #b6012c;
  background-color: #b6012c;
  .vod-progress {
    background-color: #fff;
  }
}

.fav-icon {
  position: absolute;
  width: 40px;
  left: 10px;
  top: 10px;
}
</style>
