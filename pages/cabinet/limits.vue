<template>
  <div class="CabinetPage LimitsPage">
    <div class="CabinetPage-Title LimitsPage-Title">Gambling limits</div>
    <button class="CabinetPage-AddBtn" @click="showCreateLimitsDialog()">
      <span class="CabinetPage-AddBtnText"> Create limits </span>
      <span class="CabinetPage-AddBtnPlus CabinetPage-AddBtnPlus--right"> + </span>
    </button>
    <div class="LimitsPage-Content">
      <div v-if="!limits.length" class="LimitsPage-Text CabinetPage-Text">
        Do you want to track your activity, loss limits or limit deposits? Your account can be set
        with all limits. It'll help you to get an overview of your gambling. All restriction takes
        effect instantly.
      </div>
      <div v-else class="LimitsPage-Limits">
        <div v-for="limit in limitsByTypes" :key="limit.name" class="LimitsPage-LimitType">
          <div v-if="limit.limits.length" class="LimitsPage-Header">
            {{ limit.name }}
          </div>
          <GamblingLimit
            v-for="item in limit.limits"
            :key="`${limit.name}_${item.period}`"
            class="LimitsPage-Limit"
            :item="item"
          />
        </div>
      </div>
    </div>
    <modal name="createLimits" width="400" height="auto" adaptive>
      <CreateLimits @close="hideCreateLimitsDialog()" />
    </modal>
  </div>
</template>
<script>
import CreateLimits from '@/components/cabinet/CreateLimits.vue';
import GamblingLimit from '@/components/cabinet/GamblingLimit.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'LimitsPage',
  components: {
    CreateLimits,
    GamblingLimit,
  },
  computed: {
    ...mapState(['limits']),
    ...mapGetters(['limitsByTypes']),
    // limits() {
    //   return this.fakeLimits;
    // },
  },
  methods: {
    showCreateLimitsDialog() {
      this.$modal.show('createLimits');
    },
    hideCreateLimitsDialog() {
      this.$modal.hide('createLimits');
    },
  },
};
</script>

<style lang="scss">
.LimitsPage {
  &-Content {
    width: 100%;
    margin-top: 36px;

    @media (min-width: $screen-m) {
      margin-top: 31px;
    }
  }

  &-Text {
    @media (min-width: $screen-m) {
      width: 60%;
    }
  }

  &-Limits {
    @media (min-width: $screen-m) {
      column-count: 2;
      column-gap: 8px;
    }

    @media (min-width: $screen-xl) {
      column-count: 3;
    }
  }

  &-LimitType {
    break-inside: avoid;
  }

  &-Limit {
    margin-bottom: 4px;
  }

  &-Header {
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
}
</style>
