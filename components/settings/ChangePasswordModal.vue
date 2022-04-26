<template>
  <div
    class="modal fade"
    id="changePasswordModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog h-100 d-flex align-items-center">
      <div class="modal-content our-modal p-4">
        <div class="modal-header mx-auto border-0">
          <h5 class="modal-title text-white fw-bold" id="exampleModalLabel">
            Change Password
          </h5>
        </div>
        <div class="modal-body">
          <input
            class="
              our-input
              w-100
              py-3
              rounded
              border-0
              ps-4
              text-white
              mb-1
              active
            "
            id="changePasswordOldPassword"
            type="password"
            placeholder="Old password"
          />
          <input
            class="our-input w-100 py-3 rounded border-0 ps-4 text-white mb-1"
            id="changePasswordNewPassword"
            type="password"
            placeholder="New password"
          />
          <input
            class="our-input w-100 py-3 rounded border-0 ps-4 text-white mb-1"
            id="changePasswordConfirmPassword"
            type="password"
            placeholder="Confirm password"
          />
        </div>
        <div class="modal-footer border-0 m-auto">
          <button
            class="rounded-pill active btn text-white fw-bold mx-4"
            id="cancelChangePasswordButton"
            type="button"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            class="rounded-pill btn text-white fw-bold mx-4"
            id="verifiedChangePasswordButton"
            type="button"
          >
            <a class="btn text-white" href="lock-categories.html">Ok</a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
