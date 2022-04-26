import Vue from "vue";

const mixins = {
  computed: {
    getMovieAllData() {
      return this.$store.getters["single-movies/getMovieData"];
    },
    getLoadingSingleMovieData() {
      return this.$store.getters["single-movies/getLoadingSingleMovieData"];
    },
  },

  methods: {
    getMovieDataLive(data) {
      this.$axios
        .$get(
          this.isTesting
            ? `/singleMovie?type=SearchMovie&title=${data.name}`
            : `${this.liveSingleMovie}?type=SearchMovie&title=${data.name}`
        )
        .then((res) => {
          this.$store.commit("single-movies/updateMovieDataLive", {
            newData: res.data,
            oldData: data,
          });
        });
    },
  },
};

Vue.mixin(mixins);
