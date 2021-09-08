<template>
  <div
    class="Modal"
    :class="{
      'AuthDialog--login': activeTab === 'login' || isLoggedIn,
    }"
  >
    <div class="Close Modal-Close" @click="$emit('close')"></div>
    <div class="AuthDialog">
      <div
        v-if="activeTab === 'registration' && !isLoggedIn"
        class="AuthDialog-Banner"
        :class="`AuthDialog-Banner--${$i18n.locale}`"
      >
        <div class="AuthDialog-BannerTitle" v-html="$t('auth.signUpTitle')"></div>
        <div class="AuthDialog-Subtitle">
          {{ $t('auth.bonus') }} <span v-if="$i18n.locale !== 'fi'" class="Colored">+</span>
          {{ $t('auth.freeSpins') }}
        </div>
        <div class="AuthDialog-BannerFeatures">
          <div class="AuthDialog-BannerFeature">
            <svg class="AuthDialog-BannerFeatureIcon" width="30" height="30">
              <use xlink:href="@/assets/img/icons.svg#promotions"></use>
            </svg>
            <div class="AuthDialog-BannerFeatureName" v-html="$t('auth.features.first')"></div>
          </div>
          <div class="AuthDialog-BannerFeature">
            <svg class="AuthDialog-BannerFeatureIcon" width="33" height="30">
              <use xlink:href="@/assets/img/icons.svg#chat"></use>
            </svg>
            <div class="AuthDialog-BannerFeatureName" v-html="$t('auth.features.second')"></div>
          </div>
          <div class="AuthDialog-BannerFeature">
            <svg class="AuthDialog-BannerFeatureIcon" width="39" height="36">
              <use xlink:href="@/assets/img/icons.svg#cashout"></use>
            </svg>
            <div class="AuthDialog-BannerFeatureName" v-html="$t('auth.features.third')"></div>
          </div>
        </div>
      </div>
      <div
        class="AuthDialog-Main"
        :class="
          activeTab === 'registration' && !isLoggedIn
            ? 'AuthDialog-Main--registration'
            : 'AuthDialog-Main--login'
        "
      >
        <BaseTabs
          v-if="!beforeDeposit && authStatus !== 'success'"
          class="AuthDialog-Tabs"
          :items="tabs"
          :current-item="activeTab"
          @choose-tab="toggleRegistration"
        />
        <template v-if="beforeDeposit || activeTab === 'registration'">
          <RegistrationForm
            :before-deposit="beforeDeposit"
            :before-start-game="beforeStartGame"
            @close="$emit('close')"
            @redirect-login="activeTab = 'login'"
            @open-cashier="$modal.show('cashier', { gameId: id, demo })"
            @start-game="getGame({ gameId: id, demo })"
          />
        </template>
        <template v-else>
          <LoginForm
            :before-start-game="beforeStartGame"
            @close="$emit('close')"
            @start-game="openGamePage({ id, demo }, gameProducer)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import BaseTabs from '@/components/base/BaseTabs';
import openGame from '@/mixins/openGame';

const RegistrationForm = () => import('@/components/homepage/AuthDialog/RegistrationForm.vue');
const LoginForm = () => import('@/components/homepage/AuthDialog/LoginForm.vue');

export default {
  name: 'AuthDialog',
  components: {
    LoginForm,
    RegistrationForm,
    BaseTabs,
  },
  mixins: [openGame],
  props: {
    authType: {
      type: String,
      required: false,
      default: 'registration',
    },
    beforeDeposit: {
      type: Boolean,
      required: false,
      default: false,
    },
    beforeStartGame: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: String,
      required: false,
      default: '',
    },
    demo: {
      type: Boolean,
      required: false,
      default: true,
    },
    bg: {
      type: String,
      required: false,
      default: '',
    },
    gameProducer: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      tabs: [
        {
          value: 'registration',
          name: this.$t('buttons.signUp'),
        },
        {
          value: 'login',
          name: this.$t('buttons.login'),
        },
      ],
      activeTab: 'registration',
    };
  },
  computed: {
    ...mapState(['authStatus']),
  },
  mounted() {
    this.activeTab = this.authType;
  },
  methods: {
    ...mapMutations(['removeAuthError']),

    toggleRegistration(e) {
      this.removeAuthError();
      this.activeTab = e;
    },
  },
};
</script>

<style lang="scss">
@import 'AuthDialog.scss';
</style>
