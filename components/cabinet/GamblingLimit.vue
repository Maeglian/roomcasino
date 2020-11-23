<template>
  <div class="GamblingLimit" :style="{'--color': color, '--offset': strokeOffset}">
    <div class="GamblingLimit-Header">
      <div class="GamblingLimit-Title">
        {{ item.title }}
      </div>
      <div ref="edit" class="GamblingLimit-Edit" @click="editMenuIsOpen = !editMenuIsOpen">
        ...
      </div>
    </div>
    <div class="GamblingLimit-Content">
      <div v-if="editMenuIsOpen" class="GamblingLimit-EditMenu" v-click-outside="onClickOutside">
        <div class="GamblingLimit-EditMenuItem" @click="onClickEdit">
          <svg class="GamblingLimit-EditMenuIcon GamblingLimit-EditIcon">
            <use xlink:href="@/assets/img/icons.svg#edit"></use>
          </svg>
          Edit limit
        </div>
        <div class="GamblingLimit-EditMenuItem" @click="onClickDelete">
          <svg class="GamblingLimit-EditMenuIcon GamblingLimit-DeleteIcon">
            <use xlink:href="@/assets/img/icons.svg#delete"></use>
          </svg>
          Delete limit
        </div>
      </div>
      <div v-if="item.isMoney" class="GamblingLimit-State">
        <div class="GamblingLimit-Scale">
          <svg class="GamblingLimit-Circle">
            <circle class="GamblingLimit-CircleBg" cx="20" cy="20" r="17"></circle>
            <circle
              class="GamblingLimit-Progress"
              cx="20"
              cy="20"
              r="17"
            >
            </circle>
          </svg>
        </div>
        <Counter class="GamblingLimit-Counter" :minFormat="true" :enddate="item.reset" />
      </div>
      <div v-if="item.type === 'session'" class="GamblingLimit-LineScale">
        <div
          class="GamblingLimit-LineScale GamblingLimit-LineScale--spent"
          :style="{'width': `${item.limitState / item.limitAmount * 100}%`}"
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
          <template v-if="item.isMoney">
            {{ item.limitState }} of {{ item.limitAmount }} EUR {{ item.currency }} left
          </template>
          <template v-if="item.period" class="GamblingLimit-Left">
            <svg v-if="item.type === 'reality_check'" class="GamblingLimit-Icon GamblingLimit-RealityIcon">
              <use xlink:href="@/assets/img/icons.svg#clock"></use>
            </svg>
            <svg v-if="item.type === 'self_exclusion'" class="GamblingLimit-Icon GamblingLimit-BlockedIcon">
              <use xlink:href="@/assets/img/icons.svg#calendar"></use>
            </svg>
            {{ item.period }}
          </template>
        </div>
        <div
          class="GamblingLimit-Active"
          :class="{'GamblingLimit-Active--active': isActive}"
        >
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
import { mapState } from 'vuex';
import Counter from '@/components/Counter';
import CreateLimits from '@/components/cabinet/CreateLimits';
import ConfirmDialog from '@/components/cabinet/ConfirmDialog';

const circleLength = 106.8;

export default {
  name: 'GamblingLimit',
  props: {
    item: {
      type: Object,
      isRequired: true,
      default: () => ({})
    },
  },
  components: {
    Counter,
    CreateLimits,
    ConfirmDialog,
  },
  data() {
    return {
      editMenuIsOpen: false,
    }
  },
  computed: {
    ...mapState(['currency']),
    color() {
      switch(this.item.type) {
        case 'loss':
          return '#8733F3';
        case 'wager':
          return '#335DF3';
        case 'cooling':
          return '#EB1C2A';
        case 'deposit':
          return '#33C5F3'
        default:
          return '#F3B233';
      }
    },
    isActive() {
      if (this.item.end) return new Date(this.item.end) > new Date();
      return true;
    },
    strokeOffset() {
      return this.item.limitState / this.item.limitAmount * circleLength;
    },
    sessionLeft() {
      return this.item.limitAmount - this.item.limitState;
    }
  },
  methods: {
    onClickOutside(e) {
      if (e.target !== this.$refs.edit) this.editMenuIsOpen = false;
    },
    onClickEdit() {
      this.$modal.show(CreateLimits,
        { isEdit: true, item: this.item, onUpdateLimit: this.onUpdateLimit },
        { width: 400, height: 'auto', adaptive: true },
        {
          'update-limit': (e) => this.$emit('update-limit', e),
        });
    },
    onUpdateLimit(payload) {
      this.$emit('updateLimit', payload);
      this.$modal.hide('delete');
    },
    onClickCancelDelete() {
      this.$modal.hide('delete');
    },
    onDeleteLimit() {
      this.$emit('deleteLimit');
      this.editMenuIsOpen = false;
    },
    onCloseDeleteConfirmDialog() {
      this.$emit('close')
    },
    onClickDelete() {
      this.$modal.show(ConfirmDialog,
        {
          title: 'Delete limit',
          text: `Are you sure you want to delete ${this.item.type} limit?`,
          okBtnText: 'delete limit',
          closeBtn: true,
          onCancel: this.onCloseDeleteConfirmDialog,
          onOk: this.onDeleteLimit
        },
        { width: 400, height: 'auto', adaptive: true },
      );
    }
  }
};
</script>

<style lang="scss">
.GamblingLimit {
  padding: 16px;
  background: var(--color-bg);

  &-Header, &-Footer {
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
    text-transform: uppercase;
    color: var(--color-text-ghost);
  }

  &-Edit {
    font-size: 25px;
    font-weight: 700;
    color: var(--color-text-ghost);
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
    text-transform: uppercase;
    color: var(--color-text-main);
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
    height: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
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
      padding-left: 10px;
      padding-right: 0;
      height: 100%;
      color: var(--color-bg);
      background: var(--color-main1);
    }
  }

  &-Active {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: -11px;
      top: 3px;
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
