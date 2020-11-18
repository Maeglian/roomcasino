<template>
  <div class="GamblingLimit" :style="{'--color': color, '--offset': strokeOffset}">
    <div class="GamblingLimit-Header">
      <div class="GamblingLimit-Title">
        {{ item.type }}
      </div>
      <div class="GamblingLimit-Edit">
        ...
      </div>
    </div>
    <div v-if="item.end" class="GamblingLimit-State">
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
      <Counter class="GamblingLimit-Counter" :enddate="item.end" />
    </div>
    <div class="GamblingLimit-Footer">
      <div class="GamblingLimit-Left">
        {{ item.limitState }} of {{ item.limitAmount }} {{ item.currency }} left
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
import Counter from '@/components/Counter';

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
  },
  computed: {
    ...mapState(['currency']),
    color() {
      switch(this.item.type) {
        case 'daily':
          return '#8733F3';
        case 'wager':
          return '#335DF3';
        case 'cooling':
          return '#EB1C2A';
        case 'deposit':
          return '#33C5F3'
        default:
          return '#8733F3';
      }
    },
    isActive() {
      if (this.item.end) return new Date(this.item.end) > new Date();
      return true;
    },
    strokeOffset() {
      return this.item.limitState / this.item.limitAmount * circleLength;
    },
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

  &-Scale {
    position: relative;
    width: 40px;
    height: 40px;
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
