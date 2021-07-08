<template>
  <div class="PaginatedSlider">
    <div class="Title PaginatedSlider-Title">
      {{ title }}
    </div>
    <button v-if="page" class="PaginatedSlider-Prev" @click="onClickPrev"></button>
    <button v-if="page <= maxPages" class="PaginatedSlider-Next" @click="onClickNext"></button>
    <div class="PaginatedSlider-Games">
      <Card
        v-for="(game, i) in gamesPerPage"
        :key="i"
        :game-info="game"
        :show-demo="true"
        overlay
        @open-gamepage="openGamePage($event, game.gameProducer)"
      />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import openGame from '@/mixins/openGame';
import showAuthDialog from '@/mixins/showAuthDialog';
import { mapState } from 'vuex';

export default {
  name: 'PaginatedSlider',
  components: {
    Card,
  },
  mixins: [openGame, showAuthDialog],
  props: {
    games: {
      type: Array,
      required: true,
    },
    title: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
  },
  data() {
    return {
      page: 0,
    };
  },
  computed: {
    ...mapState(['width']),
    itemsInScreen() {
      if (this.width >= 960) return 9;
      if (this.width < 960 && this.width >= 768) return 12;
      return 8;
    },
    maxPages() {
      return this.games.length / this.itemsInScreen;
    },
    gamesPerPage() {
      return this.games.slice(
        this.itemsInScreen * this.page,
        this.itemsInScreen * this.page + this.itemsInScreen,
      );
    },
  },
  methods: {
    onClickPrev() {
      if (this.page) this.page -= 1;
    },
    onClickNext() {
      if (this.page <= this.maxPages) this.page += 1;
    },
  },
};
</script>

<style lang="scss">
.PaginatedSlider {
  position: relative;

  &-Title {
    margin-bottom: 15px;
    font-size: 16px;

    @media (max-width: $screen-m) {
      font-size: 12px;
    }
  }

  &-Prev,
  &-Next {
    position: absolute;
    top: 10px;
    width: 6px;
    height: 10px;
    transform: translateY(-50%);
  }

  &-Prev {
    right: 20px;
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.86107 0.655497C4.25781 0.224138 4.93877 0.224868 5.33458 0.657076L5.3815 0.708315C5.73153 1.09053 5.73153 1.67684 5.3815 2.05906L2.82237 4.85352L5.3815 7.64797C5.73153 8.03019 5.73153 8.6165 5.3815 8.99872L5.33458 9.04996C4.93876 9.48216 4.25781 9.48289 3.86107 9.05153L0.622617 5.53047C0.270654 5.14779 0.270655 4.55924 0.622618 4.17656L3.86107 0.655497Z' fill='%23ffffff'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: left;
  }

  &-Next {
    right: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2.13893 9.05153C1.74219 9.48289 1.06123 9.48216 0.665424 9.04996L0.618499 8.99872C0.268468 8.6165 0.268468 8.03019 0.6185 7.64797L3.17763 4.85352L0.618499 2.05906C0.268468 1.67684 0.268468 1.09053 0.6185 0.708314L0.665423 0.657076C1.06123 0.224869 1.74219 0.224138 2.13893 0.655497L5.37738 4.17656C5.72935 4.55924 5.72935 5.14779 5.37738 5.53047L2.13893 9.05153Z' fill='%23ffffff'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: right;
  }

  &-Games {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    align-content: flex-start;
    //height: 100%;

    @media (min-width: $screen-m) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media (min-width: $screen-l) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
