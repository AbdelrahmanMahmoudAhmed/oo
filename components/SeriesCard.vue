<template>
  <div class="col-2 mb-5">
    <div
      class="series-card position-relative d-flex flex-column"
      :class="isActive ? 'active' : ''"
      :id="mainActiveElement"
      :data-id="seriesData.id"
      :data-category="seriesData.category_id"
    >
      <nuxt-link :to="`series/${seriesData.id}`" class="series-path">
        <div class="series-body" @click="updateData(seriesData)">
          <img
            class="series-img"
            loading="lazy"
            :src="seriesData.screenshot_uri"
            alt="default"
          />
        </div>
        <h3
          class="series-title text-center text-white mt-2 py-1"
          :title="seriesData.name"
        >
          {{ seriesData.name }}
        </h3>
        <div class="parent-series-progress">
          <div
            class="series-progress"
            :style="{ width: seriesData.progress + '%' }"
          ></div>
        </div>
        <div class="series-padge py-1 px-2">
          {{ seriesData.show_date | formatDate }}
        </div>
      </nuxt-link>
      <img
        v-if="seriesData.show_fav"
        class="fav-icon"
        src="/favred.svg"
        alt="fav"
      />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  props: ["seriesData", "isActive", "mainActiveElement"],
  data() {
    return {};
  },
  methods: {
    updateData(data) {
      this.$store.commit("single-series/resetSeriesLoading");
      this.$store.commit("single-series/clearSeriesData");
      this.getSeriesDataLive(data);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.series-body {
  height: 280px;
  img {
    height: 100% !important;
  }
}
.series-card.active {
  border: 3px solid #b6012c;
  background-color: #b6012c;
  .series-progress {
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
