<template>
  <div class="CabinetPage BalancePage">
    <div class="CabinetPage-Title BalancePage-Title">
      Balance
    </div>
    <div class="Table CabinetPage-Table BalancePage-Table">
      <div class="Table-Row CabinetPage-Row">
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
          Status
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
          Currency
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
          Amount
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
          Locked by bonus
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
          Available to cash out
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell CabinetPage-Th">
        </div>
      </div>
      <div
        v-for="(acc, i) in userAccounts"
        :key="i"
        class="Table-Row CabinetPage-Row"
      >
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Active">
          <label class="CabinetPage-Label">
            {{ acc.active ? 'Active' : 'Select' }}
            <input
              class="CabinetPage-Checkbox"
              type="radio"
              name="account"
              :checked="acc.active"
              :value="acc.currency"
              @change="setActiveAccount({ currency: $event.target.value})"
            >
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
          0
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Cash">
          0
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Btns">
          <button
            class="Btn Btn--color CabinetPage-Btn BalancePage-DepositBtn"
            @click="onClickDeposit(acc.currency)"
          >
            Deposit
          </button>
          <button
            class="Btn Btn--outline CabinetPage-Btn"
            @click="onClickCashout(acc.currency)"
          >
            Cashout
          </button>
        </div>
      </div>
    </div>
    <button
      class="CabinetPage-AddBtn"
      @click="$modal.show('addCurrency')"
    >
      <span class="CabinetPage-AddBtnPlus CabinetPage-AddBtnPlus--left">
        +
      </span>
      <span class="CabinetPage-AddBtnText">
        Add currency
      </span>
    </button>
    <modal name="addCurrency" width="348" height="auto">
      <div class="AddCurrency">
        <div class="CabinetPage-Header AddCurrency-Header">
          Add Currency
        </div>
        <div class="AddCurrency-Content">
          <div
            v-for="cur in curencyAccounts"
            :key="cur"
            class="AddCurrency-Currency"
          >
            {{ cur }}
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import {
  mapMutations, mapState, mapActions, mapGetters,
} from 'vuex';

export default {
  name: 'BalancePage',
  data() {
    return {
      fakeUserAccounts: [
        {
          active: true,
          currency: 'USD',
          balance: '514.00',
        },
        {
          active: false,
          currency: 'EUR',
          balance: '318.00',
        },
        {
          active: false,
          currency: 'RUB',
          balance: '0',
        },
      ],
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['curencyAccounts']),
    userAccounts() {
      return this.user.accountList || this.fakeUserAccounts;
    },
  },
  methods: {
    ...mapMutations(['setCashoutTrue']),
    ...mapActions(['setActiveAccount']),
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

    @media(min-width: $screen-m) {
      margin-right: 8px;
    }
  }

  &-Table {
    margin-bottom: 8px;
  }

  &-Cell {
    order: 1;
    text-transform: uppercase;

    @media(min-width: $screen-m) {
      order: 0;
    }
  }

  &-Btns {
    white-space: nowrap;
  }

  &-Active, &-Btns {
    order: 0;
  }

  &-Btns, &-Amount, &-Cash {
    padding-left: 0;
    text-align: right;

    @media(min-width: $screen-m) {
      padding-left: 15px;
      text-align: left;
    }

    @media(min-width: $screen-xl) {
      white-space: nowrap;
    }
  }

  &-Currency:before, &-Amount:before, &-Locked:before, &-Cash:before {
    display: block;
    margin-bottom: 8px;
    color: var(--color-text-ghost);

    @media(min-width: $screen-m) {
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

  &-Content {
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
    text-transform: uppercase;
    text-align: center;
    color: var(--color-text-main);
    background: var(--color-bg-lighter);
    cursor: pointer;

    &:hover {
      padding: 11px 0;
      border: 2px solid var(--color-main1);
    }
  }
}
</style>
