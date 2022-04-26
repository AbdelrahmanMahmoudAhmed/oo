<template>
  <div>
  <MainNavbar ref="navbar"  />

<!-- <MainMoviesSidebar :categories="allMoviesCategories" :nowList="nowList" /> -->

<LockCategoriesSideBar />
</div>

</template>

<script>
import LookCategoriesModal from "~/components/settings/LookCategoriesModal.vue";
export default {
    mounted() {
        this.$refs["navbar"].currentPage = "Lock Categories";
    },
    data() {
        return {
            allMoviesCategories: ["dsad", "asdasdasd"]
        };
    },
    components: { LookCategoriesModal }
}
</script>

<style>

</style>
