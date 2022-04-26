<template>
  <nuxt-link
    class="btn season-link fw-bold fs-4 px-4 me-3 mb-3"
    :class="isActive ? 'active' : ''"
    :to="`${$route.path}/season/${num}`"
    >Season {{ num }}</nuxt-link
  >
</template>

<script>
export default {
  props: ["num", "isActive"],
  methods: {},
};
</script>

<style lang="scss" scoped>
.season-link.active {
  background-color: #b6012c;
  color: #fff;
}
</style>
