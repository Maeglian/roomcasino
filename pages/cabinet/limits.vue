<template>
  <div class="CabinetPage LimitsPage">
    <div class="CabinetPage-Title LimitsPage-Title">
      Gambling limits
    </div>
    <button class="CabinetPage-AddBtn" @click="showCreateLimitsDialog()">
      <span class="CabinetPage-AddBtnText">
        Create limits
      </span>
      <span class="CabinetPage-AddBtnPlus CabinetPage-AddBtnPlus--right">
        +
      </span>
    </button>
    <div class="LimitsPage-Content">
      <div v-if="!limits.length" class="LimitsPage-Text CabinetPage-Text">
        Do you want to track your activity, loss limits or limit deposits? Your account can be set with all limits. It'll help you to get an overview of your gambling. All restriction takes effect instantly.
      </div>
      <div v-else class="LimitsPage-Limits">
        <div class="LimitsPage-LimitType" v-for="limit in limits">
          <div class="LimitsPage-Header" :key="limit.name">
            {{ limit.name}}
          </div>
          <GamblingLimit
            v-for="(item, i) in limit.limits"
            :key="i"
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
import { mapState } from 'vuex';

export default {
  name: 'LimitsPage',
  components: {
    CreateLimits,
    GamblingLimit,
  },
  computed: {
    ...mapState(['limits']),
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

  &-Limit {
    margin-bottom: 4px;
    break-inside: avoid;
  }

  &-Header {
    height: 55px;
    margin-bottom: 4px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 700;
    line-height: 55px;
    background: var(--color-bg);
    text-transform: capitalize;
    color: var(--color-text-main);
  }
}
</style>
