<template>
  <div class="Card" @click="onClickCard">
    <div v-if="overlay && (!isLoggedIn || platform !== 'mobile')" class="Card-Overlay">
      <button
        v-if="showDemo"
        class="Card-Link"
        @click="$emit('open-gamepage', { id: gameInfo.gameId, demo: true })"
      >
        Play for fun
      </button>
      <button
        class="Card-Footer"
        @click="$emit('open-gamepage', { id: gameInfo.gameId, demo: false })"
      >
        Play Now
      </button>
    </div>
    <div v-if="badge" class="Card-Badge" :class="{ 'Card-Badge--text': badge !== 'best' }">
      <svg v-if="badge === 'best'" class="Card-Icon Card-Icon--best">
        <use xlink:href="@/assets/img/icons.svg#best"></use>
      </svg>
      <template v-else>
        {{ badge }}
      </template>
    </div>
    <svg v-if="crypto" class="Card-Icon Card-Icon--crypto">
      <use xlink:href="@/assets/img/icons.svg#bitcoin"></use>
    </svg>
    <div class="Card-Image">
      <img v-if="img" :src="require(`@/assets/img/${img}`)" alt="" loading="lazy" />
      <img v-else :src="imgUrl" alt="" loading="lazy" />
    </div>
    <div v-if="sum" class="Card-Sum">
      {{ sum }}
    </div>
    <div v-if="text" class="Card-Text">
      {{ text }}
    </div>
    <div
      v-if="dga[gameInfo.gameProducer] && dga[gameInfo.gameProducer][gameInfo.gpGameId]"
      class="Card-TableInfo"
    >
      <div v-for="result in lastResults" :key="result.time">
        {{ result.result }}
      </div>
    </div>
    <div
      v-if="
        dga[gameInfo.gameProducer] &&
          dga[gameInfo.gameProducer][gameInfo.gpGameId] &&
          dga[gameInfo.gameProducer][gameInfo.gpGameId].tableLimits
      "
      class="Card-Bets"
    >
      {{ dga[gameInfo.gameProducer][gameInfo.gpGameId].tableLimits.minBet }} -
      {{ dga[gameInfo.gameProducer][gameInfo.gpGameId].tableLimits.maxBet }}&nbsp;
      {{ this.activeAccount.currency }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Card',
  props: {
    img: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    imgUrl: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    badge: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    sum: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    crypto: {
      type: Boolean,
      required: false,
      default: false,
    },
    text: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    overlay: {
      type: Boolean,
      required: false,
      default: false,
    },
    showDemo: {
      type: Boolean,
      required: false,
      default: false,
    },
    gameInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['platform', 'dga']),
    ...mapGetters(['isLoggedIn', 'activeAccount']),
    lastResults() {
      return (
        this.dga[this.gameInfo.gameProducer] &&
        this.dga[this.gameInfo.gameProducer][this.gameInfo.gpGameId] &&
        this.dga[this.gameInfo.gameProducer][this.gameInfo.gpGameId].last20Results &&
        this.dga[this.gameInfo.gameProducer][this.gameInfo.gpGameId].last20Results.slice(0, 5)
      );
    },
  },
  methods: {
    onClickCard() {
      if (this.platform !== 'mobile' || !this.isLoggedIn) return;
      this.$emit('open-gamepage', { id: this.gameInfo.gameId, demo: false });
    },
  },
};
</script>

<style lang="scss">
.Card {
  position: relative;

  &:hover {
    .Card-Overlay {
      height: 100%;
    }

    .Card-Link {
      display: block;
    }

    .Card-Footer {
      display: flex;
    }
  }

  &-Badge {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    &--text {
      display: inline-block;
      padding: 8px;
      font-size: 12px;
      font-weight: 700;
      color: var(--color-text-main);
      text-transform: uppercase;
      background-color: var(--color-badge);
    }
  }

  &-Icon--best {
    width: 30px;
    height: 30px;
  }

  &-Icon--crypto {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
    width: 20px;
    height: 20px;
  }

  &-Image {
    img {
      width: 100%;
      object-fit: cover;
    }
  }

  &-Sum {
    font-size: 14px;
    font-weight: 700;
    text-align: right;
    color: var(--color-main1);
    white-space: nowrap;

    @media (max-width: $screen-m) {
      font-size: 12px;
    }
  }

  &-Text {
    font-size: 12px;
    font-weight: 400;
    text-align: right;
    color: var(--color-text-ghost);

    @media (max-width: $screen-m) {
      font-size: 10px;
    }
  }

  &-Overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 0;
    overflow: hidden;
    background-color: var(--color-overlay);
    transition: all 0.2s ease;
  }

  &-Link {
    display: none;
    align-self: center;
    margin-top: 13%;
    padding: 10px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.242;
    color: var(--color-text-main);
    text-transform: uppercase;
    border: 2px solid var(--color-text-main);
    cursor: pointer;
    opacity: 0.7;

    @media (max-width: $screen-l) {
      padding: 8px;
      font-size: 10px;
    }

    @media (max-width: $screen-m) {
      padding: 4px;
      font-size: 9px;
    }
  }

  &-Footer {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 37%;
    margin-top: auto;
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
    background-color: var(--color-badge);
    cursor: pointer;

    @media (max-width: $screen-l) {
      font-size: 14px;
    }

    @media (max-width: $screen-m) {
      font-size: 12px;
    }
  }

  &-Bets {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    padding: 5px 10px;
    color: var(--color-text-main);
    background: var(--color-bg-darker);
    border-radius: 25px;
  }

  &-TableInfo {
    position: absolute;
    bottom: 20px;
    left: 0;
    z-index: 1;
    display: flex;
    width: 100%;
    padding: 5px 10px;
    color: var(--color-text-main);
    background: var(--color-bg-darker);
  }
}
</style>
