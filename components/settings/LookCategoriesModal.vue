<template>
  <div
    class="modal fade"
    id="lookModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog h-100 d-flex align-items-center">
      <div class="modal-content our-modal p-4">
        <div class="modal-headermodal-backdrop mx-auto border-0">
          <h5 class="modal-title text-white fw-bold" id="exampleModalLabel">
            Password
          </h5>
        </div>
        <div class="modal-body">
          <input
            class="our-input w-100 py-4 rounded border-0 ps-4 text-white active"
            id="lockCategoriesPassword"
            type="password"
            placeholder="Please write password"
          />
        </div>
        <div class="modal-footer border-0 m-auto">
          <button
            class="rounded-pill button-close active btn text-white fw-bold mx-4"
            id="cancelLookButton"
            type="button"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            @click="goToLook"
            class="rounded-pill btn text-white fw-bold mx-4"
            id="verifiedLookButton"
            type="button"
          >
            <nuxt-link class="btn text-white" to="look-catergories"
              >Ok</nuxt-link
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToLook() {
      document.querySelector(".modal-backdrop").remove();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
