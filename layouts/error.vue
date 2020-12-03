<template>
  <section class="ErrorPage">
    <MainNav />
    <div class="ErrorPage-Content">
      <template v-if="error.statusCode === 404">
        <img class="ErrorPage-Image" src="@/assets/img/not-found.png" alt="Page not found" />
        <h1 class="Title Title--type-h1 ErrorPage-Title">
          Page you were looking for was not found
        </h1>
        <div class="Text Text--additional ErrorPage-Text">
          Sorry, we coudn't find the page you were looking for. We suggest that you return to main
          page.
        </div>
      </template>
      <template v-else>
        <h1 class="Title Title--type-h1 ErrorPage-Title">
          An error occurred
        </h1>
      </template>
      <NuxtLink to="/" class="Btn Btn--common ErrorPage-Btn">
        Go to the home page
      </NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
.ErrorPage {
  &-Title {
    margin-bottom: 12px;
    line-height: 1.27;
    text-align: center;
    color: var(--color-text-main);

    @media (min-width: $screen-s) {
      width: 559px / $screen-xl * 100%;
      margin-bottom: 17px;
    }
  }

  &-Content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 32px;

    @media (min-width: $screen-s) {
      padding-top: 75px;
      background-image: url(../assets/img/notfound-bg.png);
      background-repeat: no-repeat;
      background-position: center 23px;
      background-size: contain;
    }
  }

  &-Image {
    width: 210px;
    margin-bottom: 24px;

    @media (min-width: $screen-s) {
      width: auto;
      margin-bottom: 32px;
    }
  }

  &-Text {
    text-align: center;

    @media (min-width: $screen-s) {
      width: 559px / $screen-xl * 100%;
      margin-bottom: 44px;
    }
  }

  &-Btn {
    width: 100%;
    margin-top: 38px;

    @media (min-width: $screen-s) {
      width: auto;
    }
  }
}
</style>
