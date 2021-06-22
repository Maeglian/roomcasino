<template>
  <section class="CabinetPage">
    <NotificationAlerts />
    <CabinetTopbar />
    <div class="CabinetPage-Wrapper">
      <CabinetMenu />
      <div v-if="Object.keys(user).length" class="CabinetPage-Content">
        <Nuxt />
      </div>
      <Loader v-else class="CabinetPage-Loader" />
    </div>
  </section>
</template>

<script>
import CabinetMenu from '@/components/profile/CabinetMenu.vue';
import CabinetTopbar from '@/components/profile/CabinetTopbar.vue';
import { mapState } from 'vuex';
import Loader from '@/components/Loader';
import NotificationAlerts from '@/components/NotificationAlerts';

export default {
  name: 'CabinetPage',
  components: {
    CabinetMenu,
    CabinetTopbar,
    Loader,
    NotificationAlerts,
  },
  middleware: 'auth',
  computed: {
    ...mapState(['user']),
  },
};
</script>

<style lang="scss">
.CabinetPage {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;

  &-Loader {
    width: 100%;
  }

  &-Link {
    font-weight: 700;
    color: var(--color-text-main);
    cursor: pointer;
  }

  &-Header {
    width: 100%;
    height: 55px;
    margin-bottom: 4px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 700;
    line-height: 55px;
    color: var(--color-text-main);
    text-transform: capitalize;
    background: var(--color-bg);
  }

  &-Wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;

    @media (min-width: $screen-l) {
      flex-direction: row;
    }
  }

  &-Title {
    margin-right: auto;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.242;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-s) {
      font-size: 34px;
    }
  }

  &-Subtitle {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.86;
    color: var(--color-text-main);
    text-transform: capitalize;
  }

  &-Content {
    width: 100%;
    max-width: 100%;
    padding-right: 16px;
    padding-bottom: 30px;
    padding-left: 16px;

    @media (min-width: $screen-l) {
      width: 974px / $screen-xl * 100%;
      padding-top: 46px;
      padding-right: 8px;
      padding-left: 46px;
    }
  }

  &-Text {
    font-size: 14px;
    line-height: 1.4;
    color: var(--color-text-ghost);
  }

  &-Table {
    @media (min-width: $screen-m) {
      display: table;
      border-spacing: 0 4px;
    }
  }

  &-Section {
    margin-bottom: 4px;
    background: var(--color-bg);
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
      color: var(--color-text-ghost);
      text-transform: uppercase;
    }
  }

  &-Btn {
    padding: 7px 12px;
    font-size: 9px;

    @media (min-width: $screen-m) {
      padding: 11px 22px;
      font-size: 10px;
    }

    &:disabled {
      color: var(--color-text-ghost);
      background: var(--color-faded);
    }

    &.Btn--outline {
      padding: 5px 10px;

      @media (min-width: $screen-m) {
        padding: 9px 20px;
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
    border: 2px solid var(--color-text-ghost);
    border-radius: 50%;

    &:hover {
      border: 2px solid var(--color-main1);
    }
  }

  &-Submit {
    font-size: 10px;
    color: var(--color-text-main);
    text-transform: uppercase;
    background: var(--color-bg-lighter);

    @media (min-width: $screen-m) {
      font-size: 12px;
    }
  }

  &-Input {
    font-size: 16px;
    color: var(--color-text-main);
    background: var(--color-bg);
    border: none;

    @media (min-width: $screen-s) {
      font-size: 12px;
    }
  }

  [type='radio'] {
    display: none;

    &:checked ~ .CabinetPage-Checkmark--radio {
      border-color: var(--color-main1);
    }

    &:checked ~ .CabinetPage-Checkmark--radio:before {
      content: '';
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
    display: flex;
    align-items: center;
  }

  &-AddBtnPlus {
    display: inline-block;
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

    &--left {
      margin-right: 13px;
    }

    &--right {
      margin-left: 13px;
    }
  }

  &-AddBtnText {
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-ghost);
    text-transform: uppercase;
    white-space: nowrap;
  }

  &-Dropdown {
    height: 55px;
    font-size: 10px;
    text-transform: uppercase;

    &--currency {
      width: 230px;
    }

    .BaseDropdown-ActiveItem {
      background: var(--color-bg);
    }
  }

  &-Datepicker {
    flex-grow: 1;
    color: var(--color-text-main);
    background: var(--color-bg);

    .Datepicker-Inner {
      right: 0;

      @media (min-width: $screen-xs) {
        right: initial;
        left: 0;
      }

      @media (min-width: $screen-xl) {
        right: 0;
        left: initial;
      }
    }
  }
}
</style>
