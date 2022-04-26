import Vue from "vue";

const mixins = {
  computed: {
    getSeriesAllData() {
      return this.$store.getters["single-series/getSeriesData"];
    },
    getLoadingSingleSeriesData() {
      return this.$store.getters["single-series/getLoadingSingleSeriesData"];
    },
  },

  methods: {
    getSeriesDataLive(data) {
      this.$axios
        .$get(
          this.isTesting
            ? `/singleSeries?type=SearchSeries&title=${data.name}`
            : `${this.liveSingleSeries}?type=SearchSeries&title=${data.name}`
        )
        .then((res) => {
          this.$store.commit("single-series/updateSeriesDataLive", {
            newData: res.data,
            oldData: data,
          });
        });
    },
  },
};

Vue.mixin(mixins);
