<template>
  <nav class="CabinetMenu">
    <NuxtLink class="CabinetMenu-NavLink" :to="localePath('/profile/balance')">
      <BaseIcon
        name="balance"
        class="CabinetMenu-NavIcon CabinetMenu-NavIcon--fill"
        width="18"
        height="17"
      />
      {{ $t('profile.pages.balance') }}
    </NuxtLink>
    <NuxtLink class="CabinetMenu-NavLink" :to="localePath('/profile/bonuses')">
      <BaseIcon
        name="promotions"
        class="CabinetMenu-NavIcon CabinetMenu-NavIcon--fill"
        width="18"
        height="18"
      />
      {{ $t('profile.pages.bonuses') }}
    </NuxtLink>
    <NuxtLink class="CabinetMenu-NavLink" :to="localePath('/profile/history/transaction')">
      <BaseIcon
        name="history"
        class="CabinetMenu-NavIcon CabinetMenu-NavIcon--fill"
        width="20"
        height="21"
      />
      {{ $t('profile.pages.history') }}
    </NuxtLink>
    <NuxtLink class="CabinetMenu-NavLink" :to="localePath('/profile/verification')">
      <BaseIcon
        name="verification"
        class="CabinetMenu-NavIcon CabinetMenu-NavIcon--fill"
        width="18"
        height="21"
      />
      {{ $t('profile.pages.verification') }}
    </NuxtLink>
    <NuxtLink class="CabinetMenu-NavLink" :to="localePath('/profile/user/general')">
      <BaseIcon
        name="user2"
        class="CabinetMenu-NavIcon CabinetMenu-NavIcon--stroke"
        width="18"
        height="20"
      />
      {{ $t('profile.pages.user') }}
    </NuxtLink>
    <NuxtLink class="CabinetMenu-NavLink" :to="localePath('/profile/limits')">
      <BaseIcon
        name="settings"
        class="CabinetMenu-NavIcon CabinetMenu-NavIcon--fill"
        width="20"
        height="20"
      />
      <div
        :class="{ 'CabinetMenu-NavLink--cuttext': $i18n.locale === 'pl' || $i18n.locale === 'gr' }"
      >
        {{ $t('profile.pages.limits') }}
      </div>
    </NuxtLink>
    <div class="CabinetMenu-NavLink" @click="onClickExitBtn()">
      <BaseIcon
        name="exit"
        class="CabinetMenu-NavIcon CabinetMenu-NavIcon--fill"
        width="21"
        height="18"
      />
      {{ $t('profile.pages.exit') }}
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';
import BaseIcon from '@/components/base/BaseIcon';

export default {
  name: 'CabinetMenu',
  components: {
    BaseIcon,
  },
  methods: {
    ...mapActions(['logout']),
    onClickExitBtn() {
      this.logout().then(() => this.$router.push(this.localePath('/')));
    },
  },
};
</script>

<style lang="scss">
.CabinetMenu {
  display: flex;
  justify-content: space-between;
  min-width: 100%;
  margin-bottom: 36px;
  padding: 0 11px;
  overflow: auto;
  background: var(--color-bg);

  @media (min-width: $screen-l) {
    display: block;
    flex-grow: 0;
    flex-shrink: 0;
    width: 274px;
    min-width: auto;
    min-height: 100vh;
    margin-bottom: 0;
    padding: 0;
  }

  &-NavLink {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 0;
    padding: 5px 25px;
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
    white-space: nowrap;
    border: 2px solid var(--color-border-input);
    border-radius: var(--border-radius-default);
    cursor: pointer;

    @media (min-width: $screen-l) {
      flex-direction: row;
      justify-content: flex-start;
      margin-right: 0;
      padding: 10px 0 10px 37px;
      font-size: 12px;
      color: var(--color-text-main);
      border: none;
    }

    &--cuttext {
      display: block;
      width: 150px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &:last-child {
      margin-right: 0;
    }

    &.nuxt-link-active {
      color: var(--color-text-main);
      background-color: var(--color-main1);
      border: none;

      @media (min-width: $screen-l) {
        position: relative;
        padding: 10px 5px 10px 37px;
        color: var(--color-main1);
        background-color: transparent;

        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 8px;
          height: 100%;
          background-color: var(--color-main1);
          border-radius: 0 8px 8px 0;
        }
      }

      .CabinetMenu-NavIcon--stroke {
        stroke: var(--color-text-main);

        @media (min-width: $screen-l) {
          stroke: var(--color-main1);
        }
      }

      .CabinetMenu-NavIcon--fill {
        fill: var(--color-text-main);

        @media (min-width: $screen-l) {
          fill: var(--color-main1);
        }
      }
    }
  }

  &-NavIcon {
    max-width: 14px;
    margin-right: 7px;
    flex-shrink: 0;

    @media (min-width: $screen-l) {
      max-width: 18px;
      margin-right: 22px;
      margin-bottom: 0;
    }

    &--fill {
      fill: var(--color-text-main);
    }

    &--stroke {
      stroke: var(--color-text-main);
    }
  }
}
</style>
