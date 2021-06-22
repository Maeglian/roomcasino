import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['gameUrlForIframe', 'gameError', 'platform', 'freeSpinList', 'showDepositModal']),
    ...mapGetters(['activeAccount', 'userInfo']),
  },
  methods: {
    ...mapMutations(['clearGameError', 'toggleDepositModal']),
    ...mapActions(['startGame']),
    onCloseDepositModal() {
      this.toggleDepositModal(false);
      this.$modal.show('cashier');
    },
    async openGamePage({ id, demo, bg }, gameProducer) {
      if (!demo && !this.isLoggedIn) {
        this.showRegistrationDialog('login');
        return;
      }

      if (!demo && !this.activeAccount.balance) {
        const hasFreeSpins = this.freeSpinList.some(spin => {
          return spin.gameList.some(game => game.id === id && spin.status === 'active');
        });

        if (!hasFreeSpins) {
          this.toggleDepositModal(true);
          return;
        }
      }

      if (!demo && gameProducer === 'bgaming') {
        const notFullProfileData = Object.values(this.userInfo).some(
          item => item === null || item === '',
        );
        if (notFullProfileData) {
          this.showRegistrationDialog('registration', false, true, this.getGame, id, demo, bg);
          return;
        }
      }

      await this.getGame({ gameId: id, demo, bg });
    },
    async getGame({ gameId, demo, bg }) {
      await this.getGameUrl({
        gameId,
        demo,
      });

      if (!this.gameError) {
        if (this.platform === 'mobile') window.location.href = this.gameUrlForIframe;
        else {
          localStorage.setItem('gameBg', bg);
          this.$router.push(this.localePath('/game'));
        }
      }
    },
    async getGameUrl({
      gameId,
      returnUrl = `${window.location.protocol}//${window.location.host}`,
      demo,
    }) {
      await this.startGame({
        gameId,
        returnUrl,
        demo,
      });

      if (!this.gameError) {
        localStorage.setItem('gameUrlForIframe', this.gameUrlForIframe);
        return this.gameUrlForIframe;
      }

      return null;
    },
  },
};
