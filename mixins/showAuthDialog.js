import AuthDialog from '@/components/homepage/AuthDialog/AuthDialog.vue';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['authError', 'updateProfileError']),
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapMutations(['removeAuthError', 'clearUpdateProfileError']),
    showRegistrationDialog(
      authType,
      beforeDeposit = false,
      beforeStartGame = false,
      onUpdateProfile,
      id,
      demo,
      bg,
    ) {
      this.removeAuthError();
      this.$modal.show(
        AuthDialog,
        { authType, beforeDeposit, beforeStartGame, onUpdateProfile, id, demo, bg },
        { width: 418, height: 'auto', adaptive: true, scrollable: true },
        {
          'before-close': this.afterCloseAuthDialog,
        },
      );
    },
    afterCloseAuthDialog() {
      if (this.authError) this.removeAuthError();
      if (this.updateProfileError) this.clearUpdateProfileError();
    },
    onClickBtn() {
      if (!this.isLoggedIn) this.showRegistrationDialog('registration');
      else this.$modal.show('cashier');
    },
  },
};
