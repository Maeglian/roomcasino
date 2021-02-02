<template>
  <section v-if="$route.query.code" class="ConfirmEmailPage">
    <div class="ConfirmEmailPage-Content">
      <div class="Text Text--additional ConfirmEmailPage-Text">
        <template v-if="!emailIsConfirmed && !emailConfirmError">
          We're trying to verify your email...
        </template>
        <Loader v-if="emailConfirmIsFetching" />
        <template v-if="emailConfirmError">
          Sorry, you email was not confirmed.
          <p class="Error ConfirmEmailPage-Text">
            {{ emailConfirmError }}
          </p>
        </template>
        <template v-if="emailIsConfirmed">
          Congratulations! Your email was successfully confirmed.
        </template>
      </div>
      <NuxtLink to="/" class="Btn Btn--common ConfirmEmailPage-Btn">
        Go to the home page
      </NuxtLink>
    </div>
  </section>
</template>

<script>
import Loader from '@/components/Loader';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'ConfirmEmail',
  components: {
    Loader,
  },
  beforeRouteEnter(to, from, next) {
    if (!to.query.code) next('/');
    next();
  },
  beforeRouteLeave(to, from, next) {
    this.clearEmailConfirmError();
    next();
  },
  layout: 'page',
  computed: {
    ...mapState(['emailConfirmError', 'emailConfirmIsFetching', 'emailIsConfirmed']),
  },
  mounted() {
    this.confirmEmail({ code: this.$route.query.code });
  },
  methods: {
    ...mapMutations(['clearEmailConfirmError']),
    ...mapActions(['confirmEmail']),
  },
};
</script>

<style lang="scss">
.ConfirmEmailPage {
  &-Content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
    padding-top: 32px;

    @media (min-width: $screen-s) {
      padding-top: 100px;
    }
  }

  &-Text {
    font-size: 18px;
    text-align: center;
  }

  &-Btn {
    width: 100%;
    margin-top: 70px;

    @media (min-width: $screen-s) {
      width: auto;
    }
  }
}
</style>
