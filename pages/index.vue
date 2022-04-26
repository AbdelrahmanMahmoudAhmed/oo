<template>
  <div class="home-bg">
    <nuxt-link class="go-home" to="loading-live"></nuxt-link>
    <img class="home-logo" src="~/assets/images/logo.svg" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: "QS Live",
      navTitle: this.$route.path,
    };
  },
  watch: {
    navTitle(val) {},
  },
  mounted() {
    if (document.getElementById("navbarTitle")) {
      document.getElementById("navbarTitle").textContent = this.pageTitle;
    }
  },
  name: "IndexPage",
};
</script>
