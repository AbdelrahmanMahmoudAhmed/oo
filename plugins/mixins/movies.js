import { get, set, entries, del, setMany } from "idb-keyval";

import Vue from "vue";

const mixins = {
  data() {
    return {
      moviesIsLoading: true,
      moviesSearchText: "",
      pageSearchLoad: true,
      pageLoad: true,
    };
  },
  computed: {
    allMoviesCategories() {
      return this.$store.getters["movies/getAllCategories"];
    },
    allMoviesStreams() {
      return this.$store.getters["movies/getMoviesStreams"];
    },
    selectedMoviesCategoryId() {
      return this.$store.getters["movies/getCategoryId"];
    },
  },

  methods: {
    changePageSearchLoad() {
      this.pageSearchLoad = true;
    },
    getMoviesStreams(id, page, text) {
      if (text) {
        this.moviesIsLoading = true;
        this.$store.commit("movies/updateCategoryId", "search");
        let loadedPage = this.allMoviesCategories.find((x) => x.id == id).page;
        if (this.pageSearchLoad) {
          this.pageSearchLoad = false;
          this.$axios
            .$get(
              this.isTesting
                ? `/moviesStreams&category=*&p=${loadedPage}&search=${text}&sortby=added`
                : `${this.liveMoviesStreams}&category=*&p=${loadedPage}&search=${text}&sortby=added`
            )
            .then((res) => {
              loadedPage += 1;
              let maxPage = +(res.js.total_items / 14).toFixed(0);
              let categoryData = res.js.data;
              categoryData.forEach((el) => {
                el.show_date = el.added.substring(0, 11);
              });
              let allItemsInArray = this.allMoviesCategories.find(
                (x) => x.id == id
              ).movies;
              let endLoad = false;

              this.$store.commit("movies/updateMoviesStreams", {
                max_page: maxPage,
                categoryId: "search",
                categoryData,
                page: loadedPage,
                search: "search",
              });
              if (res.js.total_items == allItemsInArray.length) {
                endLoad = true;
              }
              return endLoad;
            })
            .then((res) => {
              this.moviesIsLoading = false;
              this.pageSearchLoad = true;
            });
        }
      } else if (id == "fav") {
        this.$store.commit("movies/updateCategoryId", id);
        get("favorite.movies").then((val) => {
          this.$store.commit("movies/updateMoviesStreams", {
            max_page: val.length,
            categoryId: id,
            categoryData: val,
            page: page,
          });
        });
      } else {
        this.moviesIsLoading = true;
        this.$store.commit("movies/updateCategoryId", id);
        if (!page) {
          page = this.allMoviesCategories.find((x) => x.id == id).page; //0
          page += 1;
        }
        if (this.pageLoad) {
          this.pageLoad = false;
          this.$axios
            .$get(
              this.isTesting
                ? `/moviesStreams&category=${id}&p=${page}&sortby=added`
                : `${this.liveMoviesStreams}&category=${id}p=${page}&sortby=added`
            )
            .then((res) => {
              let maxPage = +(res.js.total_items / 14).toFixed(0);
              let categoryData = res.js.data;

              categoryData.forEach((el) => {
                el.show_date = el.added.substring(0, 11);
                el.show_fav = false;
              });

              get("favorite.movies")
                .then((val) => {
                  if (val) {
                    for (let index = 0; index < val.length; index++) {
                      const favoriteMovie = val[index];
                      let currentMovie = categoryData.find(
                        (x) => x.id == favoriteMovie.id
                      );
                      if (currentMovie) {
                        // // console.log("movie Found");
                        currentMovie.show_fav = true;
                      }
                    }
                  }
                })
                .then(() => {
                  this.$store.commit("movies/updateMoviesStreams", {
                    max_page: maxPage,
                    categoryId: id,
                    categoryData,
                    page: page,
                  });
                });

              // setTimeout(() => {

              // }, 500);
            })
            .then(() => {
              this.moviesIsLoading = false;
              this.pageLoad = true;
            });
        }
      }
    },
  },
};

Vue.mixin(mixins);
