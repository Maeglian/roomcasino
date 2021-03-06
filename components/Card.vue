<template>
  <div class="Card">
    <div class="Card-Main" @click="onClickCard">
      <div v-if="overlay && (!isLoggedIn || platform !== 'mobile')" class="Card-Overlay">
        <button
          v-if="showDemo && gameInfo.type !== 'live'"
          class="Card-Link"
          @click="
            $emit('open-gamepage', { id: gameInfo.gameId, demo: true, bg: gameInfo.backgroundUrl })
          "
        >
          {{ $t('buttons.playForFun') }}
        </button>
        <button
          v-if="!gameInfo.demoOnly"
          class="Card-PlayBtn"
          @click="
            $emit('open-gamepage', { id: gameInfo.gameId, demo: false, bg: gameInfo.backgroundUrl })
          "
        >
          {{ $t('buttons.playNow') }}
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
        class="Card-TableInfo Card-Dga"
      >
        <div class="Card-Info">
          <div
            v-if="dga[gameInfo.gameProducer][gameInfo.gpGameId].tableOpen"
            class="Card-DgaText Card-DgaRow"
          >
            {{
              dga[gameInfo.gameProducer][gameInfo.gpGameId].tableOpen
                ? $t('homepage.tableIsOpen')
                : $t('homepage.tableIsClosed')
            }}
          </div>
          <div v-if="dga[gameInfo.gameProducer][gameInfo.gpGameId].dealer" class="Card-Info">
            <img src="@/assets/img/dealer.png" class="Card-InfoIcon" />
            <div class="Card-DgaText">
              {{ dga[gameInfo.gameProducer][gameInfo.gpGameId].dealer.name }}
            </div>
          </div>
          <div
            v-if="dga[gameInfo.gameProducer][gameInfo.gpGameId].availableSeats"
            class="Card-Info"
          >
            <img src="@/assets/img/chair.png" class="Card-InfoIcon" />
            <div class="Card-DgaText">
              {{ dga[gameInfo.gameProducer][gameInfo.gpGameId].availableSeats }}
            </div>
          </div>
        </div>
        <div v-if="lastResults" class="Card-Results">
          <div
            v-for="result in lastResults"
            :key="result.time"
            class="Card-Result"
            :style="{ backgroundColor: result.color }"
          >
            {{ result.totalSum || result.result }}
          </div>
        </div>
      </div>
      <div
        v-if="
          dga[gameInfo.gameProducer] &&
            dga[gameInfo.gameProducer][gameInfo.gpGameId] &&
            dga[gameInfo.gameProducer][gameInfo.gpGameId].tableLimits
        "
        class="Card-Bets Card-Dga"
      >
        {{ dga[gameInfo.gameProducer][gameInfo.gpGameId].tableLimits.minBet }} -
        {{ dga[gameInfo.gameProducer][gameInfo.gpGameId].tableLimits.maxBet }}&nbsp;
        {{ activeAccount.currency || 'EUR' }}
      </div>
    </div>
    <div v-if="showFooter" class="Card-Footer">
      <div class="Card-Provider">
        <img :src="iconUrl" alt="" class="Card-ProviderIcon" />
        <div class="Card-ProviderName">
          {{ gameInfo.gameProducer }}
        </div>
      </div>
      <div class="Card-Name" v-html="linebreak(gameInfo.gameName)"></div>
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
    showFooter: {
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
    ...mapState(['platform', 'dga', 'gameProducers']),
    ...mapGetters(['isLoggedIn', 'activeAccount']),
    iconUrl() {
      const gameProducer = this.gameProducers.find(
        producer => producer.name.toLowerCase() === this.gameInfo.gameProducer.toLowerCase(),
      );
      if (gameProducer) return gameProducer.iconUrl;
      return '';
    },
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
      this.$emit('open-gamepage', { id: this.gameInfo.gameId, demo: this.gameInfo.demoOnly });
    },
    linebreak(value) {
      return value.replace(': ', ': <br/>');
    },
  },
};
</script>

<style lang="scss">
.Card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &-Main {
    position: relative;
    flex-grow: 1;
    flex-basis: 150px;

    &:hover {
      .Card-Overlay {
        height: 100%;
      }

      .Card-Link {
        display: block;
      }

      .Card-PlayBtn {
        display: flex;
      }
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
    width: 100%;
    height: 100%;
    background: var(--color-bg) url('~@/assets/img/dice.png') no-repeat center center;

    img {
      min-width: 100%;
      min-height: 100%;
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

  &-PlayBtn {
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
    background-color: var(--color-main1);
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
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text-main);
    background: var(--color-bg-darker);
    border-radius: 25px;

    @media (min-width: $screen-m) {
      font-size: 9px;
    }

    @media (min-width: $screen-xl) {
      font-size: 14px;
    }
  }

  &-DgaText {
    margin-right: 10px;
    font-size: 11px;
    font-weight: 700;

    @media (min-width: $screen-m) {
      font-size: 9px;
    }

    @media (min-width: $screen-xl) {
      font-size: 11px;
    }
  }

  &-DgaRow {
    width: 100%;
    margin-bottom: 5px;
  }

  &-TableInfo {
    position: absolute;
    bottom: 25px;
    left: 0;
    z-index: 1;
    width: 100%;
    padding: 5px 10px;
    color: var(--color-text-main);
    background: var(--color-bg-darker);

    @media (min-width: $screen-xs) {
      bottom: 35px;
    }

    @media (min-width: $screen-m) {
      bottom: 20px;
    }

    @media (min-width: $screen-xl) {
      bottom: 25px;
    }
  }

  &-Info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  &-InfoIcon {
    width: 15px;
    height: 15px;
    margin-right: 5px;
    filter: invert(100%);

    @media (min-width: $screen-m) {
      width: 10px;
      height: 10px;
    }

    @media (min-width: $screen-xl) {
      width: 15px;
      height: 15px;
    }
  }

  &-Results {
    display: flex;
    margin-top: 5px;
  }

  &-Result {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    font-size: 14px;
    font-weight: 700;

    @media (min-width: $screen-m) {
      width: 15px;
      height: 15px;
      font-size: 9px;
    }

    @media (min-width: $screen-xl) {
      width: 20px;
      height: 20px;
      font-size: 14px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &-Dga {
    @media (min-width: $screen-s) {
      display: none;
    }

    @media (min-width: $screen-m) {
      display: initial;
    }
  }

  &-Footer {
    flex-shrink: 0;
    flex-basis: 65px;
    padding-top: 10px;
    background: var(--color-bg);
  }

  &-Provider {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
  }

  &-ProviderIcon {
    height: 20px;
    margin-right: 8px;
  }

  &-ProviderName {
    font-size: 11px;
    font-weight: 500;
    color: var(--color-text-ghost-darker);
    text-transform: capitalize;
  }

  &-Name {
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: var(--color-text-main);
  }
}
</style>
