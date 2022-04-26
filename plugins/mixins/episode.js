import Vue from "vue";

const mixins = {
  data() {
    return {};
  },
  computed: {
    getEpisodeLiveData() {
      // // console.log("getEpisodeLiveData: ", this.$store.getters["episode/getEpisodeData"]);
      return this.$store.getters["episode/getEpisodeData"];
    },
  },

  methods: {},
};

Vue.mixin(mixins);
