<template>
  <section class="ErrorPage NotAllowed">
    <div class="ErrorPage-Content NotAllowed-Content">
      <img class="ErrorPage-Image" src="@/assets/img/joker_sad.png" alt="Page not found" />
      <h1 class="Title Title--type-h1 ErrorPage-Title">
        Oops
      </h1>
      <div class="Text Text--additional ErrorPage-Text">
        Access denied. You don't have permission to access this page.
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NotAllowed',
  middleware({ store, redirect }) {
    if (store.state.siteIsAllowedForUser) {
      return redirect('/');
    }
  },
};
</script>

<style lang="scss">
.NotAllowed {
  &-Content {
    @media (min-width: $screen-s) {
      padding-top: 120px;
      background-position: center 70px;
    }
  }
}
</style>
