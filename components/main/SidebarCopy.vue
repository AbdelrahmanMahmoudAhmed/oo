<template>
  <div class="col-2 sidebar">
    <div>
      <ul class="live-categories-list mb-0" id="liveCategories">
        <li class="list-li favorite text-white" id="sidebarSearchButton">
          <nuxt-link to="">
            <img src="~/assets/images/search-w.svg" alt="fav" /> Search
          </nuxt-link>
        </li>
        <li class="list-li favorite text-white" id="sidebarFavoriteButton">
          <nuxt-link to="">
            <img src="~/assets/images/fav.svg" alt="fav" /> Favourite
          </nuxt-link>
        </li>
        <!-- <li
          v-for="(category, i) in categories"
          :key="i"
          class="list-li text-white"
          id="1"
          tabindex="1"
        >
          <nuxt-link to="">
            {{ category.name + " " + i }}
          </nuxt-link>
        </li> -->
      </ul>
      <RecycleScroller
        class="scroller"
        :items="categories"
        :item-size="47"
        key-field="stream_id"
        ref="moviesList"
      >
        <!-- :active="activeElement == index" -->
        <template v-slot="{ item, index }">
          <div
            :data-index="index"
            class="list-li list-item text-white"
            :class="{ active: activeElement == index }"
            :id="`movieList${index}`"
            @keydown="listClick($event)"
          >
            <!-- :tabindex="index" -->
            <nuxt-link to="">
              {{ item.name }}
            </nuxt-link>
          </div>
        </template>
      </RecycleScroller>
    </div>
  </div>
</template>

<script>
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
export default {
  mounted() {
    setTimeout(() => {}, 1000);
  },
  props: ["categories"],
  data() {
    return {
      activeElement: 3,
    };
  },
  methods: {
    listClick(event) {
      switch (event.keyCode) {
        case this.TIZEN.LEFT_BUTTON:
          // left
          this.doLeft();
          break;

        case this.TIZEN.UP_BUTTON:
          // up
          this.goUp();
          this.$refs["moviesList"].scrollToItem(this.activeElement - 6);

          break;

        case this.TIZEN.RIGHT_BUTTON:
          // right
          this.goRight();
          break;

        case this.TIZEN.DOWN_BUTTON:
          // down
          this.goDown();
          this.$refs["moviesList"].scrollToItem(this.activeElement - 6);

          break;

        // Global Keys
        case this.TIZEN.RED_BUTTON: // RED_BUTTON
          this.$router.push("live");
          break;
        case this.TIZEN.GREEN_BUTTON: // GREEN_BUTTON
          this.$router.push("series");

          break;
        case this.TIZEN.YELLOW_BUTTON: //YELLOW_BUTTON
          this.$router.push("settings");

          break;
        case this.TIZEN.BLUE_BUTTON: //BLUE_BUTTON
          this.$router.push("movies");

          break;
        case this.TIZEN.BACK_BUTTON:
          history.back(-1);
          break;

        default:
          return;
      }
    },

    doLeft() {
      this.activeElement -= 1;
    },
    goUp() {
      this.activeElement -= 1;
    },
    goRight() {
      this.activeElement += 1;
    },
    goDown() {
      this.activeElement += 1;
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
  a {
    text-decoration: none;
    color: #fff;
    display: block;
  }
}
.list-li.active {
  background: rgb(182, 1, 44);
  background: linear-gradient(
    90deg,
    rgba(182, 1, 44, 1) 0%,
    rgba(145, 1, 35, 1) 64%,
    rgba(91, 1, 22, 1) 100%
  );
}
</style>
