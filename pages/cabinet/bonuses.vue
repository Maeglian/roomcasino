<template>
  <div class="CabinetPage BonusesPage">
    <div class="CabinetPage-Title BonusesPage-Title">{{ $t('cabinet.pages.bonuses') }}</div>
    <NuxtLink :to="localePath('/cabinet/history/bonus')" class="BonusesPage-Bonuses">
      {{ $t('cabinet.bonuses.history') }}
      <span class="BonusesPage-BonusesIcon">
        <svg width="16" height="16">
          <use xlink:href="@/assets/img/icons.svg#time"></use>
        </svg>
      </span>
    </NuxtLink>
    <div v-if="bonusList.length" class="BonusesPage-BonusList">
      <div v-for="bonus in bonusList" :key="bonus.id" class="BonusesPage-Bonus Bonus">
        <div class="Bonus-Section">
          <svg class="BonusesPage-Icon--clover">
            <use xlink:href="@/assets/img/icons.svg#clover"></use>
          </svg>
          <div class="Bonus-Field Bonus-Amount">{{ bonus.amount }} {{ bonus.currency }}</div>
          <div class="Bonus-Field Bonus-Wager">
            <span class="Bonus-Text">{{ $t('common.wager') }}</span>
            {{ bonus.wager }}
          </div>
          <div class="Bonus-Field Bonus-WagerSpent">
            <span class="Bonus-CurWager">{{ bonus.currentWagerAmount }} /</span>
            <span class="Bonus-WagerAmount"
              >&nbsp;{{ bonus.wagerAmount }} {{ activeCurrency }}</span
            >
            &nbsp;{{ $t('cabinet.bonuses.table.wagered') }}
            <svg
              class="Bonus-Icon"
              width="14"
              height="14"
              @click="showBonusDetails(bonus, 'bonus')"
            >
              <use xlink:href="@/assets/img/icons.svg#info"></use>
            </svg>
          </div>
        </div>
        <div class="Bonus-Section Bonus-Section--bottom">
          <div v-if="bonus.expireAt" class="Bonus-Field Bonus-Expires">
            <Counter
              class="Bonus-Counter"
              :min-format="true"
              :enddate="new Date(bonus.expireAt * 1000)"
            >
              {{ $t('common.left') }}
            </Counter>
          </div>
          <button class="Btn Btn--dark Bonus-Btn" @click="onClickCancelBonus(bonus)">
            {{ $t('buttons.cancel') }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="freeSpinList.length" class="BonusesPage-BonusList">
      <FreeSpin
        v-for="spin in freeSpinList"
        :key="spin.id"
        :spin="spin"
        class="Bonus FreeSpin
      BonusesPage-FreeSpin"
      />
    </div>
    <Loader v-if="availableBonusListIsLoading" />
    <div v-if="availableBonusList.length" class="Table CabinetPage-Table BonusesPage-Table">
      <div class="Table-Row CabinetPage-Row">
        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th">
          {{ $t('cabinet.bonuses.table.bonus') }}
        </div>
        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th">
          {{ $t('cabinet.bonuses.table.min') }}
        </div>
        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th">
          {{ $t('cabinet.bonuses.table.max') }}
        </div>
        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th"></div>
      </div>
      <div
        v-for="(bonus, i) in availableBonusList"
        :key="`bonus_${i}`"
        class="Table-Row CabinetPage-Row"
      >
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Bonus">
          {{ bonus.name }}
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Min">
          {{ bonus.minDepositAmount }} {{ bonus.currency }}
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Max">
          <div class="BonusesPage-CellWrapper">
            <svg class="BonusesPage-Icon" width="16" height="16">
              <use xlink:href="@/assets/img/icons.svg#promotions"></use>
            </svg>
            {{ `${bonus.depositPercent}% of deposit` }}
            <template v-if="bonus.maxBonusAmount">
              {{ `, max ${bonus.maxBonusAmount} ${bonus.currency}` }}
            </template>
            <br />
            <template v-if="findFreeSpin(bonus.depositNum)">
              + {{ findFreeSpin(bonus.depositNum) }} free spins
            </template>
          </div>
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Deposit">
          <button
            class="Btn Btn--common Btn--color CabinetPage-Btn"
            :disabled="!bonus.available"
            @click="$modal.show('cashier')"
          >
            {{ $t('buttons.deposit') }}
          </button>
        </div>
      </div>
    </div>
    <!--    <div v-if="availableFreeSpinList.length" class="Table CabinetPage-Table BonusesPage-Table">-->
    <!--      <div class="Table-Row CabinetPage-Row">-->
    <!--        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th">-->
    <!--          Bonus-->
    <!--        </div>-->
    <!--        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th">-->
    <!--          Min deposit sum-->
    <!--        </div>-->
    <!--        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th">-->
    <!--          Max prize-->
    <!--        </div>-->
    <!--        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th"></div>-->
    <!--      </div>-->
    <!--      <div-->
    <!--        v-for="(bonus, i) in availableFreeSpinList"-->
    <!--        :key="`freeSpin_${i}`"-->
    <!--        class="Table-Row CabinetPage-Row"-->
    <!--      >-->
    <!--        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Bonus">-->
    <!--          {{ bonus.name }}-->
    <!--        </div>-->
    <!--        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Min">-->
    <!--          {{ bonus.minDepositAmount }} {{ bonus.currency }}-->
    <!--        </div>-->
    <!--        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Max">-->
    <!--          <div class="BonusesPage-CellWrapper">-->
    <!--            <svg class="BonusesPage-Icon" width="16" height="16">-->
    <!--              <use xlink:href="@/assets/img/icons.svg#promotions"></use>-->
    <!--            </svg>-->
    <!--            {{ `${bonus.depositPercent}% of deposit` }}-->
    <!--            <template v-if="bonus.maxBonusAmount">-->
    <!--              {{ `, max ${bonus.maxBonusAmount} ${bonus.currency}` }}-->
    <!--            </template>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Deposit">-->
    <!--          <button-->
    <!--            class="Btn Btn&#45;&#45;common Btn&#45;&#45;color CabinetPage-Btn"-->
    <!--            :disabled="!bonus.available"-->
    <!--            @click="$modal.show('cashier')"-->
    <!--          >-->
    <!--            Deposit-->
    <!--            {{ $t('buttons.deposit') }}-->
    <!--          </button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="CabinetPage-Subtitle BonusesPage-Subtitle">-->
    <!--      Receive a bonus-->
    <!--    </div>-->
    <!--    <form class="BonusesPage-Form CabinetPage-Form">-->
    <!--      <input type="text" class="BonusesPage-Input CabinetPage-Input" placeholder="Promo code" />-->
    <!--      <button class="BonusesPage-Submit CabinetPage-Submit" type="submit">-->
    <!--        Add-->
    <!--      </button>-->
    <!--    </form>-->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import Counter from '@/components/Counter';
import BonusDetails from '@/components/cabinet/BonusDetails';
import Loader from '@/components/Loader';
import CancelBonusPopup from '@/components/CancelBonusPopup';
import FreeSpin from '@/components/cabinet/FreeSpin';

export default {
  name: 'BonusesPage',
  components: {
    Counter,
    Loader,
    FreeSpin,
  },
  computed: {
    ...mapState([
      'bonusListIsLoading',
      'historyListIsLoading',
      'freeSpinListIsLoading',
      'bonusListIsLoading',
      'bonusList',
      'freeSpinList',
      'availableBonusList',
      'availableFreeSpinList',
      'availableBonusListIsLoading',
      'availableFreeSpinListIsLoading',
    ]),
    ...mapGetters(['activeCurrency']),
  },
  created() {
    this.getBonusList();
    this.getFreeSpinList();
    this.getBonusHistoryList();
    this.getAvailableBonusList();
    this.getAvailableFreeSpinList();
  },
  methods: {
    ...mapMutations(['pushNotificationAlert']),
    ...mapActions([
      'getBonusList',
      'getAvailableBonusList',
      'deleteBonus',
      'getProfile',
      'getBonusHistoryList',
      'getFreeSpinList',
      'getAvailableFreeSpinList',
    ]),
    onClickCancelBonus(bonus) {
      this.$modal.show(
        CancelBonusPopup,
        { bonus },
        {
          width: 418,
          height: 'auto',
          adaptive: true,
          scrollable: true,
        },
        {},
      );
    },
    findFreeSpin(depositNum) {
      const freeSpin = this.availableFreeSpinList.find(spin => spin.depositNum === depositNum);
      if (freeSpin) return freeSpin.freeSpinCount;
      return null;
    },
    onDeleteBonus(id) {
      this.deleteBonus(id).then(() => {
        if (this.deleteBonusError)
          this.pushNotificationAlert({ type: 'error', text: 'Error on cancelling bonus' });
        else this.pushNotificationAlert({ type: 'success', text: 'Your bonus was cancelled' });
        this.getBonusList();
        this.getBonusHistoryList();
        this.getProfile();
      });
    },
    showBonusDetails(bonus, type) {
      this.$modal.show(
        BonusDetails,
        { bonus, type },
        { width: 400, height: 'auto', adaptive: true },
      );
    },
  },
};
</script>

<style lang="scss">
.BonusesPage {
  &-Bonuses {
    display: flex;
    align-items: center;
    font-size: 10px;
    color: var(--color-text-ghost);
    text-transform: uppercase;
    white-space: nowrap;

    @media (min-width: $screen-m) {
      margin-right: 4px;
    }
  }

  &-BonusList {
    width: 100%;
    margin-top: 30px;
  }

  &-Bonus {
    text-transform: capitalize;

    @media (min-width: $screen-m) {
      margin-bottom: 4px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-BonusesIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-left: 15px;
    background: var(--color-bg-lighter);

    @media (min-width: $screen-m) {
      width: 55px;
      height: 55px;
    }
  }

  &-All {
    display: flex;
    justify-content: center;
    align-items: center;
    order: 1;
    width: 100%;
    margin-bottom: 28px;
    padding: 22px 0;
    font-size: 10px;
    text-align: center;
    color: var(--color-main1);
    text-transform: uppercase;
    background: var(--color-bg-lighter);

    @media (min-width: $screen-m) {
      order: 0;
      align-self: stretch;
      width: auto;
      margin-bottom: 0;
      padding: 0 20px;
    }
  }

  &-AllIcon {
    margin-right: 8px;

    @media (min-width: $screen-m) {
      margin-right: 10px;
    }
  }

  &-Table {
    margin-top: 24px;
  }

  &-Cell {
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      white-space: nowrap;
    }
  }

  &-Max {
    text-transform: none;
  }

  &-Icon {
    margin-right: 8px;

    @media (min-width: $screen-m) {
      margin-right: 12px;
    }

    &--clover {
      width: 15px;
      height: 15px;
      margin-right: 16px;

      @media (min-width: $screen-m) {
        width: 21px;
        height: 21px;
      }
    }
  }

  &-CellWrapper {
    display: flex;
    align-items: center;
  }

  &-Min,
  &-Deposit {
    text-align: right;

    @media (min-width: $screen-m) {
      text-align: left;
    }
  }

  &-Min:before {
    content: 'Min deposit sum';
    display: block;
    margin-bottom: 8px;
    color: var(--color-text-ghost);

    @media (min-width: $screen-m) {
      display: none;
    }
  }

  &-Subtitle {
    order: 1;
    width: 100%;
    margin-top: 28px;
    margin-bottom: 12px;

    @media (min-width: $screen-m) {
      margin-top: 48px;
    }
  }

  &-Form {
    display: flex;
    order: 1;
    width: 100%;

    @media (min-width: $screen-m) {
      width: 616px / $screen-xl * 100%;
    }
  }

  &-Input {
    flex-grow: 1;
    margin-right: 4px;
    padding: 14px 16px;
  }

  &-Submit {
    width: 84px;

    @media (min-width: $screen-m) {
      width: 122px;
    }
  }

  &-FreeSpin {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.Bonus {
  position: relative;
  padding: 16px;
  font-size: 10px;
  font-weight: 700;
  color: var(--color-text-main);
  text-transform: uppercase;
  background: var(--color-bg);

  @media (min-width: $screen-m) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 12px;
    font-size: 12px;
  }

  @media (min-width: $screen-xl) {
    font-size: 14px;
  }

  &-Section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    @media (min-width: $screen-m) {
      flex-wrap: nowrap;
    }

    &--bottom {
      justify-content: space-between;
      align-self: stretch;
      margin-top: 24px;

      @media (min-width: $screen-m) {
        justify-content: flex-start;
        margin-top: 0;
      }
    }
  }

  &-Field {
    @media (min-width: $screen-m) {
      padding-top: 22px;
      padding-bottom: 22px;
    }
  }

  &-Amount {
    position: relative;
    padding-right: 13px;

    &:after {
      content: '';
      position: absolute;
      top: -2px;
      right: 0;
      width: 1px;
      height: 16px;
      background: var(--color-text-ghost);

      @media (min-width: $screen-m) {
        top: 22px;
        height: calc(100% - 44px);
      }
    }
  }

  &-Wager {
    position: relative;
    padding-right: 13px;
    padding-left: 12px;

    @media (min-width: $screen-m) {
      &:after {
        content: '';
        position: absolute;
        top: 22px;
        right: 0;
        width: 1px;
        height: calc(100% - 44px);
        background: var(--color-text-ghost);
      }
    }
  }

  &-WagerSpent {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 5px;
    padding-left: 30px;
    color: var(--color-text-ghost);

    @media (min-width: $screen-m) {
      width: auto;
      margin-top: 0;
      padding-left: 12px;
    }
  }

  &-Icon {
    position: absolute;
    top: 16px;
    right: 16px;
    fill: var(--color-text-ghost);
    cursor: pointer;

    @media (min-width: $screen-m) {
      position: relative;
      top: initial;
      right: initial;
      margin-left: 8px;
    }
  }

  &-WagerAmount {
    color: var(--color-main1);
  }

  &-Counter {
    display: flex;
    text-transform: none;

    .Counter-Count {
      font-size: 12px;

      @media (min-width: $screen-m) {
        font-size: 14px;
      }
    }

    .Counter-Item:after {
      top: 1px;

      @media (min-width: $screen-m) {
        top: -1px;
      }
    }

    .Counter-AdditionalText {
      margin-left: -10px;
    }
  }

  &-Expires {
    position: relative;
    padding-right: 12px;
  }

  &-Text {
    color: var(--color-text-ghost);
  }

  &-Btn {
    width: 66px;
    height: 26px;
    font-size: 8px;
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      align-self: stretch;
      height: auto;
      font-size: 10px;
      color: var(--color-text-ghost);
      border-left: 4px solid var(--color-body);
    }

    @media (min-width: $screen-xl) {
      width: 166px;
    }
  }
}

.FreeSpin {
  flex-wrap: wrap;
  max-width: 490px;
  padding: 12px 16px;
  background: var(--color-bg);

  &-Section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;

    &--left {
      @media (min-width: $screen-m) {
        justify-content: flex-start;
      }
    }
  }

  &-Amount {
    display: flex;
    align-items: center;
    font-size: 10px;
    text-transform: capitalize;

    @media (min-width: $screen-m) {
      font-size: 12px;
    }
  }

  &-Btn {
    width: 66px;
    height: 26px;
    font-size: 8px;
    text-transform: uppercase;
  }

  &-Label {
    font-size: 12px;
    font-weight: 400;
    color: var(--color-text-ghost);
    text-transform: capitalize;
  }

  &-Expires {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-end;
  }

  &-Status {
    position: relative;
    padding-left: 11px;
    font-size: 10px;
    font-weight: 700;

    &:before {
      content: '';
      position: absolute;
      top: 4px;
      left: 0;
      width: 5px;
      height: 5px;
      background: #0ca649;
      border-radius: 50%;
    }
  }
}
</style>
