<template>
  <div class="CabinetTable">
    <Loader v-if="loading" />
    <template v-else>
      <div v-if="title" class="CabinetTable-Title">
        {{ title }}
      </div>
      <div class="CabinetTable-Table Table">
        <div v-if="cols" class="Table-Header CabinetTable-Header">
          <div
            v-for="col in cols"
            :key="col.field"
            class="Table-Cell CabinetTable-Cell CabinetTable-Th"
          >
            {{ col.label }}
          </div>
        </div>
        <template v-if="rows.length">
          <div v-for="(row, i) in rows" :key="i" class="Table-Row CabinetTable-Row">
            <template v-if="cols">
              <div
                v-for="(col, j) in cols"
                :key="`${i}_${j}_${row[col.field]}`"
                class="Table-Cell CabinetTable-Cell"
                :class="{
                  'CabinetTable-Cell--accepted': row[col.field] === 'done',
                  'CabinetTable-Cell--discarded': row[col.field] === 'cancel',
                }"
              >
                <div class="CabinetTable-Label">
                  {{ col.label }}
                </div>
                {{ col.format ? col.format(row[col.field]) : row[col.field] }}
              </div>
            </template>
            <template v-else>
              <div
                v-for="(col, j) in row"
                :key="`${i}_${j}_${col}`"
                class="Table-Cell CabinetTable-Cell"
                :class="{
                  'CabinetTable-Cell--accepted': col === 'Current',
                }"
              >
                {{ col }}
              </div>
            </template>
          </div>
        </template>
      </div>
      <div class="CabinetTable-Footer">
        <template v-if="rows.length">
          <button v-if="showMoreBtn" class="CabinetTable-ShowMore" @click="$emit('show-more')">
            Show more
          </button>
          <BasePagination
            v-if="pagination.enabled"
            class="CabinetTable-Pagination"
            :pagination="pagination"
            @change-page="$emit('change-page', $event)"
          />
        </template>
        <span v-else class="CabinetTable-Info">
          No data available
        </span>
      </div>
    </template>
  </div>
</template>

<script>
import BasePagination from '@/components/base/BasePagination.vue';
import Loader from '@/components/Loader';

export default {
  name: 'CabinetTable',
  components: {
    BasePagination,
    Loader,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
    cols: {
      type: [Array, Boolean],
      required: false,
      default: false,
    },
    title: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    showMoreBtn: {
      type: Boolean,
      required: false,
      default: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    pagination: {
      type: Object,
      isRequired: false,
      default: () => ({
        enabled: false,
      }),
    },
  },
};
</script>

<style lang="scss">
.CabinetTable {
  &-Table {
    @media (min-width: $screen-m) {
      display: table;
      border-spacing: 0 4px;
      table-layout: fixed;
    }
  }

  &-Title {
    width: 100%;
    height: 55px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 700;
    line-height: 55px;
    color: var(--color-text-main);
    background: var(--color-bg);
  }

  &-Row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 4px;
    padding: 15px 15px 0;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      display: table-row;
      margin-bottom: 0;
      padding: 0;
    }
  }

  &-Cell {
    width: 50%;
    margin-bottom: 15px;
    font-size: 9px;
    font-weight: 700;
    line-height: 1.26;
    color: var(--color-text-main);
    text-transform: uppercase;
    background: var(--color-bg);

    @media (min-width: $screen-m) {
      display: table-cell;
      width: 100%;
      margin-bottom: 0;
      padding: 15px;
      font-size: 12px;
      vertical-align: middle;
    }

    &:nth-child(even) {
      text-align: right;

      @media (min-width: $screen-m) {
        text-align: left;
      }
    }

    &--accepted {
      color: var(--color-accept);
    }

    &--discarded {
      color: var(--color-discard);
    }
  }

  &-Header {
    display: none;

    @media (min-width: $screen-m) {
      display: table-row;
    }
  }

  &-Th {
    display: table-cell;
    font-size: 10px;
    color: var(--color-text-ghost);
    text-transform: uppercase;
  }

  &-Label {
    margin-bottom: 5px;
    color: var(--color-text-ghost);

    @media (min-width: $screen-m) {
      display: none;
    }
  }

  &-Footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 15px;
    background-color: var(--color-bg);

    @media (min-width: $screen-s) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &-ShowMore {
    margin-bottom: 20px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-main1);
    text-transform: uppercase;
    cursor: pointer;

    @media (min-width: $screen-s) {
      margin-bottom: 0;
    }
  }

  &-Pagination {
    margin-left: auto;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-text-ghost);
    text-transform: uppercase;
  }

  &-Info {
    font-size: 10px;
    color: var(--color-text-ghost);
    text-transform: uppercase;
  }
}
</style>
