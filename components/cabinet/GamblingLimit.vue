<template>
  <div class="GamblingLimit" :style="{ '--color': color, '--offset': strokeOffset }">
    <div class="GamblingLimit-Header">
      <div class="GamblingLimit-Title">{{ title }} limit</div>
      <button
        ref="edit"
        type="button"
        class="GamblingLimit-Edit"
        @click="editMenuIsOpen = !editMenuIsOpen"
      >
        ...
      </button>
    </div>
    <div class="GamblingLimit-Content">
      <div v-if="editMenuIsOpen" v-click-outside="onClickOutside" class="GamblingLimit-EditMenu">
        <button type="button" class="GamblingLimit-EditMenuItem" @click="onClickEdit">
          <svg class="GamblingLimit-EditMenuIcon GamblingLimit-EditIcon">
            <use xlink:href="@/assets/img/icons.svg#edit"></use>
          </svg>
          Edit limit
        </button>
        <button type="button" class="GamblingLimit-EditMenuItem" @click="onClickDelete">
          <svg class="GamblingLimit-EditMenuIcon GamblingLimit-DeleteIcon">
            <use xlink:href="@/assets/img/icons.svg#delete"></use>
          </svg>
          Delete limit
        </button>
      </div>
      <div v-if="item.type === 'depositLimit'" class="GamblingLimit-State">
        <div class="GamblingLimit-Scale">
          <svg class="GamblingLimit-Circle">
            <circle class="GamblingLimit-CircleBg" cx="20" cy="20" r="17"></circle>
            <circle class="GamblingLimit-Progress" cx="20" cy="20" r="17"></circle>
          </svg>
        </div>
        <Counter
          class="GamblingLimit-Counter"
          :min-format="true"
          :enddate="new Date(item.refreshAt * 1000)"
        />
      </div>
      <div v-if="item.type === 'session'" class="GamblingLimit-LineScale">
        <div
          class="GamblingLimit-LineScale GamblingLimit-LineScale--spent"
          :style="{ width: `${(item.limitState / item.limitAmount) * 100}%` }"
        >
          <svg class="GamblingLimit-SessionIcon">
            <use xlink:href="@/assets/img/icons.svg#clock"></use>
          </svg>
          {{ item.limitState }} min
        </div>
        {{ sessionLeft }} min
      </div>
      <div v-else class="GamblingLimit-Footer">
        <div class="GamblingLimit-Details">
          <template v-if="item.type === 'depositLimit'">
            {{ item.value }} of {{ item.targetValue }} {{ activeAccount.currency }} left
          </template>
          <template v-else class="GamblingLimit-Left">
            <svg
              v-if="item.type === 'reality_check'"
              class="GamblingLimit-Icon GamblingLimit-RealityIcon"
            >
              <use xlink:href="@/assets/img/icons.svg#clock"></use>
            </svg>
            <svg
              v-if="item.type === 'self_exclusion'"
              class="GamblingLimit-Icon GamblingLimit-BlockedIcon"
            >
              <use xlink:href="@/assets/img/icons.svg#calendar"></use>
            </svg>
            {{ item.period }}
          </template>
        </div>
        <div class="GamblingLimit-Active" :class="{ 'GamblingLimit-Active--active': isActive }">
          Active
        </div>
      </div>
    </div>
    <!--    <modal name="delete" width="400" height="auto" adaptive>-->
    <!--      <div class="Modal">-->
    <!--        <div class="Close Modal-Close" @click="$modal.hide('delete')"></div>-->
    <!--          <ConfirmDialog-->
    <!--            title="Delete limit"-->
    <!--            :text="`Are you sure you want to delete ${item.type} limit?`"-->
    <!--            okBtnText="delete limit"-->
    <!--            @cancel="$modal.hide('delete')"-->
    <!--            @ok="onDeleteLimit"-->
    <!--          />-->
    <!--      </div>-->
    <!--    </modal>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LIMIT_PERIODS } from '@/config';
import Counter from '@/components/Counter';
import CreateLimits from '@/components/cabinet/CreateLimits';
import ConfirmDialog from '@/components/cabinet/ConfirmDialog';

const circleLength = 106.8;

export default {
  name: 'GamblingLimit',
  components: {
    Counter,
  },
  props: {
    item: {
      type: Object,
      isRequired: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      editMenuIsOpen: false,
    };
  },
  computed: {
    ...mapGetters(['activeAccount']),
    title() {
      return LIMIT_PERIODS.find(period => period.value === this.item.period).name;
    },
    color() {
      switch (this.item.type) {
        case 'lossLimit':
          return '#8733F3';
        case 'wagerLimit':
          return '#335DF3';
        case 'coolingLimit':
          return '#EB1C2A';
        case 'depositLimit':
          return '#33C5F3';
        default:
          return '#F3B233';
      }
    },
    isActive() {
      if (this.item.refreshAt) return new Date(this.item.refreshAt) > new Date();
      return true;
    },
    strokeOffset() {
      return (this.item.value / this.item.targetValue) * circleLength;
    },
    sessionLeft() {
      return this.item.limitAmount - this.item.limitState;
    },
  },
  methods: {
    ...mapActions(['deleteLimit', 'getLimits']),
    onClickOutside(e) {
      if (e.target !== this.$refs.edit) this.editMenuIsOpen = false;
    },
    onClickEdit() {
      this.$modal.show(
        CreateLimits,
        { isEdit: true, item: this.item, onUpdateLimit: this.onUpdateLimit },
        { width: 400, height: 'auto', adaptive: true },
        {
          'update-limit': e => this.$emit('update-limit', e),
        },
      );
    },
    onUpdateLimit(payload) {
      this.$emit('update-limit', payload);
      this.$modal.hide('delete');
    },
    onClickCancelDelete() {
      this.$modal.hide('delete');
    },
    onDeleteLimit() {
      this.deleteLimit({
        type: this.item.type,
        period: this.item.period,
      }).then(() => this.getLimits());
      this.editMenuIsOpen = false;
    },
    onCloseDeleteConfirmDialog() {
      this.$emit('close');
    },
    onClickDelete() {
      this.$modal.show(
        ConfirmDialog,
        {
          title: 'Delete limit',
          text: `Are you sure you want to delete ${this.item.type} limit?`,
          okBtnText: 'delete limit',
          closeBtn: true,
          onCancel: this.onCloseDeleteConfirmDialog,
          onOk: this.onDeleteLimit,
        },
        { width: 400, height: 'auto', adaptive: true },
      );
    },
  },
};
</script>

<style lang="scss">
.GamblingLimit {
  padding: 16px;
  background: var(--color-bg);

  &-Header,
  &-Footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-Header {
    margin-bottom: 16px;
  }

  &-Title {
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-ghost);
    text-transform: uppercase;
  }

  &-Edit {
    font-size: 25px;
    font-weight: 700;
    color: var(--color-text-ghost);
    cursor: pointer;
  }

  &-Content {
    position: relative;
  }

  &-EditMenu {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    width: 182px;
    padding: 25px 18px;
    background: var(--color-bg-lighter);
  }

  &-EditMenuIcon {
    margin-right: 10px;
  }

  &-EditMenuItem {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 14px;
    color: var(--color-text-ghost);
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-EditIcon {
    width: 15px;
    height: 14px;
  }

  &-DeleteIcon {
    width: 12px;
    height: 16px;
    margin-left: 3px;
  }

  &-Scale {
    position: relative;
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }

  &-Circle {
    width: 100%;
    height: 100%;
  }

  &-CircleBg {
    fill: none;
    stroke-width: 6px;
    stroke: var(--color-bg-lighter);
  }

  &-Progress {
    fill: none;
    stroke-width: 6px;
    stroke: var(--color);
    stroke-linecap: round;
    stroke-dasharray: 106.8;
    stroke-dashoffset: var(--offset);
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    animation: donut 1.5s ease;
  }

  &-State {
    display: flex;
    align-items: center;
    margin-bottom: 27px;
  }

  &-Footer {
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-main);
    text-transform: uppercase;
  }

  &-Details {
    display: flex;
    align-items: center;
  }

  &-Icon {
    margin-right: 7px;
  }

  &-RealityIcon {
    width: 15px;
    height: 15px;
    fill: var(--color-main1);
    stroke: var(--color-bg);
  }

  &-BlockedIcon {
    width: 12px;
    height: 13px;
  }

  &-SessionIcon {
    width: 12px;
    height: 12px;
    margin-right: 4px;
    fill: var(--color-bg);
    stroke: var(--color-main1);
  }

  &-LineScale {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 20px;
    padding-right: 10px;
    font-size: 8px;
    font-weight: 700;
    color: var(--color-main1);
    background: var(--color-bg-lighter);
    border-radius: 1000px;

    &--spent {
      position: absolute;
      top: 0;
      left: 0;
      justify-content: flex-start;
      height: 100%;
      padding-right: 0;
      padding-left: 10px;
      color: var(--color-bg);
      background: var(--color-main1);
    }
  }

  &-Active {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 3px;
      left: -11px;
      width: 5px;
      height: 5px;
      background: var(--color);
      border-radius: 50%;
    }
  }
}

@keyframes donut {
  from {
    stroke-dashoffset: 106.8;
  }

  to {
    stroke-dashoffset: var(--offset);
  }
}
</style>
