<template>
  <div class="Table CabinetTable">
    <div class="Table-Header CabinetTable-Header">
      <div
        v-for="col in cols"
        :key="col.field"
        class="Table-Cell CabinetTable-Cell CabinetTable-Th"
      >
        {{ col.label }}
      </div>
    </div>
    <div
      v-for="(row, i) in rows"
      :key="i"
      class="Table-Row CabinetTable-Row"
    >
      <div
        v-for="col in cols"
        :key="row[col.field]"
        class="Table-Cell CabinetTable-Cell"
        :class="{
          'CabinetTable-Cell--accepted': row[col.field] === 'Accepted',
          'CabinetTable-Cell--discarded': row[col.field] === 'Discarded'
        }"
      >
        <div class="CabinetTable-Label">
          {{ col.label }}
        </div>
        {{ row[col.field] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CabinetTable',
  props: {
    cols: {
      type: Array,
      isRequired: true,
    },
    rows: {
      type: Array,
      isRequired: true,
    },
    paginationOptions: {
      type: Object,
      isRequired: false,
      default: () => ({
        enabled: false,
      }),
    },
  },
  computed: {

  },
};
</script>

<style lang="scss">
.CabinetTable {
  @media (min-width: $screen-m) {
    display: table;
    border-spacing: 0 4px;
    table-layout: fixed;
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
    text-transform: uppercase;
    color: var(--color-text-main);
    background: var(--color-bg);

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

    @media (min-width: $screen-m) {
      display: table-cell;
      width: 100%;
      margin-bottom: 0;
      padding: 15px;
      font-size: 12px;
      vertical-align: middle;
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
    text-transform: uppercase;
    color: var(--color-text-ghost);
  }

  &-Label {
    margin-bottom: 5px;
    color: var(--color-text-ghost);

    @media (min-width: $screen-m) {
      display: none;
    }
  }
}

</style>
