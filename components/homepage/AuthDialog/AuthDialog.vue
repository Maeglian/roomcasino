<template>
  <div
    class="Modal"
    :class="{ 'AuthDialog--login': activeTab === 'login' || beforeDeposit || beforeStartGame }"
  >
    <div class="Close Modal-Close" @click="$emit('close')"></div>
    <div class="AuthDialog">
      <div
        v-if="activeTab === 'registration' && !beforeDeposit && !beforeStartGame"
        class="AuthDialog-Banner"
        :class="`AuthDialog-Banner--${$i18n.locale}`"
      >
        <div class="AuthDialog-BannerTitle" v-html="$t('auth.signUpTitle')"></div>
        <div class="AuthDialog-Subtitle">
          {{ $t('auth.bonus') }} <span class="Colored">+</span> {{ $t('auth.freeSpins') }}
        </div>
        <div class="AuthDialog-BannerFeatures">
          <div class="AuthDialog-BannerFeature">
            <div class="AuthDialog-BannerFeatureIcon">
              <img src="@/assets/img/bonus.svg" />
            </div>
            <div class="AuthDialog-BannerFeatureName" v-html="$t('auth.features.first')"></div>
          </div>
          <div class="AuthDialog-BannerFeature">
            <div class="AuthDialog-BannerFeatureIcon">
              <img class="AuthDialog-BannerFeatureIcon" src="@/assets/img/auth-chat.svg" />
            </div>
            <div class="AuthDialog-BannerFeatureName" v-html="$t('auth.features.second')"></div>
          </div>
          <div class="AuthDialog-BannerFeature">
            <div class="AuthDialog-BannerFeatureIcon">
              <img class="AuthDialog-BannerFeatureIcon" src="@/assets/img/cashout.svg" />
            </div>
            <div class="AuthDialog-BannerFeatureName" v-html="$t('auth.features.third')"></div>
          </div>
        </div>
      </div>
      <div
        class="AuthDialog-Main"
        :class="
          activeTab === 'registration' && !beforeDeposit && !beforeStartGame
            ? 'AuthDialog-Main--registration'
            : 'AuthDialog-Main--login'
        "
      >
        <BaseTabs
          v-if="!beforeDeposit && !beforeStartGame"
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
            @profile-updated="onUpdateProfile({ gameId: id, demo, bg })"
          />
        </template>
        <template v-else>
          <LoginForm @close="$emit('close')" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import BaseTabs from '@/components/base/BaseTabs';

const RegistrationForm = () => import('@/components/homepage/AuthDialog/RegistrationForm.vue');
const LoginForm = () => import('@/components/homepage/AuthDialog/LoginForm.vue');

export default {
  name: 'AuthDialog',
  components: {
    LoginForm,
    RegistrationForm,
    BaseTabs,
  },
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
    onUpdateProfile: {
      type: Function,
      required: false,
      default: () => {},
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
