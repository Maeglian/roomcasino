<template>
  <div class="CabinetPage BonusesPage">
    <div class="CabinetPage-Title BonusesPage-Title">
      {{ title }}
    </div>
    <button class="BonusesPage-Bonuses">
      Bonus history
      <span class="BonusesPage-BonusesIcon">
        <svg width="16" height="16">
          <use xlink:href="@/assets/img/icons.svg#time"></use>
        </svg>
      </span>
    </button>
    <button class="BonusesPage-All">
      <svg class="BonusesPage-AllIcon" width="16" height="16" >
        <use xlink:href="@/assets/img/icons.svg#promotions"></use>
      </svg>
      See all bonuses
    </button>
    <div class="Table CabinetPage-Table BonusesPage-Table">
      <div class="Table-Row CabinetPage-Row">
        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th">
          Bonus
        </div>
        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th">
          Min deposit sum
        </div>
        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th">
          Max prize
        </div>
        <div class="Table-Cell BonusesPage-Cell CabinetPage-Cell CabinetPage-Th">
        </div>
      </div>
      <div class="Table-Row CabinetPage-Row">
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Bonus">
          100% first welcome bonus
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Min">
          20.00 USD
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Max">
          <div class="BonusesPage-CellWrapper">
            <svg class="BonusesPage-Icon" width="16" height="16" >
              <use xlink:href="@/assets/img/icons.svg#promotions"></use>
            </svg>
            15.00 USD + 55 free spins
          </div>
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Deposit">
          <button
            class="Btn Btn--color CabinetPage-Btn"
            @click="$modal.show('cashier')"
          >
            Deposit
          </button>
        </div>
      </div>
      <div class="Table-Row CabinetPage-Row">
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Bonus">
          100% first welcome bonus
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Min">
          20.00 USD
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Max">
          <div class="BonusesPage-CellWrapper">
            <svg class="BonusesPage-Icon" width="16" height="16" >
              <use xlink:href="@/assets/img/icons.svg#promotions"></use>
            </svg>
            15.00 USD + 55 free spins
          </div>
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Deposit">
          <button
            class="Btn Btn--color CabinetPage-Btn"
            @click="$modal.show('cashier')"
          >
            Deposit
          </button>
        </div>
      </div>
      <div class="Table-Row CabinetPage-Row">
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Bonus">
          100% first welcome bonus
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Min">
          20.00 USD
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Max">
          <div class="BonusesPage-CellWrapper">
            <svg class="BonusesPage-Icon" width="16" height="16" >
              <use xlink:href="@/assets/img/icons.svg#promotions"></use>
            </svg>
            15.00 USD + 55 free spins
          </div>
        </div>
        <div class="Table-Cell CabinetPage-Cell BonusesPage-Cell BonusesPage-Deposit">
          <button
            class="Btn Btn--color CabinetPage-Btn"
            @click="$modal.show('cashier')"
          >
            Deposit
          </button>
        </div>
      </div>
    </div>
    <div class="CabinetPage-Subtitle BonusesPage-Subtitle">
      Receive a bonus
    </div>
    <form class="BonusesPage-Form CabinetPage-Form">
      <input
        type="text"
        class="BonusesPage-Input CabinetPage-Input"
        placeholder="Promo code"
      />
      <button class="BonusesPage-Submit CabinetPage-Submit" type="submit">
        Add
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'BonusesPage',
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
.BonusesPage {
  &-Bonuses {
    display: flex;
    align-items: center;
    color: var(--color-text-ghost);
    white-space: nowrap;
    font-size: 10px;
    text-transform: uppercase;

    @media(min-width: $screen-m) {
      margin-right: 4px;
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

    @media(min-width: $screen-m) {
      width: 55px;
      height: 55px;
    }
  }

  &-All {
    order: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 28px;
    padding: 22px 0;
    font-size: 10px;
    text-transform: uppercase;
    color: var(--color-main1);
    text-align: center;
    background: var(--color-bg-lighter);

    @media(min-width: $screen-m) {
      order: 0;
      align-self: stretch;
      width: auto;
      margin-bottom: 0;
      padding: 0 20px;
    }
  }

  &-AllIcon {
    margin-right: 8px;

    @media(min-width: $screen-m) {
      margin-right: 10px;
    }
  }

  &-Table {
    margin-top: 24px;

    @media(min-width: $screen-m) {
      margin-bottom: 48px;
    }
  }

  &-Cell {
    text-transform: uppercase;

    @media(min-width: $screen-m) {
      white-space: nowrap;
    }
  }

  &-Bonus, &-Max {
    text-transform: capitalize;
  }

  &-Icon {
    margin-right: 8px;

    @media(min-width: $screen-m) {
      margin-right: 12px;
    }
  }

  &-CellWrapper {
    display: flex;
    align-items: center;
  }

  &-Min, &-Deposit {
    text-align: right;

    @media(min-width: $screen-m) {
      text-align: left;
    }
  }

  &-Min:before {
    content: 'Min deposit sum';
    display: block;
    margin-bottom: 8px;
    color: var(--color-text-ghost);

    @media(min-width: $screen-m) {
      display: none;
    }
  }

  &-Subtitle {
    order: 1;
    width: 100%;
    margin-bottom: 12px;
  }

  &-Form {
    order: 1;
    display: flex;
    width: 100%;

    @media(min-width: $screen-m) {
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

    @media(min-width: $screen-m) {
      width: 122px;
    }
  }
}
</style>
