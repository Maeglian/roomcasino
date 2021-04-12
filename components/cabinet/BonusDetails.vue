<template>
  <div class="Modal">
    <div class="Close Modal-Close" @click="$emit('close')"></div>
    <div class="CabinetPage-Header">{{ bonus.name }}</div>
    <div class="BonusDetails">
      <div class="BonusDetails-Row">
        <div class="BonusDetails-Label">
          <template v-if="$i18n.locale === 'de'">
            {{ $t('cabinet.bonuses.table.bonus') }}{{ $t('common.amount') }}:
          </template>
          <template v-else
            >{{ $t('cabinet.bonuses.table.bonus') }} {{ $t('common.amount') }}:</template
          >
        </div>
        <div class="BonusDetails-Value">{{ bonus.amount }} {{ bonus.currency }}</div>
      </div>
      <div class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.status') }}:</div>
        <div
          class="BonusDetails-Value BonusDetails-Status"
          :class="[
            { 'BonusDetails-Status--active': bonus.status === 'active' },
            {
              'BonusDetails-Status--cancelled':
                bonus.status === 'cancel' ||
                bonus.status === 'expired' ||
                bonus.status === 'runOut',
            },
          ]"
        >
          {{ bonus.status }}
        </div>
      </div>
      <div class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.wager') }}:</div>
        <div class="BonusDetails-Value">{{ bonus.wager }}</div>
      </div>
      <div class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.wager') }} {{ $t('common.amount') }}:</div>
        <div class="BonusDetails-Value">{{ bonus.currentWagerAmount }} {{ bonus.currency }}</div>
      </div>
      <div class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('cabinet.bonuses.wagerAmountRequirement') }}:</div>
        <div class="BonusDetails-Value">{{ bonus.wagerAmount }} {{ bonus.currency }}</div>
      </div>
      <div class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('cabinet.bonuses.wageredPercent') }}:</div>
        <div class="BonusDetails-Value">
          {{ (bonus.currentWagerAmount / bonus.wagerAmount) * 100 }}%
        </div>
      </div>
      <div class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.currency') }}:</div>
        <div class="BonusDetails-Value">
          {{ bonus.currency }}
        </div>
      </div>
      <div class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.created') }}:</div>
        <div class="BonusDetails-Value">
          {{ convertDate(bonus.createdAt) }}
        </div>
      </div>
      <div v-if="bonus.expireAt" class="BonusDetails-Row">
        <div class="BonusDetails-Label">{{ $t('common.expiresAt') }}:</div>
        <div class="BonusDetails-Value">
          {{ convertDate(bonus.expireAt) }}
        </div>
      </div>
      <div v-if="bonus.activationExpireAt" class="BonusDetails-Row">
        <div class="BonusDetails-Label">Activation expires at:</div>
        <div class="BonusDetails-Value">
          {{ convertDate(bonus.activationExpireAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'BonusDetails',
  props: {
    bonus: {
      type: Object,
      required: true,
    },
  },
  methods: {
    convertDate(timestamp) {
      return moment.unix(timestamp).format('DD MMM YYYY, HH:mm:ss');
    },
  },
};
</script>

<style lang="scss">
.BonusDetails {
  margin-top: 4px;
  padding: 14px 16px;
  background: var(--color-bg);

  &-Row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  &-Label {
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-ghost);
    text-transform: uppercase;
  }

  &-Value {
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
  }

  &-Status {
    color: var(--color-main1);

    &--active {
      color: var(--color-accept);
    }

    &--cancelled {
      color: var(--color-error);
    }
  }
}
</style>
