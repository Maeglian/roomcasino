<template>
  <nav class="MobileNav">
    <button class="MobileNav-Item" @click="toggleNav()">
      <svg class="MobileNav-Toggle Toggle Toggle--colored">
        <use xlink:href="@/assets/img/icons.svg#toggle"></use>
      </svg>
      <div class="MobileNav-Name">
        Menu
      </div>
    </button>
    <NuxtLink class="MobileNav-Item" to="/promotions">
      <svg width="17" height="16">
        <use xlink:href="@/assets/img/icons.svg#promotions"></use>
      </svg>
      <div class="MobileNav-Name">
        Promotions
      </div>
    </NuxtLink>
    <button class="MobileNav-Item" @click="$modal.show('cashier')">
      <svg width="18" height="15">
        <use xlink:href="@/assets/img/icons.svg#deposit"></use>
      </svg>
      <div class="MobileNav-Name">
        Deposit
      </div>
    </button>
    <button v-if="chatIsLoaded" class="MobileNav-Item" @click="onClickSupport">
      <svg width="18" height="15">
        <use xlink:href="@/assets/img/icons.svg#support"></use>
      </svg>
      <div class="MobileNav-Name">
        Support
      </div>
    </button>
    <!--    <div class="MobileNav-Item" @click="toggleNotificationsPanel">-->
    <!--      <div class="MobileNav-Messages">-->
    <!--        <svg width="12" height="14">-->
    <!--          <use xlink:href="@/assets/img/icons.svg#messages"></use>-->
    <!--        </svg>-->
    <!--        <div v-show="isNewNotifications" class="MobileNav-MessagesNew"></div>-->
    <!--      </div>-->
    <!--      <div class="MobileNav-Name">-->
    <!--        Notification-->
    <!--      </div>-->
    <!--    </div>-->
  </nav>
</template>

<script>
import showAuthDialog from '@/mixins/showAuthDialog';
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: 'MobileNav',
  mixins: [showAuthDialog],
  data() {
    return {
      chatIsLoaded: false,
    };
  },
  computed: {
    ...mapState(['navIsOpen', 'notificationsPanelIsOpen']),
    ...mapGetters(['activeAccount', 'isNewNotifications']),
  },
  mounted() {
    if (!window.LC_API) window.LC_API = {};
    window.LC_API.on_after_load = () => (this.chatIsLoaded = true);
  },
  methods: {
    ...mapMutations(['openNav', 'closeNav', 'openNotificationsPanel', 'closeNotificationsPanel']),
    toggleNav() {
      if (this.navIsOpen) this.closeNav();
      else this.openNav();
    },
    toggleNotificationsPanel() {
      if (this.notificationsPanelIsOpen) this.closeNotificationsPanel();
      else this.openNotificationsPanel();
    },
    onClickSupport() {
      window.LC_API.open_chat_window();
    },
  },
};
</script>

<style lang="scss">
.MobileNav {
  position: fixed;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 18px 24px 20px;
  background: var(--color-body);

  @media (min-width: $screen-xs) {
    display: none;
  }

  &-Item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  &-Messages {
    position: relative;
  }

  &-Icon {
    width: 12px;
    height: 14px;
  }

  &-Name {
    font-size: 7px;
    font-weight: 400;
    line-height: 1.66;
    color: var(--color-text-main);
    text-transform: uppercase;
  }

  &-MessagesNew {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: var(--color-error);
    border: 1px solid var(--color-body);
    border-radius: 50%;
  }
}

.MobileNav-Toggle {
  width: 17px;
  height: 17px;
}
</style>
