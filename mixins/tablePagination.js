export default {
  data() {
    return {
      rowsPerPage: 6,
      currentPage: 1,
    };
  },
  computed: {
    rowsInPage() {
      const start = this.rowsPerPage * (this.currentPage - 1);
      const end = start + this.rowsPerPage;

      return this.rows.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.rows.length / this.rowsPerPage);
    },
  },
};
