<template>
  <div class="CabinetPage BalancePage">
    <BaseModal
      name="lockedByBonus"
      class="BalancePage-LockedBonus"
      width="300"
      height="auto"
      :ok-btn="false"
    >
      <div class="BalancePage-LockedBonusIcon">
        <img src="@/assets/img/locked-bonus.svg" width="130" alt="" />
      </div>
      <div class="Modal-Title">
        {{ $t('modals.wait') }}
      </div>
      <div class="Modal-Text">
        {{ $t('modals.lockedByBonus') }}
      </div>
      <template #button>
        <NuxtLink class="Btn Btn--common Btn--full" :to="localePath('/profile/bonuses')">
          {{ $t('buttons.checkBonuses') }}
        </NuxtLink>
      </template>
    </BaseModal>
    <BaseModal
      name="nullBalance"
      class="BalancePage-LockedBonus"
      width="300"
      height="auto"
      :ok-btn="false"
    >
      <div class="BalancePage-LockedBonusIcon">
        <svg width="95" height="78">
          <use xlink:href="@/assets/img/icons.svg#deposit"></use>
        </svg>
      </div>
      <div class="Modal-Title">
        {{ $t('modals.wait') }}
      </div>
      <div class="Modal-Text">
        {{ $t('modals.nullBalance') }}
      </div>
      <template #button>
        <button class="Btn Btn--common Btn--full" @click="onClickDepositModal">
          {{ $t('buttons.deposit') }}
        </button>
      </template>
    </BaseModal>
    <div class="CabinetPage-Title BalancePage-Title">{{ $t('profile.pages.balance') }}</div>
    <div class="Table CabinetPage-Table BalancePage-Table">
      <div class="Table-Row CabinetPage-Row">
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
          {{ $t('common.status') }}
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
          {{ $t('common.currency') }}
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
          {{ $t('common.amount') }}
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
          {{ $t('profile.balance.table.locked') }}
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
          {{ $t('profile.balance.table.cashout') }}
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th"></div>
      </div>
      <div v-for="(acc, i) in sortedAccountList" :key="i" class="Table-Row CabinetPage-Row">
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Active">
          <label class="CabinetPage-Label">
            {{ acc.active ? $t('profile.balance.active') : $t('profile.balance.select') }}
            <input
              class="CabinetPage-Checkbox"
              type="radio"
              name="account"
              :checked="acc.active"
              :value="acc.currency"
              @change="onChangeAccount"
            />
            <span class="CabinetPage-Checkmark CabinetPage-Checkmark--radio"></span>
          </label>
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Currency">
          {{ acc.currency }}
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Amount">
          {{ acc.balance }} {{ acc.currency }}
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Locked">
          {{ acc.lockedByBonus }}
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Cash">
          {{ acc.withdrawable }}
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Btns">
          <button
            class="Btn Btn--color CabinetPage-Btn BalancePage-Btn"
            :class="{ 'BalancePage-Btn--de': $i18n.locale === 'de' }"
            @click="onClickDeposit(acc.currency)"
          >
            {{ $t('buttons.deposit') }}
          </button>
          <button
            class="Btn Btn--outline CabinetPage-Btn BalancePage-Btn"
            :class="{ 'BalancePage-Btn--de': $i18n.locale === 'de' }"
            @click="onClickCashout(acc.currency)"
          >
            {{ $t('buttons.cashout') }}
          </button>
        </div>
      </div>
    </div>
    <button class="CabinetPage-AddBtn" @click="$modal.show('addCurrency')">
      <span class="CabinetPage-AddBtnPlus CabinetPage-AddBtnPlus--left"> + </span>
      <span class="CabinetPage-AddBtnText"> {{ $t('profile.balance.addCurrency') }} </span>
    </button>
    <modal name="addCurrency" width="348" height="auto" @before-close="beforeCloseModal">
      <div class="Modal">
        <div class="Close Modal-Close" @click="$modal.hide('addCurrency')"></div>
        <div class="AddCurrency">
          <div class="CabinetPage-Header AddCurrency-Header">
            {{ $t('profile.balance.addCurrency') }}
          </div>
          <div v-if="moreCurrencyAccounts.length" class="AddCurrency-Content">
            <div class="AddCurrency-Currencies">
              <div
                v-for="cur in moreCurrencyAccounts"
                :key="cur"
                class="AddCurrency-Currency"
                @click="onChooseCurrency(cur)"
              >
                {{ cur }}
              </div>
            </div>
            <div v-if="serverError" class="AddCurrency-Error Error">
              {{ serverError }}
            </div>
          </div>
          <div v-else class="AddCurrency-Text">
            {{ $t('profile.balance.noMoreCurrency') }}
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'BalancePage',
  computed: {
    ...mapState(['serverError']),
    ...mapGetters(['moreCurrencyAccounts', 'sortedAccountList', 'activeAccount']),
  },
  methods: {
    ...mapMutations(['setCashoutTrue', 'clearServerError']),
    ...mapActions(['setActiveAccount', 'getLimits', 'createAccount', 'getProfile']),
    onClickDeposit(currency) {
      if (currency === this.activeAccount.currency) {
        this.$modal.show('cashier');
        return;
      }
      this.setActiveAccount({ currency }).then(() => {
        this.getProfile();
        this.getLimits();
        this.$modal.show('cashier');
      });
    },
    onClickCashout(currency) {
      if (currency === this.activeAccount.currency) {
        if (this.activeAccount.lockedByBonus) {
          this.$modal.show('lockedByBonus');
          return;
        }
        if (!this.activeAccount.balance) {
          this.$modal.show('nullBalance');
          return;
        }
        this.setCashoutTrue();
        this.$modal.show('cashier');
        return;
      }
      this.setActiveAccount({ currency })
        .then(() => this.getProfile())
        .then(() => {
          this.getLimits();
          if (this.activeAccount.lockedByBonus) {
            this.$modal.show('lockedByBonus');
            return;
          }
          if (!this.activeAccount.balance) {
            this.$modal.show('nullBalance');
            return;
          }
          this.setCashoutTrue();
          this.$modal.show('cashier');
        });
    },
    onChangeAccount(e) {
      this.setActiveAccount({ currency: e.target.value }).then(() => {
        this.getProfile();
        this.getLimits();
      });
    },
    onChooseCurrency(cur) {
      this.createAccount({ currency: cur }).then(() => {
        this.$modal.hide('addCurrency');
        this.getProfile();
      });
    },
    beforeCloseModal() {
      if (this.serverError) this.clearServerError();
    },
    onClickDepositModal() {
      this.$modal.hide('nullBalance');
      this.$modal.show('cashier');
    },
  },
};
</script>

<style lang="scss">
.BalancePage {
  &-Title {
    margin-bottom: 30px;
  }

  &-Btn {
    text-transform: uppercase;

    &:first-child {
      margin-right: 4px;

      @media (min-width: $screen-m) {
        margin-right: 8px;
      }
    }

    &--de {
      padding-right: 2px !important;
      padding-left: 2px !important;
    }
  }

  &-Table {
    margin-bottom: 8px;
  }

  &-Cell {
    order: 1;
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      order: 0;
    }
  }

  &-Btns {
    white-space: nowrap;
  }

  &-Active,
  &-Btns {
    order: 0;
  }

  &-Btns,
  &-Amount,
  &-Cash {
    padding-left: 0;
    text-align: right;

    @media (min-width: $screen-m) {
      padding-left: 15px;
      text-align: left;
    }

    @media (min-width: $screen-xl) {
      white-space: nowrap;
    }
  }

  &-Currency:before,
  &-Amount:before,
  &-Locked:before,
  &-Cash:before {
    display: block;
    margin-bottom: 8px;
    color: var(--color-text-ghost);

    @media (min-width: $screen-m) {
      display: none;
    }
  }

  &-Currency:before {
    content: 'Currency';
  }

  &-Amount:before {
    content: 'Amount';
  }

  &-Locked:before {
    content: 'Locked by bonus';
  }

  &-Cash:before {
    content: 'Available to cash out';
  }

  &-LockedBonus {
    text-align: center;
  }

  &-LockedBonusIcon {
    margin-bottom: 45px;
  }
}

.AddCurrency {
  background: var(--color-body);

  &-Currencies {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 4px;
    padding: 16px;
    background: var(--color-bg);
  }

  &-Currency {
    padding: 13px 0;
    font-size: 10px;
    font-weight: 700;
    text-align: center;
    color: var(--color-text-main);
    text-transform: uppercase;
    background: var(--color-bg-lighter);
    cursor: pointer;

    &:hover {
      padding: 11px 0;
      border: 2px solid var(--color-main1);
    }
  }

  &-Text {
    padding: 25px;
    font-size: 14px;
    color: var(--color-text-ghost);
  }

  &-Error {
    padding-top: 20px;
    font-size: 14px;
  }
}
</style>
