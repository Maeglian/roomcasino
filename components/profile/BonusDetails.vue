<template>
  <div class="Modal BonusDetails">
    <div class="Close Modal-Close" @click="$emit('close')"></div>
    <div class="BonusDetails-Header">{{ bonus.name }}</div>
    <div class="BonusDetails-Content">
      <div v-if="type === 'bonus'" class="BonusDetails-Row">
        <div class="BonusDetails-Label">
          <template v-if="$i18n.locale === 'de'">
            {{ $t('profile.bonuses.table.bonus') }}{{ $t('common.amount') }}:
          </template>
          <template v-else
            >{{ $t('profile.bonuses.table.bonus') }} {{ $t('common.amount') }}:</template
          >
        </div>
        <div class="BonusDetails-Value">{{ bonus.amount }} {{ bonus.currency }}</div>
      </div>
      <div v-else class="BonusDetails-Row">
        <div class="BonusDetails-Label">
          Free spins awarded:
        </div>
        <div class="BonusDetails-Value">x{{ bonus.amount }}</div>
      </div>
      <div class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.status') }}:</div>
        <div
          class="BonusDetails-Value BonusDetails-Status"
          :class="[
            { 'BonusDetails-Status--active': bonus.status === 'active' },
            {
              'BonusDetails-Status--cancelled':
                bonus.status === 'cancel' ||
                bonus.status === 'expired' ||
                bonus.status === 'runOut',
            },
          ]"
        >
          {{ bonus.status }}
        </div>
      </div>
      <div class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.wager') }}:</div>
        <div class="BonusDetails-Value">{{ bonus.wager }}</div>
      </div>
      <div v-if="type === 'bonus'" class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.wager') }} {{ $t('common.amount') }}:</div>
        <div class="BonusDetails-Value">{{ bonus.currentWagerAmount }} {{ bonus.currency }}</div>
      </div>
      <div v-if="type === 'bonus'" class="BonusDetails-Row">
        <div class="BonusDetails-Label">
          {{ $t('profile.bonuses.wagerAmountRequirement') }}
        </div>
        <div class="BonusDetails-Value">{{ bonus.wagerAmount }} {{ bonus.currency }}</div>
      </div>
      <div v-if="type === 'bonus'" class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('profile.bonuses.wageredPercent') }}:</div>
        <div class="BonusDetails-Value">
          {{ (bonus.currentWagerAmount / bonus.wagerAmount) * 100 }}%
        </div>
      </div>
      <div v-if="type === 'bonus'" class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.currency') }}:</div>
        <div class="BonusDetails-Value">
          {{ bonus.currency }}
        </div>
      </div>
      <div class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.created') }}:</div>
        <div class="BonusDetails-Value">
          {{ convertDate(bonus.createdAt) }}
        </div>
      </div>
      <div v-if="bonus.expireAt" class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.expiresAt') }}:</div>
        <div class="BonusDetails-Value">
          {{ convertDate(bonus.expireAt) }}
        </div>
      </div>
      <div v-if="bonus.activationExpireAt" class="BonusDetails-Row">
        <div class="BonusDetails-Label">Activation expires at:</div>
        <div class="BonusDetails-Value">
          {{ convertDate(bonus.activationExpireAt) }}
        </div>
      </div>
      <div v-if="type === 'freeSpin'" class="BonusDetails-Slider">
        <div v-if="chooseGameMessage" class="BonusDetails-Message">
          Please choose a game!
        </div>
        <VueSlider v-if="games.length > 1" v-bind="sliderOptions">
          <div
            v-for="game in games"
            :key="game.id"
            class="BonusDetails-Image"
            :class="{ 'BonusDetails-Image--active': game.id === chosenGame }"
            @click="onChooseGame(game.id)"
          >
            <img :src="game.img" />
          </div>
        </VueSlider>
        <div v-else class="BonusDetails-Image BonusDetails-ActivetedGameImage">
          <img :src="games[0].img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import VueSlider from '@/components/Slider';
import { mapState } from 'vuex';

export default {
  name: 'BonusDetails',
  components: {
    VueSlider,
  },
  props: {
    bonus: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'bonus',
    },
    gameIdToActivate: {
      type: String,
      required: true,
    },
    chooseGame: {
      type: Function,
      required: false,
      default: () => {},
    },
    chooseGameMessage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      chosenGame: this.gameIdToActivate,
    };
  },
  computed: {
    ...mapState('games', ['defaultGames']),
    sliderOptions() {
      const items = this.bonus.gameList.length >= 3 ? 3 : this.bonus.gameList.length;
      const nav = this.bonus.gameList.length > items;
      return {
        nav,
        margin: 10,
        responsive: {
          0: {
            items: 2,
          },
          460: {
            items,
          },
        },
      };
    },
    games() {
      if (this.bonus.gameList) {
        return this.bonus.gameList.map(game => {
          const findedGame = this.defaultGames.find(g => g.gameId === game.id);
          const img = findedGame ? findedGame.imageUrl : '';
          return { ...game, img };
        });
      }

      return [];
    },
  },
  methods: {
    convertDate(timestamp) {
      return moment.unix(timestamp).format('DD MMM YYYY, HH:mm:ss');
    },
    onChooseGame(id) {
      this.chosenGame = id;
      this.chooseGame(id);
    },
  },
};
</script>

<style lang="scss">
.BonusDetails {
  &-Header {
    padding: 15px;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: capitalize;
    background: var(--color-bg);
  }

  &-Content {
    margin-top: 4px;
    padding: 14px 16px;
    background: var(--color-bg);
  }

  &-Row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  &-Label {
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-ghost);
    text-transform: uppercase;
  }

  &-Value {
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
  }

  &-Status {
    color: var(--color-main1);

    &--active {
      color: var(--color-accept);
    }

    &--cancelled {
      color: var(--color-error);
    }
  }

  &-Slider {
    position: relative;
    margin: 14px 16px;
  }

  &-Image {
    max-width: 200px;
    padding: 2px;
    cursor: pointer;

    &--active {
      padding: 0;
      border: 2px solid var(--color-main1);
    }
  }

  &-ActivetedGameImage {
    margin: 0 auto;
  }

  &-Message {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: var(--color-error);
  }
}
</style>
