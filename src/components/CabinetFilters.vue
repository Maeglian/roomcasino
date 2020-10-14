<template>
  <div class="CabinetFilters" v-click-outside="onClickOutside">
    <div class="CabinetFilters-Title" @click="openfiltersMenu()">
      <svg class="CabinetFilters-Icon" width="13" height="15">
        <use xlink:href="@/assets/img/icons.svg#filters"></use>
      </svg>
      Filtered by
      <i
        v-if="width < 1248"
        class="ThinArrow CabinetFilters-Arrow"
        :class="[ filtersMenuIsOpen ? 'ThinArrow--up' : 'ThinArrow--down' ]"
      ></i>
    </div>
    <transition name="slide-up">
      <div v-if="width >= 1248 || filtersMenuIsOpen" class="CabinetFilters-Filters">
      <div
        v-for="filter in filters"
        :key="filter.name"
        class="CabinetFilters-Filter"
      >
        <div class="CabinetFilters-Name">
          {{ filter.name }}
        </div>
        <template v-if="filter.type === 'dropdown'">
          <BaseDropdown
            class="CabinetPage-Dropdown"
            :class="`CabinetPage-Dropdown--${filter.name}`"
            :items="filter.values"
            @set-dropdown-value="setValue({ name: filter.name, val: $event })"
          />
        </template>
        <template v-if="filter.type === 'date'">
          <Datepicker
            :value="new Date()"
            format="dd.MM.yyyy"
            class="Datepicker CabinetPage-Datepicker"
            calendar-class="Datepicker-Inner"
            input-class="Datepicker-Input"
            @selected="setValue({ name: filter.name, val: $event })"
          />
        </template>
      </div>
      <button class="CabinetFilters-Submit">
        Filter
      </button>
    </div>
    </transition>
  </div>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown.vue';
import Datepicker from 'vuejs-datepicker';
import { mapState } from 'vuex';

export default {
  name: 'CabinetFilters',
  props: {
    filters: {
      type: Array,
      isRequired: true,
    },
  },
  components: {
    BaseDropdown,
    Datepicker,
  },
  data() {
    return {
      filtersMenuIsOpen: false,
    };
  },
  computed: {
    ...mapState(['width']),
  },
  methods: {
    setValue(val) {
      this.$emit('set-value', val);
    },
    openfiltersMenu() {
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
    text-transform: uppercase;
    color: var(--color-text-ghost);
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

    @media(min-width: $screen-xl) {
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

    @media(min-width: $screen-xl) {
      margin-bottom: 0;
      margin-right: 4px;
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
    padding-left: 20px;
    padding-right: 20px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-ghost);
    background: var(--color-bg);

    @media(min-width: $screen-xl) {
      width: auto;
    }
  }

  &-Submit {
    height: 55px;
    padding-right: 40px;
    padding-left: 40px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-main1);
    background-color: var(--color-bg-lighter);
    cursor: pointer;
  }
}

</style>
