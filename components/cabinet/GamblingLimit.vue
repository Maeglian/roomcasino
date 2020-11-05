<template>
  <div class="GamblingLimit">
    <div class="GamblingLimit-Header">
      <div class="GamblingLimit-Title">
        {{ title }}
      </div>
      <div class="GamblingLimit-Edit">
        ...
      </div>
    </div>
    <div class="GamblingLimit-Counter">

    </div>
    <div class="GamblingLimit-Footer">
      <div class="GamblingLimit-Left">
        {{ left }} of {{ limitAmount }} {{ currency }} left
      </div>
      <div
        class="GamblingLimit-Active"
        :class="{'GamblingLimit-Active--active': isActive}"
      >
        Active
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GamblingLimit',
  props: {
    title: {
      type: String,
      isRequired: true,
    },
    left: {
      type: [String, Number],
      isRequired: false,
      default: 0,
    },
    limitAmount: {
      type: [String, Number],
      isRequired: false,
      default: 0,
    },
    isActive: {
      type: Boolean,
      isRequired: false,
      default: false,
    },
  },
  computed: {
    ...mapState(['currency']),
  },
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

  &-Header, &-Counter {
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

  &-Footer {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-main);
  }
}

</style>
