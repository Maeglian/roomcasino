<template>
  <div class="BalancePage">
    <div class="CabinetPage-Title BalancePage-Title">
      {{ title }}
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
      <div class="Table-Row CabinetPage-Row">
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Active">
          <label class="CabinetPage-Label">
            Active
            <input
              class="CabinetPage-Checkbox"
              type="radio"
              name="currency"
              value=""
            >
            <span class="CabinetPage-Checkmark CabinetPage-Checkmark--radio"></span>
          </label>
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Currency">
          Usd
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Amount">
          514.00 Usd
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Locked">
          0
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Cash">
          316.00 Usd
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Btns">
          <button class="Btn Btn--color CabinetPage-Btn BalancePage-DepositBtn">Deposit</button>
          <button class="Btn Btn--outline CabinetPage-Btn">Cashout</button>
        </div>
      </div>
      <div class="Table-Row CabinetPage-Row">
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Active">
          <label class="CabinetPage-Label">
            Select
            <input
              class="CabinetPage-Checkbox"
              type="radio"
              name="currency"
              value=""
            >
            <span class="CabinetPage-Checkmark CabinetPage-Checkmark--radio"></span>
          </label>
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Currency">
          Usd
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Amount">
          514.00 Usd
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Locked">
          0
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Cash">
          316.00 Usd
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Btns">
          <button class="Btn Btn--color CabinetPage-Btn BalancePage-DepositBtn">Deposit</button>
          <button class="Btn Btn--outline CabinetPage-Btn">Cashout</button>
        </div>
      </div>
      <div class="Table-Row CabinetPage-Row">
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Active">
          <label class="CabinetPage-Label">
            Select
            <input
              class="CabinetPage-Checkbox"
              type="radio"
              name="currency"
              value=""
            >
            <span class="CabinetPage-Checkmark CabinetPage-Checkmark--radio"></span>
          </label>
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Currency">
          Usd
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Amount">
          514.00 Usd
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Locked">
          0
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Cash">
          316.00 Usd
        </div>
        <div class="Table-Cell BalancePage-Cell CabinetPage-Cell BalancePage-Btns">
          <button class="Btn Btn--color CabinetPage-Btn BalancePage-DepositBtn">Deposit</button>
          <button class="Btn Btn--outline CabinetPage-Btn">Cashout</button>
        </div>
      </div>
    </div>
    <button class="CabinetPage-AddBtn">
      +
    </button>
  </div>
</template>

<script>
export default {
  name: 'BalancePage',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
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
</style>
