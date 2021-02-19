<template>
  <div class="Modal">
    <div class="Close Modal-Close" @click="$emit('close')"></div>
    <div class="AuthDialog">
      <BaseTabs
        v-if="!beforeDeposit"
        class="AuthDialog-Tabs"
        :items="tabs"
        :current-item="activeTab"
        @choose-tab="toggleRegistration"
      />
      <template v-if="beforeDeposit || activeTab === 'registration'">
        <RegistrationForm
          :before-deposit="beforeDeposit"
          @close="$emit('close')"
          @redirect-login="activeTab = 'login'"
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
  },
  data() {
    return {
      tabs: [
        {
          value: 'registration',
          name: 'Sign up',
        },
        {
          value: 'login',
          name: 'Login',
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
