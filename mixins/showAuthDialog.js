import AuthDialog from '@/components/homepage/AuthDialog.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapMutations(['removeAuthError']),
    showRegistrationDialog(authType) {
      this.removeAuthError();
      this.$modal.show(AuthDialog,
        { authType },
        { width: 418, height: 'auto', adaptive: true, scrollable: true },
        {
          'before-close': this.afterCloseAuthDialog,
        });
    },
    afterCloseAuthDialog() {
      this.removeAuthError();
    },
    onClickBtn() {
      if (!this.isLoggedIn) this.showRegistrationDialog('registration');
      else this.$modal.show('cashier');
    }
  },
};
