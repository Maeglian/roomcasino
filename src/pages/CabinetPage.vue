<template>
<section class="CabinetPage">
  <CabinetTopbar />
  <div class="CabinetPage-Wrapper">
    <CabinetMenu />
    <div class="CabinetPage-Content">
      <router-view />
    </div>
  </div>
</section>
</template>

<script>
import CabinetMenu from '@/components/CabinetMenu.vue';
import CabinetTopbar from '@/components/CabinetTopbar.vue';

export default {
  name: 'CabinetPage',
  components: {
    CabinetMenu,
    CabinetTopbar,
  },
};
</script>

<style lang="scss">
.CabinetPage {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;

  &-Link {
    font-weight: 700;
    color: var(--color-text-main);
  }

  &-Wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;

    @media(min-width: $screen-l) {
      flex-direction: row;
    }
  }

  &-Title {
    margin-right: auto;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.242;
    text-transform: uppercase;
    color: var(--color-text-main);

    @media (min-width: $screen-s) {
      font-size: 34px;
    }
  }

  &-Subtitle {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.86;
    text-transform: capitalize;
    color: var(--color-text-main);
  }

  &-Content {
    width: 100%;
    max-width: 100%;
    padding-left: 16px;
    padding-bottom: 30px;
    padding-right: 16px;

    @media (min-width: $screen-l) {
      width: 974px / $screen-xl * 100%;
      padding-top: 46px;
      padding-left: 46px;
      padding-right: 8px;
    }
  }

  &-Table {
    @media (min-width: $screen-m) {
      display: table;
      border-spacing: 0 4px;
    }
  }

  &-Row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 4px;

    @media (min-width: $screen-m) {
      display: table-row;
      margin-bottom: 0;
    }
  }

  &-Cell {
    width: 50%;
    padding: 15px;
    font-size: 9px;
    font-weight: 700;
    line-height: 1.26;
    color: var(--color-text-main);
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      display: table-cell;
      width: 100%;
      font-size: 12px;
      vertical-align: middle;
    }
  }

  &-Th {
    display: none;

    @media (min-width: $screen-m) {
      display: table-cell;
      font-size: 10px;
      text-transform: uppercase;
      color: var(--color-text-ghost);
    }
  }

  &-Btn {
    padding: 7px 12px;
    font-size: 9px;

    @media (min-width: $screen-m) {
      padding: 11px 22px;
      font-size: 10px;
    }

    &.Btn--outline {
      padding: 5px 10px;

      @media (min-width: $screen-m) {
        padding: 9px 20px;;
      }
    }
  }

  &-Label {
    position: relative;
    padding-left: 38px;
  }

  &-Checkmark {
    position: absolute;
    top: 50%;
    left: 0;
    width: 22px;
    height: 22px;
    margin-top: -11px;
    border-radius: 50%;
    border: 2px solid var(--color-text-ghost);

    &:hover {
      border: 2px solid var(--color-main1);
    }
  }

  &-Submit {
    font-size: 10px;
    text-transform: uppercase;
    color: var(--color-text-main);
    background: var(--color-bg-lighter);

    @media (min-width: $screen-m) {
      font-size: 12px;
    }
  }

  [type="text"] {
    color: var(--color-text-main);
    background: var(--color-bg);
    border: none;

    &::placeholder {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--color-text-ghost);
    }
  }

  [type="radio"] {
    display: none;

    &:checked ~ .CabinetPage-Checkmark--radio {
      border-color: var(--color-main1);
    }

    &:checked ~ .CabinetPage-Checkmark--radio:before {
      content: "";
      position: absolute;
      top: calc(50% - 4px);
      left: calc(50% - 4px);
      width: 8px;
      height: 8px;
      background-color: var(--color-main1);
      border-radius: 50%;
    }
  }

  &-AddBtn {
    position: relative;
    content: "+";
    width: 40px;
    height: 40px;
    font-size: 25px;
    font-weight: 400;
    line-height: 40px;
    color: var(--color-main1);
    background: var(--color-bg);
    cursor: pointer;

    @media (min-width: $screen-m) {
      width: 55px;
      height: 55px;
      line-height: 55px;
    }

    &:after {
      content: "Add currency";
      position: absolute;
      top: 0;
      left: calc(100% + 15px);
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--color-text-ghost);
      white-space: nowrap;
    }
  }

  &-Tabs {
    display: flex;
    width: 100%;

    @media (min-width: $screen-m) {
      width: auto;
    }
  }

  &-Tab {
    position: relative;
    margin-right: 4px;
    padding: 14px 22px;
    font-size: 10px;
    font-weight: 700;
    text-align: center;
    color: var(--color-text-main);
    background: var(--color-bg);

    &:last-child {
      margin-right: 0;
    }

    &.router-link-active {
      color: var(--color-main1);

      &:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 50px;
        height: 4px;
        background: var(--color-main1);
        transform: translateX(-50%);
      }
    }
  }

  &-Dropdown {
    flex-grow: 1;

    &--currency {
      width: 230px;
    }
  }

  &-Datepicker {
    flex-grow: 1;

    .Datepicker-Inner {
      right: 0;

      @media(min-width: $screen-xs) {
        left: 0;
        right: initial;
      }

      @media(min-width: $screen-xl) {
        left: initial;
        right: 0;
      }
    }
  }
}

</style>
