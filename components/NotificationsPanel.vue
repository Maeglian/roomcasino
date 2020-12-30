<template>
  <transition name="slide-right">
    <div v-show="notificationsPanelIsOpen" v-click-outside="vcoConfig" class="NotificationsPanel">
      <div class="NotificationsPanel-Header">
        <NuxtLink to="/">
          <img class="NotificationsPanel-Logo" src="@/assets/img/logo.svg" />
        </NuxtLink>
        <div class="Close NotificationsPanel-Close" @click="closeNotificationsPanel"></div>
      </div>
      <BaseTabs
        class="NotificationsPanel-Tabs"
        :items="tabs"
        :current-item="activeTab"
        @choose-tab="activeTab = $event"
      />
      <div class="NotificationsPanel-Content">
        <div v-if="!notifications[activeTab].length" class="NotificationsPanel-Empty">
          <div class="NotificationsPanel-EmptyContent">
            <img src="@/assets/img/notification.png" alt="" class="NotificationsPanel-Image" />
            <div class="NotificationsPanel-Text">No current {{ activeTab }}</div>
          </div>
        </div>
        <template v-else>
          <div
            v-for="item in notifications[activeTab]"
            :key="item.title"
            class="NotificationCard NotificationsPanel-Card"
          >
            <div class="NotificationCard-Content">
              <div class="NotificationCard-Header">
                <img
                  :src="require(`~/assets/img/${item.icon}`)"
                  alt=""
                  class="NotificationCard-Icon"
                />
                <div class="NotificationCard-Title">
                  {{ item.title }}
                </div>
              </div>
              <div class="NotificationCard-Text" v-html="item.text"></div>
            </div>
            <NuxtLink to="#" class="Btn Btn--common Btn--dark NotificationCard-Btn">
              {{ item.btnText }}
            </NuxtLink>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import BaseTabs from '@/components/base/BaseTabs';

export default {
  name: 'NotificationsPanel',
  components: {
    BaseTabs,
  },
  data() {
    return {
      tabs: [
        {
          value: 'promotions',
          name: 'Promotions',
        },
        {
          value: 'tournaments',
          name: 'Tournaments',
        },
        {
          value: 'notifications',
          name: 'Notifications',
        },
      ],
      activeTab: 'promotions',
      vcoConfig: {
        handler: this.onClickOutside,
        detectIframe: true,
      },
    };
  },
  computed: {
    ...mapState(['notificationsPanelIsOpen', 'notifications']),
  },
  methods: {
    ...mapMutations(['closeNotificationsPanel']),
    onClickOutside(e) {
      if (!(e.target instanceof Element)) return;
      if (!e.target.closest('.AuthSection-UserMessages')) this.closeNotificationsPanel();
    },
  },
};
</script>

<style lang="scss">
.NotificationsPanel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  width: 100%;
  padding: 16px;
  background: var(--color-body);

  @media (min-width: $screen-l) {
    width: 375px;
    padding: 4px;
  }

  &-Header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;

    @media (min-width: $screen-m) {
      margin-bottom: 16px;
    }

    @media (min-width: $screen-l) {
      position: absolute;
      top: 4px;
      right: 4px;
      justify-content: center;
      width: 55px;
      height: 55px;
      margin-bottom: 0;
      background: var(--color-bg);
    }
  }

  &-Logo {
    width: 110px;

    @media (min-width: $screen-m) {
      width: 172px;
    }

    @media (min-width: $screen-l) {
      display: none;
    }
  }

  &-Tabs {
    margin-bottom: 4px;
    font-size: 10px;

    @media (min-width: $screen-l) {
      width: calc(100% - 59px);
    }
  }

  &-Content {
    height: 100%;
    overflow: auto;
  }

  &-Empty {
    width: 100%;
    height: 100%;
    background: var(--color-bg);
  }

  &-EmptyContent {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
  }

  &-Image {
    width: 140px;
    margin-bottom: 30px;

    @media (min-width: $screen-m) {
      width: auto;
    }

    @media (min-width: $screen-l) {
      width: 140px;
    }
  }

  &-Text {
    font-size: 12px;
    color: var(--color-text-ghost);
  }

  &-Card {
    margin-bottom: 6px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.NotificationCard {
  width: 100%;

  @media (min-width: $screen-m) {
    display: flex;
  }

  @media (min-width: $screen-l) {
    display: block;
  }

  &-Content {
    margin-bottom: 6px;
    padding: 16px;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      flex-grow: 1;
      margin-right: 6px;
      margin-bottom: 0;
    }

    @media (min-width: $screen-l) {
      margin-right: 0;
      margin-bottom: 6px;
    }
  }

  &-Header {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
  }

  &-Icon {
    height: 16px;
    margin-right: 12px;
  }

  &-Title {
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;

    @media (min-width: $screen-m) {
      font-size: 16px;
    }

    @media (min-width: $screen-l) {
      font-size: 12px;
    }
  }

  &-Text {
    font-size: 12px;
    color: var(--color-text-ghost);

    @media (min-width: $screen-m) {
      font-size: 16px;
    }

    @media (min-width: $screen-l) {
      font-size: 12px;
    }
  }

  &-Btn {
    width: 100%;
    padding: 19px 0;
    font-size: 10px;

    @media (min-width: $screen-m) {
      flex-grow: 0;
      width: 266px;
      font-size: 16px;
    }

    @media (min-width: $screen-l) {
      width: 100%;
      font-size: 10px;
    }
  }

  strong {
    font-weight: 700;
    color: var(--color-text-main);
  }
}
</style>
