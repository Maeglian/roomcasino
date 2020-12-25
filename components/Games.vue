<template>
  <div class="Games">
    <BaseModal v-if="gameError" :width="300" :height="'auto'" @close="clearGameError">
      <div class="Modal-Title">
        Can't start the game
      </div>
      <div class="Modal-Text">
        {{ gameError }}
      </div>
    </BaseModal>
    <BaseModal v-if="depositModal" :width="300" :height="'auto'" @close="onCloseDepositModal">
      <div class="Modal-Title">
        Please deposit first
      </div>
      <div class="Modal-Text">
        It's a pity, but your balance is 0. Deposit now!
      </div>
    </BaseModal>
    <div class="Games-Items">
      <Card
        v-for="(game, i) in gamesLimited"
        :id="game.gameId"
        :key="i"
        :img-url="game.imageUrl"
        :show-demo="!isLoggedIn"
        overlay
        @open-gamepage="openGamePage"
      />
    </div>
    <div v-if="games.length > gamesShowed" class="Games-Btn">
      <button class="Btn" :class="btnClass" @click="showMoreGames()">
        Load more games
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';
import detect from '@/utils/deviceDetector';

export default {
  name: 'Games',
  mixins: [showAuthDialog],
  props: {
    games: {
      type: Array,
      required: true,
    },
    gamesToShow: {
      type: Number,
      required: false,
      default: 12,
    },
    btnClass: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      gamesShowed: 0,
      depositModal: false,
    };
  },
  computed: {
    ...mapState(['gameUrlForIframe', 'gameError']),
    ...mapGetters(['activeAccount']),
    gamesLimited() {
      return this.games.slice(0, this.gamesShowed);
    },
  },
  created() {
    this.gamesShowed = this.gamesToShow;
  },
  methods: {
    ...mapMutations(['clearGameError']),
    ...mapActions(['startGame']),
    onCloseDepositModal() {
      this.depositModal = false;
      this.$modal.show('cashier');
    },
    async getGameUrl({
      gameId,
      returnUrl = `${window.location.protocol}//${window.location.host}`,
      demo,
      platform,
    }) {
      await this.startGame({
        gameId,
        returnUrl,
        demo,
        platform,
      });

      if (!this.gameError) {
        localStorage.setItem('gameUrlForIframe', this.gameUrlForIframe);
        return this.gameUrlForIframe;
      }

      return null;
    },
    async openGamePage({ id, demo }) {
      if (!demo && !this.isLoggedIn) {
        this.showRegistrationDialog('login');
        return;
      }

      if (!demo && !this.activeAccount.balance) {
        this.depositModal = true;
        return;
      }

      if (this.isMobile()) {
        await this.getGameUrl({
          gameId: id,
          demo,
          platform: 'mobile',
        });

        if (!this.gameError) window.location.href = this.gameUrlForIframe;

        return;
      }

      await this.getGameUrl({
        gameId: id,
        demo,
        platform: 'desktop',
      });

      if (!this.gameError) this.$router.push(`/game`);
    },
    isMobile() {
      return detect.mobile() || detect.tablet() || detect.phone();
    },
    showMoreGames() {
      this.gamesShowed += this.gamesToShow;
    },
  },
};
</script>

<style lang="scss">
.Games {
  &-Items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    justify-items: center;
    margin-bottom: 20px;

    @media (min-width: $screen-s) {
      grid-template-columns: repeat(6, 1fr);
    }

    @media (min-width: $screen-l) {
      margin-bottom: 24px;
    }

    @media (min-width: $screen-xl) {
      margin-bottom: 32px;
    }
  }

  &-Btn {
    text-align: center;
  }
}
</style>
