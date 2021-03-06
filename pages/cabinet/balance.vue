<template>
  <div class="CabinetPage BalancePage">
    <div class="CabinetPage-Title BalancePage-Title">{{ $t('cabinet.pages.balance') }}</div>
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
          {{ $t('cabinet.balance.table.locked') }}
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
          {{ $t('cabinet.balance.table.cashout') }}
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th"></div>
      </div>
      <div v-for="(acc, i) in sortedAccountList" :key="i" class="Table-Row CabinetPage-Row">
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Active">
          <label class="CabinetPage-Label">
            {{ acc.active ? $t('cabinet.balance.active') : $t('cabinet.balance.select') }}
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
            class="Btn Btn--common Btn--color CabinetPage-Btn BalancePage-DepositBtn"
            @click="onClickDeposit(acc.currency)"
          >
            {{ $t('buttons.deposit') }}
          </button>
          <button
            class="Btn Btn--common Btn--outline CabinetPage-Btn"
            @click="onClickCashout(acc.currency)"
          >
            {{ $t('buttons.cashout') }}
          </button>
        </div>
      </div>
    </div>
    <button class="CabinetPage-AddBtn" @click="$modal.show('addCurrency')">
      <span class="CabinetPage-AddBtnPlus CabinetPage-AddBtnPlus--left"> + </span>
      <span class="CabinetPage-AddBtnText"> {{ $t('cabinet.balance.addCurrency') }} </span>
    </button>
    <modal name="addCurrency" width="348" height="auto" @before-close="beforeCloseModal">
      <div class="Modal">
        <div class="Close Modal-Close" @click="$modal.hide('addCurrency')"></div>
        <div class="AddCurrency">
          <div class="CabinetPage-Header AddCurrency-Header">
            {{ $t('cabinet.balance.addCurrency') }}
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
            {{ $t('cabinet.balance.noMoreCurrency') }}
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
    ...mapGetters(['moreCurrencyAccounts', 'sortedAccountList']),
  },
  methods: {
    ...mapMutations(['setCashoutTrue', 'clearServerError']),
    ...mapActions(['setActiveAccount', 'getLimits', 'createAccount', 'getProfile']),
    onClickDeposit(currency) {
      this.setActiveAccount({ currency }).then(() => {
        this.$modal.show('cashier');
      });
    },
    onClickCashout(currency) {
      this.setActiveAccount({ currency }).then(() => {
        this.setCashoutTrue();
        this.$modal.show('cashier');
      });
    },
    onChangeAccount(e) {
      this.setActiveAccount({ currency: e.target.value });
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
  },
};
</script>

<style lang="scss">
.BalancePage {
  &-Title {
    margin-bottom: 30px;
  }

  &-DepositBtn {
    margin-right: 4px;

    @media (min-width: $screen-m) {
      margin-right: 8px;
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
