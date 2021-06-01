<template>
  <div class="Modal">
    <div class="Close Modal-Close" @click="$emit('close')"></div>
    <div class="AuthDialog">
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
