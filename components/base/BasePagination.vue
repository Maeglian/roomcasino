<template>
  <nav v-if="shouldShowPagination" class="Pagination">
    <ul class="Pagination-Pages">
      <li
        class="Pagination-Item"
        :class="{ 'Pagination-Item--disabled': pagination.currentPage === 1 }"
      >
        <a @click="onChangePage(pagination.currentPage - 1)">
          <button class="PrevNext PrevNext-Prev"></button>
        </a>
      </li>
      <li
        v-if="hasFirst"
        class="Pagination-Item"
        :class="{ 'Pagination-Item--active': isActive(1) }"
      >
        <a @click="onChangePage(1)">1</a>
      </li>
      <li v-if="hasFirstEllipsis" class="Pagination-Item">
        <span class="Pagination-Ellipsis">&hellip;</span>
      </li>
      <li
        v-for="page in pages"
        :key="page"
        class="Pagination-Item"
        :class="{
          'Pagination-Item--active': isActive(page),
          'Pagination-Item--disabled': page === '...',
        }"
      >
        <a @click="onChangePage(page)">{{ page }}</a>
      </li>
      <li v-if="hasLastEllipsis" class="Pagination-Item">
        <span class="Pagination-Ellipsis">&hellip;</span>
      </li>
      <li
        v-if="hasLast"
        class="Pagination-Item"
        :class="{ 'Pagination-Item--active': isActive(pagination.totalPages) }"
      >
        <a @click="onChangePage(pagination.totalPages)">
          {{ pagination.totalPages }}
        </a>
      </li>
      <li class="Pagination-Item">
        <a
          :class="{ 'Pagination-Item--disabled': pagination.currentPage === pagination.totalPages }"
          @click="onChangePage(pagination.currentPage + 1)"
        >
          <button class="PrevNext PrevNext-Next"></button>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    pages() {
      return this.pagination.totalPages === undefined ? [] : this.pageLinks();
    },
    hasFirst() {
      return this.pagination.currentPage >= 4 || this.pagination.totalPages < 10;
    },
    hasLast() {
      // eslint-disable-next-line max-len
      return (
        this.pagination.currentPage <= this.pagination.totalPages - 3 ||
        this.pagination.totalPages < 10
      );
    },
    hasFirstEllipsis() {
      return this.pagination.currentPage >= 4 && this.pagination.totalPages >= 10;
    },
    hasLastEllipsis() {
      // eslint-disable-next-line max-len
      return (
        this.pagination.currentPage <= this.pagination.totalPages - 3 &&
        this.pagination.totalPages >= 10
      );
    },
    shouldShowPagination() {
      if (this.pagination.totalPages === undefined) {
        return false;
      }
      if (this.pagination.count === 0) {
        return false;
      }
      return this.pagination.totalPages > 1;
    },
  },
  methods: {
    isActive(page) {
      const currentPage = this.pagination.currentPage || 1;
      return currentPage === page;
    },
    onChangePage(page) {
      if (
        page === '...' ||
        page === this.pagination.currentPage ||
        page > this.pagination.totalPages ||
        page < 1
      ) {
        return;
      }
      this.$emit('change-page', page);
    },
    pageLinks() {
      const pages = [];
      let left = 2;
      let right = this.pagination.totalPages - 1;
      if (this.pagination.totalPages >= 10) {
        left = Math.max(1, this.pagination.currentPage - 2);
        right = Math.min(this.pagination.currentPage + 2, this.pagination.totalPages);
      }
      // eslint-disable-next-line no-plusplus
      for (let i = left; i <= right; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
};
</script>

<style lang="scss">
.Pagination {
  &-Pages {
    display: flex;
    align-items: center;
  }

  &-Item {
    margin-right: 15px;
    line-height: 1;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &--active {
      color: var(--color-main1);
    }

    &--disabled {
      .PrevNext:focus,
      .PrevNext:active {
        color: var(--color-border-ghost);
        border-color: var(--color-border-ghost);
      }
    }
  }
}
</style>
