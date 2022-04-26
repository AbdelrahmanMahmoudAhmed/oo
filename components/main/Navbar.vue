<template>
  <nav class="navbar navbar-dark main-bg-color">
    <div class="container-fluid">
      <div class="row header w-100">
        <div class="d-flex align-items-center col-2">
          <h3 class="header-head ms-4 text-capitalize" id="navbarTitle">
            {{ currentPage }}
          </h3>
        </div>
        <div class="d-flex flex-column justify-content-center col-4">
          <form
            @keydown="searchData($event)"
            class="d-flex header-search d-none"
            id="searchForm"
          >
            <input
              class="form-control me-2 rounded-pill"
              id="searchField"
              autocomplete="false"
              type="text"
              placeholder="Pres 0 to search"
              aria-label="Search"
              v-model="searchText"
            />
            <img class="search-img" src="/search.svg" alt="search" />
          </form>
        </div>
        <div class="d-flex col-6 justify-content-end">
          <nuxt-link to="/">
            <img
              class="logo w-100 h-100"
              src="~/assets/images/logo.svg"
              alt="logo"
              width="30"
              height="24"
            />
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      currentPage: "",
      searchText: "",
    };
  },
  methods: {
    searchData(e) {
      if (e.keyCode == this.TIZEN.OK_BUTTON) {
        this.$emit("search", this.searchText);
        let focusedElement = document.querySelectorAll("body")[0];
        setTimeout(() => {
          document.getElementById("searchField").blur();
          focusedElement.focus();
        }, 100);
        e.preventDefault();
      }
    },
  },
  mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.navbar {
  min-height: 75px;
}

.search-img {
  cursor: pointer;
  width: 30px;
  height: 30px;
}
</style>
