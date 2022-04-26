<template>
  <footer class="footer">
    <div class="container-fluid h-100">
      <ul
        class="
          footer-list
          d-flex
          justify-content-center
          align-items-center
          ps-0
          mb-0
          h-100
        "
      >
        <li class="list-li me-5" v-for="(link, i) in footerLinks" :key="i">
          <nuxt-link class="text-white text-capitalize" :to="`/${link.name}`">
            <span
              class="color text-capitalize"
              :class="`${link.name}-color`"
            ></span>
            {{ link.name }}
          </nuxt-link>
        </li>
        <li v-if="hideFav" class="list-li me-5 fav">
          <nuxt-link class="text-white" to="">
            <img
              class="me-1 fav"
              src="~/assets/images/favred.svg"
              alt="favred"
            />
            Press 5 to add to favourite
          </nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      params: this.$route.params,
      hideFav: true,
      footerLinks: [
        { name: "settings" },
        { name: "live" },
        { name: "movies" },
        { name: "series" },
      ],
    };
  },
  created() {},
  watch: {
    $route(to, from) {
      if (to.params.name) {
        this.hideFav = false;
      } else {
        this.hideFav = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
