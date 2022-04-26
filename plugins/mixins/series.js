import { get, set, entries, del, setMany } from "idb-keyval";

import Vue from "vue";

const mixins = {
  data() {
    return {
      seriesIsLoading: true,
      seriesSearchText: "",
      pageSearchLoad: true,
      pageLoad: true
    }
  },
  computed: {
    allSeriesCategories() {
      return this.$store.getters["series/getAllCategories"];
    },
    allSeriesStreams() {
      return this.$store.getters["series/getSeriesStreams"];
    },
    selectedSeriesCategoryId() {
      return this.$store.getters["series/getCategoryId"];
    }
  },
  methods: {
    changePageSearchLoad() {
      this.pageSearchLoad = true
    },
    getSeriesStreams(id, page, text) {

      if (text) {
        this.seriesIsLoading = true
        this.$store.commit("series/updateCategoryId", "search");
        let loadedPage = this.allSeriesCategories.find(x => x.id == id).page

        if (this.pageSearchLoad) {
          this.pageSearchLoad = false
          this.$axios
            .$get(
              this.isTesting
                ? `/seriesStreams&category=*&p=${loadedPage}&search=${text}&sortby=added`
                : `${this.liveSeriesStreams}&category=*&p=${loadedPage}&search=${text}&sortby=added`
              // ? `/seriesStreams&category=${id}`
              // : `${this.liveSeriesStreams}&category=${id}`
            )
            .then(res => {
              loadedPage += 1
              let maxPage = +(res.js.total_items / 14).toFixed(0)
              let categoryData = res.js.data
              categoryData.forEach(el => {
                el.show_date = el.added.substring(0, 11)
              });
              let allItemsInArray = this.allSeriesCategories.find(x => x.id == id).series
              let endLoad = false
              this.$store.commit("series/updateSeriesStreams", { max_page: maxPage, categoryId: "search", categoryData, page: loadedPage, search: "search" });
              if (res.js.total_items == allItemsInArray.length) {
                endLoad = true
              }
              return endLoad
            }).then(res => {
              this.seriesIsLoading = false
              // if (res) {
              //   this.pageSearchLoad = false
              // } else {
              //   this.pageSearchLoad = true
              // }
              this.pageSearchLoad = true
            })
        }
      } else if (id == "fav") {
        this.$store.commit("series/updateCategoryId", id);
        get("favorite.series").then((val) => {
          this.$store.commit("series/updateSeriesStreams", { max_page: val.length, categoryId: id, categoryData: val, page: page });
        })
      } else {

        this.seriesIsLoading = true
        this.$store.commit("series/updateCategoryId", id);
        if (!page) {
          page = this.allSeriesCategories.find(x => x.id == id).page //0
          page += 1
        }
        if (this.pageLoad) {
          this.pageLoad = false
          this.$axios
            .$get(
              this.isTesting
                ? `/seriesStreams&category=${id}&p=${page}&sortby=added`
                : `${this.liveSeriesStreams}&category=${id}p=${page}&sortby=added`
            )
            .then((res) => {
              let maxPage = +(res.js.total_items / 14).toFixed(0)
              let categoryData = res.js.data



              categoryData.forEach(el => {
                el.show_date = el.added.substring(0, 11)
                el.show_fav = false
              });


              get("favorite.series").then((val) => {
                if (val) {
                  for (let index = 0; index < val.length; index++) {
                    const favoriteSeries = val[index];
                    let currentSeries = categoryData.find(x => x.id == favoriteSeries.id)
                    if (currentSeries) {
                      currentSeries.show_fav = true
                    }
                  }
                }
              })
                .then(() => {
                  this.$store.commit("series/updateSeriesStreams", { max_page: maxPage, categoryId: id, categoryData, page: page });

                })







            }).then(() => {
              this.seriesIsLoading = false
              this.pageLoad = true
            })
        }
      }
    },
  },
};

Vue.mixin(mixins);
