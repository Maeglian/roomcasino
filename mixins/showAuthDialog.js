import AuthDialog from '@/components/homepage/AuthDialog/AuthDialog.vue';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['authError', 'width']),
    ...mapState('profile', ['updateProfileError']),
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapMutations(['removeAuthError', 'setRegistrationWindowWasOpened']),
    ...mapMutations('profile', ['setUpdateProfileError']),
    showRegistrationDialog(
      authType,
      beforeDeposit = false,
      beforeStartGame = false,
      id,
      demo,
      bg,
      gameProducer,
    ) {
      this.removeAuthError();
      this.$modal.show(
        AuthDialog,
        { authType, beforeDeposit, beforeStartGame, id, demo, bg, gameProducer },
        { width: this.width >= 1248 ? 845 : 418, height: 'auto', adaptive: true, scrollable: true },
        {
          'before-close': this.afterCloseAuthDialog,
        },
      );
      this.setRegistrationWindowWasOpened(true);
    },
    afterCloseAuthDialog() {
      if (this.authError) this.removeAuthError();
      if (this.updateProfileError) this.setUpdateProfileError('');
    },
    onClickBtn() {
      if (!this.isLoggedIn) this.showRegistrationDialog('registration');
      else this.$modal.show('cashier');
    },
  },
};
