<template>
  <div class="Counter" :class="{ 'Counter--min': minFormat }">
    <div v-if="!minFormat" class="Counter-Text">
      Time left until finish
    </div>
    <div class="Counter-Content">
      <div class="Counter-Item Counter-Days">
        <div class="Counter-Count">
          {{ currentTime.days }}
        </div>
        <div class="Counter-Text">
          {{ minFormat ? 'd' : 'Days' }}
        </div>
      </div>
      <div class="Counter-Item Counter-Hours">
        <div class="Counter-Count">
          {{ currentTime.hours }}
        </div>
        <div class="Counter-Text">
          {{ minFormat ? 'h' : 'Hours' }}
        </div>
      </div>
      <div class="Counter-Item Counter-Minutes">
        <div class="Counter-Count">
          {{ currentTime.minutes }}
        </div>
        <div class="Counter-Text">
          {{ minFormat ? 'm' : 'Minutes' }}
        </div>
      </div>
      <div class="Counter-Item Counter-Seconds">
        <div class="Counter-Count">
          {{ currentTime.seconds }}
        </div>
        <div class="Counter-Text">
          {{ minFormat ? 's' : 'Seconds' }}
        </div>
      </div>
    </div>
    <div v-if="minFormat" class="Counter-AdditionalText">
      Until resset
    </div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    minFormat: {
      type: Boolean,
      required: false,
      default: false,
    },
    enddate: {
      type: [Date, String],
      required: true,
    },
    speed: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      currentTime: {
        days: '0',
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
    };
  },
  mounted() {
    setTimeout(this.countdown, 1);
  },
  methods: {
    countdown() {
      const t = Date.parse(this.enddate) - Date.parse(new Date());
      const seconds = Math.floor((t / 1000) % 60);
      const minutes = Math.floor((t / 1000 / 60) % 60);
      const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      if (t > 0) {
        this.currentTime = {
          total: t,
          days: String(days),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0'),
        };
        setTimeout(this.countdown, this.speed);
      } else {
        this.currentTime = {
          days: '0',
          hours: '00',
          minutes: '00',
          seconds: '00',
        };
      }
    },
  },
};
</script>

<style lang="scss">
.Counter {
  &-Text {
    font-size: 8px;
    font-weight: 300;
    line-height: 1.66;
    color: var(--color-text-ghost);
    text-transform: uppercase;

    @media (min-width: $screen-l) {
      font-size: 10px;
    }
  }

  &-Content {
    display: flex;
  }

  &-Item {
    position: relative;
    margin-right: 27px;
    text-align: center;

    @media (min-width: $screen-xl) {
      margin-right: 31px;
    }

    &:last-child {
      margin-right: 0;
    }

    &:after {
      content: ':';
      position: absolute;
      top: 0;
      right: -17px;
      font-size: 21px;
      font-weight: 700;
      line-height: 1.18;
      color: var(--color-text-ghost);

      @media (min-width: $screen-xl) {
        top: 2px;
        right: -18px;
        font-size: 24px;
      }
    }

    &:last-child:after {
      display: none;
    }
  }

  &-Count {
    position: relative;
    z-index: 1;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.18;
    color: var(--color-text-main);

    @media (min-width: $screen-l) {
      font-size: 26px;
    }

    @media (min-width: $screen-xl) {
      font-size: 30px;
    }
  }

  &-AdditionalText {
    margin-top: 2px;
    font-size: 12px;
    color: var(--color-text-ghost);
    text-transform: capitalize;
  }
}

.Counter--min {
  .Counter-Item {
    display: flex;
    align-items: flex-end;
    margin-right: 16px;

    &:after {
      top: -1px;
      right: -10px;
      font-size: 16px;
      color: var(--color-text-main);
    }
  }

  .Counter-Count {
    margin-right: 2px;
    font-size: 14px;
    line-height: 1.2;
  }

  .Counter-Text {
    font-size: 10px;
    font-weight: 700;
    line-height: 1.2;
    color: var(--color-text-main);
    text-transform: lowercase;
  }
}
</style>
