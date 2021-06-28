<template>
  <div class="Games">
    <BaseModal
      v-if="gameError"
      name="gameError"
      :width="300"
      :height="'auto'"
      show-on-mount
      @close="setGameError('')"
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
        @open-gamepage="openGamePage($event, game.gameProducer)"
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
import showAuthDialog from '@/mixins/showAuthDialog';
import BaseModal from '@/components/base/BaseModal';
import Card from '@/components/Card';
import openGame from '@/mixins/openGame';

export default {
  name: 'Games',
  components: {
    BaseModal,
    Card,
  },
  mixins: [showAuthDialog, openGame],
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
    gamesToLoadMore: {
      type: [Number, Boolean],
      required: false,
      default: false,
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
    gamesLimited() {
      return this.games.slice(0, this.gamesShowed);
    },
  },
  created() {
    this.gamesShowed = this.gamesToShow;
  },
  methods: {
    showMoreGames() {
      const numberOfGames = this.gamesToLoadMore ? this.gamesToLoadMore : this.gamesToShow;
      this.gamesShowed += numberOfGames;
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
