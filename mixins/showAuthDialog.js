import AuthDialog from '@/components/homepage/AuthDialog/AuthDialog.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapMutations(['removeAuthError']),
    showRegistrationDialog(authType, beforeDeposit) {
      this.removeAuthError();
      this.$modal.show(
        AuthDialog,
        { authType, beforeDeposit },
        { width: 418, height: 'auto', adaptive: true, scrollable: true },
        {
          'before-close': this.afterCloseAuthDialog,
        },
      );
    },
    afterCloseAuthDialog() {
      this.removeAuthError();
    },
    onClickBtn() {
      if (!this.isLoggedIn) this.showRegistrationDialog('registration');
      else this.$modal.show('cashier');
    },
  },
};
