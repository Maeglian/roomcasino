<template>
  <section v-if="$route.query.code" class="ConfirmEmailPage">
    <div class="ConfirmEmailPage-Content">
      <div class="Text Text--additional ConfirmEmailPage-Text">
        <template v-if="!emailIsConfirmed && !emailConfirmError">
          {{ $t('auth.tryingConfirmEmail') }}...
        </template>
        <Loader v-if="emailConfirmIsFetching" />
        <template v-if="emailConfirmError">
          {{ $t('auth.confirmEmailError') }}.
          <p class="Error ConfirmEmailPage-Text">
            {{ emailConfirmError }}
          </p>
          <NuxtLink :to="localePath('/')" class="Btn Btn--common ConfirmEmailPage-Btn">
            {{ $t('buttons.goHomePage') }}
          </NuxtLink>
        </template>
        <template v-if="emailIsConfirmed">
          <p class="ConfirmEmailPage-Text">{{ $t('auth.confirmEmailSuccess') }}.</p>
          <button class="Btn Btn--common ConfirmEmailPage-Btn" @click="$modal.show('cashier')">
            {{ $t('buttons.letsStart') }}!
          </button>
        </template>
      </div>
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
    this.confirmEmail({ code: this.$route.query.code }).then(() => {
      if (this.emailIsConfirmed) {
        this.timer = setTimeout(() => {
          this.$modal.show('cashier');
        }, 3000);
      }
    });
  },
  beforeDestroy() {
    clearTimeout(this.timer);
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
