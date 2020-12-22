<template>
  <div class="NotificationAlerts">
    <div
      v-for="(item, i) in notificationAlerts"
      :key="`notification_${i}`"
      class="NotificationAlert NotificationAlerts-Item"
    >
      <svg v-if="item.type === 'success'" class="NotificationAlert-Icon">
        <use xlink:href="@/assets/img/icons.svg#success"></use>
      </svg>
      <svg
        v-else
        class="NotificationAlert-Icon"
        :class="
          item.type === 'error' ? 'NotificationAlert-Icon--error' : 'NotificationAlert-Icon--info'
        "
      >
        <use xlink:href="@/assets/img/icons.svg#info"></use>
      </svg>
      <div class="NotificationAlert-Content">
        <div v-if="item.title" class="NotificationAlert-Title">
          {{ item.title }}
        </div>
        <div class="NotificationAlert-Text">
          {{ item.text }}
        </div>
      </div>
      <div class="Close NotificationAlert-Close" @click="deleteNotificationAlert(i)"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'NotificationAlerts',
  computed: {
    ...mapState(['notificationAlerts']),
  },
  methods: {
    ...mapMutations(['deleteNotificationAlert']),
  },
};
</script>

<style lang="scss">
.NotificationAlerts {
  position: fixed;
  top: 0;
  right: 50%;
  z-index: 11;
  max-height: 100%;
  margin-top: 86px;

  @media (min-width: $screen-s) {
    right: 16px;
    margin-top: 116px;
    margin-right: 0;
    direction: rtl;
    columns: auto;
    column-fill: auto;
    column-gap: 12px;
    column-width: 288px;
  }

  &-Item {
    width: 288px;
    margin-bottom: 4px;
    break-inside: avoid;
    direction: ltr;
  }
}

.NotificationAlert {
  display: flex;
  align-items: flex-start;
  padding: 16px 12px;
  background: var(--color-bg);

  &-Icon {
    width: 16px;
    height: 16px;
    margin-right: 12px;

    &--error {
      width: 17px;
      height: 17px;
      fill: var(--color-error);
    }

    &--info {
      width: 17px;
      height: 17px;
      fill: var(--color-text-ghost-lighter);
    }
  }

  &-Content {
    margin-right: 20px;
  }

  &-Title {
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-main);
  }

  &-Text {
    font-size: 12px;
    line-height: 1.34;
    color: var(--color-text-ghost);
  }

  &-Close {
    margin-left: auto;
  }
}
</style>
