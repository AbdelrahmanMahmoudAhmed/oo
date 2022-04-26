<template>
  <li
    class="portal-li text-white px-2 py-4 mb-3"
    :class="isActive ? 'active' : isFocused ? 'focused' : ''"
    style="cursor: pointer"
    @click="portalClicked"
    @dblclick="portalDBLClicked"
  >
    <div class="text-white d-flex justify-content-around align-items-center">
      <p class="fs-3 m-0 px-4" style="width: 50%">{{ portal.name }}</p>
      <div style="width: 50%">
        <p class="m-0 fs-5">
          Portal URL: {{ portal.fromPin ? "****" : portal.url }}
        </p>
        <p class="m-0 fs-5">Expire Date: {{ portal.expireDate }}</p>
      </div>
      <img src="~/assets/images/go.svg" alt="go" />
    </div>
    <img
      v-if="isActive"
      class="ellipse"
      src="/GREEN_BUTTON-icon.svg"
      alt="ellipse-9"
    />
    <img
      v-else
      class="ellipse"
      src="~/assets/images/ellipse-9.svg"
      alt="ellipse-9"
    />
  </li>
</template>

<script>
export default {
  props: ["portal", "isActive", "isFocused"],
  data() {
    return {};
  },
  methods: {
    portalClicked() {
      this.$emit("portalClicked", this.portal);
    },
    portalDBLClicked() {
      this.$emit("portalDBLClicked", this.portal);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
