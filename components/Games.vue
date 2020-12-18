<template>
  <div class="Games">
    <div class="Games-Items">
      <Card
        v-for="(game, i) in gamesLimited"
        :key="i"
        :id="game.gameId"
        :img-url="game.imageUrl"
        overlay
        @openGamePage="openGamePage"
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
import { mapActions, mapState } from 'vuex';
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
    };
  },
  computed: {
    ...mapState(['gameUrlForIframe']),
    gamesLimited() {
      return this.games.slice(0, this.gamesShowed);
    },
  },
  created() {
    this.gamesShowed = this.gamesToShow;
  },
  methods: {
    ...mapActions(['startGame']),
    async getGameUrl({
      gameId,
      returnUrl = `${window.location.protocol}//${window.location.host}`,
      demo,
      platform,
    }) {
      const gameUrlForIframe = await this.startGame({
        gameId,
        returnUrl,
        demo,
        platform,
      });
      localStorage.setItem('gameUrlForIframe', this.gameUrlForIframe);

      return this.gameUrlForIframe;
    },
    async openGamePage({ id, demo }) {
      if (!demo && !this.isLoggedIn) {
        this.showRegistrationDialog('login');
        return;
      }

      if (this.isMobile()) {
        await this.getGameUrl({
          gameId: id,
          demo,
          platform: 'mobile',
        });
        window.location.href = this.gameUrlForIframe;

        return;
      }

      localStorage.setItem('gameUrlForIframe', '');
      this.$router.push(`/game`);
      this.getGameUrl({
        gameId: id,
        demo,
        platform: 'desktop',
      });
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
