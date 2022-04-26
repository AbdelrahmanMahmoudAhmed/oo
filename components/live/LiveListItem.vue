<template>
  <div class="list-li list-item text-white" :class="isActive ? 'active' : ''">
    <nuxt-link class="movie-cat-link" to="" :id="id" :data-page="page">
      <img v-if="img" :src="'/' + img" alt="fav" />
      {{ title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    page: [Number, String],
    id: String,
    isActive: Boolean,
    name: String,
    activeElement: Number,
    title: "",
    img: String,
    index: {
      // index of current item
      type: Number,
    },
    source: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.list-li {
  position: relative;
  font-size: 18px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 4px;
  width: 93%;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-left: 12px;
  margin-left: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  img {
    width: 25px;
    margin-top: -4px;
    margin-right: 5px;
  }
  a {
    text-decoration: none;
    color: #fff;
    display: block;
  }
}
.list-li {
  &.active {
    background: rgb(182, 1, 44) !important;
    background: linear-gradient(
      90deg,
      rgba(182, 1, 44, 1) 0%,
      rgba(145, 1, 35, 1) 64%,
      rgba(91, 1, 22, 1) 100%
    ) !important;

    &.isOpen {
      background: rgb(182, 1, 44) !important;
      background: linear-gradient(
        90deg,
        rgba(182, 1, 44, 1) 0%,
        rgba(145, 1, 35, 1) 64%,
        rgba(91, 1, 22, 1) 100%
      ) !important;
    }
  }
  &.isOpen {
    background: linear-gradient(
      90deg,
      rgba(122, 1, 44, 1) 0%,
      rgba(105, 1, 35, 1) 64%,
      rgba(91, 1, 22, 1) 100%
    );
  }
}
</style>
