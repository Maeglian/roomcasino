import AuthDialog from '@/components/homepage/AuthDialog.vue';
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['removeAuthError']),
    showRegistrationDialog(authType) {
      this.removeAuthError();
      this.$modal.show(AuthDialog,
        { authType },
        { width: 418, height: 'auto', adaptive: true },
        {
          'before-close': this.afterCloseAuthDialog,
        });
    },
    afterCloseAuthDialog() {
      this.removeAuthError();
    },
  },
};
