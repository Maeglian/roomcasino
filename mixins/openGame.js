import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['platform']),
    ...mapState('games', ['gameUrl', 'gameHtml', 'gameError']),
    ...mapState('profile', ['freeSpinList']),
    ...mapGetters(['isLoggedIn', 'activeAccount', 'userInfo']),
  },
  methods: {
    ...mapMutations(['setDepositModalParams']),
    ...mapActions('games', ['startGame']),
    async openGamePage({ id, demo }, gameProducer) {
      if (!demo && !this.isLoggedIn) {
        this.showRegistrationDialog('login', false, true, id, demo, gameProducer);
        return;
      }

      if (!demo && this.activeAccount.balance === 0) {
        const hasFreeSpins = this.freeSpinList.some(spin => {
          return spin.gameList.some(game => game.id === id && spin.status === 'active');
        });

        if (!hasFreeSpins) {
          this.setDepositModalParams({ gameId: id, demo });
          return;
        }
      }

      if (!demo && gameProducer === 'bgaming') {
        const notFullProfileData = Object.values(this.userInfo).some(
          item => item === null || item === '',
        );
        if (notFullProfileData) {
          this.showRegistrationDialog('registration', false, true, id, demo, gameProducer);
          return;
        }
      }

      await this.getGame({ gameId: id, demo });
    },

    async getGame({ gameId, demo }) {
      if (this.platform === 'mobile' || this.getRouteBaseName() === 'game-gameId') {
        await this.startGame({
          gameId,
          returnUrl: window.location.origin,
          demo,
        });

        if (this.platform === 'mobile' && !this.gameError && !this.gameHtml)
          window.location.href = this.gameUrl;
      } else {
        const query = demo ? { demo } : null;
        await this.$router.push(
          this.localePath({ name: 'game-gameId', params: { gameId }, query }),
        );
      }
    },
  },
};
