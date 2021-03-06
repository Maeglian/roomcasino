<template>
  <div class="Games">
    <BaseModal
      v-if="gameError"
      name="gameError"
      :width="300"
      :height="'auto'"
      show-on-mount
      @close="clearGameError"
    >
      <div class="Modal-Title">{{ $t('modals.cantStart') }}</div>
      <div class="Modal-Text">
        {{ gameError }}
      </div>
    </BaseModal>
    <BaseModal
      v-if="showDepositModal"
      name="pleaseDeposit"
      :width="300"
      :height="'auto'"
      show-on-mount
      @close="onCloseDepositModal"
    >
      <div class="Modal-Title">{{ $t('modals.pleaseDeposit') }}</div>
      <div class="Modal-Text">{{ $t('modals.pleaseDepositText') }}</div>
    </BaseModal>
    <div class="Games-Items">
      <Card
        v-for="(game, i) in gamesLimited"
        :key="i"
        :game-info="game"
        :img-url="game.imageUrl"
        :show-demo="true"
        overlay
        show-footer
        @open-gamepage="openGamePage"
      />
    </div>
    <p v-if="!games.length" class="Text Text--center">{{ $t('search.notFound') }}</p>
    <div v-if="games.length > gamesShowed" class="Games-Btn">
      <button class="Btn" :class="btnClass" @click="showMoreGames()">
        {{ $t('buttons.loadMoreGames') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import showAuthDialog from '@/mixins/showAuthDialog';
import BaseModal from '@/components/base/BaseModal';
import Card from '@/components/Card';

export default {
  name: 'Games',
  components: {
    BaseModal,
    Card,
  },
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
      showDepositModal: false,
    };
  },
  computed: {
    ...mapState(['gameUrlForIframe', 'gameError', 'platform']),
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
      this.showDepositModal = false;
      this.$modal.show('cashier');
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

    async openGamePage({ id, demo, bg }) {
      if (!demo && !this.isLoggedIn) {
        this.showRegistrationDialog('login');
        return;
      }

      if (!demo && !this.activeAccount.balance) {
        this.showDepositModal = true;
        return;
      }

      await this.getGameUrl({
        gameId: id,
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
      grid-template-columns: repeat(4, 1fr);
    }

    @media (min-width: $screen-l) {
      grid-template-columns: repeat(6, 1fr);
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
