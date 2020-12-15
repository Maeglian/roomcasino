<template>
  <div v-click-outside="onClickOutside" class="CabinetFilters">
    <div class="CabinetFilters-Title" @click="openFiltersMenu()">
      <svg class="CabinetFilters-Icon" width="13" height="15">
        <use xlink:href="@/assets/img/icons.svg#filters"></use>
      </svg>
      Filtered by
      <i
        v-if="width < 1248"
        class="ThinArrow CabinetFilters-Arrow"
        :class="[filtersMenuIsOpen ? 'ThinArrow--up' : 'ThinArrow--down']"
      ></i>
    </div>
    <transition name="slide-up">
      <div v-if="width >= 1248 || filtersMenuIsOpen" class="CabinetFilters-Filters">
        <div v-for="(filter, name) in filters" :key="name" class="CabinetFilters-Filter">
          <div class="CabinetFilters-Name">
            {{ name }}
          </div>
          <template v-if="filter.type === 'dropdown'">
            <BaseDropdown
              class="CabinetPage-Dropdown CabinetFilters-Dropdown"
              :class="`CabinetPage-Dropdown--${name}`"
              :active-item="filter.value"
              :items="name === 'currency' ? currencyAccounts : filter.values"
              @set-dropdown-value="setValue({ name, type: filter.type, payload: $event })"
            />
          </template>
          <template v-if="filter.type === 'date'">
            <Datepicker
              format="dd.MM.yyyy"
              placeholder="dd.mm.yyyy"
              class="Datepicker CabinetPage-Datepicker"
              calendar-class="Datepicker-Inner"
              input-class="Datepicker-Input"
              :clear-button="true"
              @selected="setValue({ name, type: filter.type, payload: $event })"
            />
          </template>
        </div>
        <button class="CabinetFilters-Submit" @click="$emit('filter')">
          Filter
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import BaseDropdown from '@/components/base/BaseDropdown.vue';
import { mapGetters, mapState } from 'vuex';
import moment from 'moment';

const Datepicker = () => import('vuejs-datepicker');

export default {
  name: 'CabinetFilters',
  components: {
    BaseDropdown,
    Datepicker,
  },
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      filtersMenuIsOpen: false,
    };
  },
  computed: {
    ...mapState(['width']),
    ...mapGetters(['currencyAccounts', 'activeCurrency']),
  },
  methods: {
    setValue({ name, type, payload }) {
      const val = { name };
      if (type === 'date') val.val = moment(payload).unix();
      else val.val = payload;
      this.$emit('set-value', val);
    },
    openFiltersMenu() {
      if (this.width < 1248) this.filtersMenuIsOpen = !this.filtersMenuIsOpen;
    },
    onClickOutside(e) {
      if (e.target.className !== 'CabinetFilters') this.filtersMenuIsOpen = false;
    },
  },
};
</script>

<style lang="scss">
.CabinetFilters {
  position: relative;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;

  &-Title {
    position: relative;
    display: flex;
    align-items: center;
    height: 55px;
    margin-bottom: 4px;
    padding: 0 16px;
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-ghost);
    text-transform: uppercase;
    background: var(--color-bg);
  }

  &-Arrow {
    margin-left: auto;
  }

  &-Icon {
    margin-right: 16px;
  }

  &-Filters {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    background: var(--color-body);

    @media (min-width: $screen-xl) {
      position: relative;
      flex-direction: row;
    }
  }

  &-Filter {
    display: flex;
    flex-grow: 1;
    width: 100%;
    height: 55px;
    margin-bottom: 4px;

    @media (min-width: $screen-xl) {
      margin-right: 4px;
      margin-bottom: 0;
    }

    &--currency {
      width: 230px;
    }
  }

  &-Name {
    display: flex;
    align-items: center;
    width: 89px;
    margin-right: 4px;
    padding-right: 20px;
    padding-left: 20px;
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-ghost);
    text-transform: uppercase;
    background: var(--color-bg);

    @media (min-width: $screen-xl) {
      width: auto;
    }
  }

  &-Submit {
    height: 55px;
    padding-right: 40px;
    padding-left: 40px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-main1);
    text-transform: uppercase;
    background-color: var(--color-bg-lighter);
    cursor: pointer;
  }

  &-Dropdown {
    flex-grow: 1;
    text-transform: uppercase;
  }
}
</style>
