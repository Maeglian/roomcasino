import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['platform']),
    ...mapState('games', ['gameUrl', 'gameHtml', 'gameError']),
    ...mapState('profile', ['freeSpinList']),
    ...mapGetters(['isLoggedIn', 'activeAccount', 'userInfo']),
  },
  methods: {
    ...mapMutations(['setShowPleaseDepositModal']),
    ...mapMutations('games', ['setGameToStart']),
    ...mapActions('games', ['startGame']),
    async openGamePage({ game, demo }) {
      if (!demo && !this.isLoggedIn) {
        this.setGameToStart(game);
        this.showRegistrationDialog('login', false, true);
        return;
      }

      if (!demo && this.activeAccount.balance === 0) {
        const hasFreeSpins = this.freeSpinList.some(spin => {
          return spin.gameList.some(g => g.id === game.gameId && spin.status === 'active');
        });

        if (!hasFreeSpins) {
          this.setShowPleaseDepositModal(true);
          this.setGameToStart(game);
          return;
        }
      }

      if (!demo && game.gameProducer === 'bgaming') {
        const notFullProfileData = Object.values(this.userInfo).some(
          item => item === null || item === '',
        );
        if (notFullProfileData) {
          this.setGameToStart(game);
          this.showRegistrationDialog('registration', false, true);
          return;
        }
      }

      await this.getGame({ game, demo });
    },

    async getGame({ game, demo }) {
      const query = demo ? { demo } : null;

      if (this.platform === 'mobile' || this.getRouteBaseName() === 'game-gameName') {
        await this.startGame({
          gameId: game.gameId,
          returnUrl: window.location.origin,
          demo,
        });

        if (this.gameHtml && this.game.gameProducer !== 'playngo') {
          await this.$router.push(
            this.localePath({
              name: 'game-gameName',
              params: { gameName: game.gameName },
              query,
            }),
          );
        } else if (this.platform === 'mobile' && !this.gameError)
          window.location.href = this.gameUrl;
      } else {
        await this.$router.push(
          this.localePath({
            name: 'game-gameName',
            params: { gameName: game.gameName },
            query,
          }),
        );
      }
    },
  },
};
