<template>
  <section class="Page VipPage">
    <div class="Page-Header VipPage-Header">
      <h1 class="Title Title--type-h1 Page-Title VipPage-Title">
        Play vip style roomcasino
      </h1>
      <div class="Page-Text Text Text--additional">
        You can also change your CPs for money in just one click! You will still keep your status and will be able to keep moving up the levels. Play and get all the privileges RoomCasino’s VIP club has to offer.
      </div>
    </div>
    <section class="Page-Content">
      <h2 class="Title Title--type-h2 Page-Subtitle VipPage-Subtitle">
        Vip statuses
      </h2>
      <div class="VipPage-Statuses">
        <div v-for="status in statuses" :key="`status${status.level}`" class="StatusCard VipPage-Status">
          <div class="StatusCard-Content">
            <div class="StatusCard-Lvl StatusCard-Text">
              Level {{ status.level }}
            </div>
            <div class="StatusCard-Name">
              {{ status.name }}
            </div>
            <div v-if="!status.passed" class="StatusCard-Condition">
             <span v-if="status.points" class="StatusCard-Points"> {{ status.points }} PC / </span> {{ status.condition}} PC
            </div>
            <div v-if="status.passed" class="StatusCard-Text StatusCard-Passed">
              Level passed
            </div>
            <div v-else class="StatusCard-Progress">
              <div v-if="status.points"
                   class="StatusCard-Scale"
                   :style="{width: `${status.points / status.condition * 100}%`}"
              ></div>
            </div>
          </div>
          <div class="StatusCard-Rewards">
            <img
              :src="require(`@/assets/img/lvl${status.level}.png`)"
              :alt="`level ${status.level} icon`"
              class="StatusCard-Badge"
            >
            <div class="StatusCard-Reward">
              {{ status.prize }}
            </div>
          </div>
        </div>
      </div>
      <h2 class="Title Title--type-h2 Page-Subtitle VipPage-Subtitle">
        Vip terms and conditions
      </h2>
      <div class="Page-Blocks VipPage-Terms">
        <div v-for="(item, i) in terms" :key="`txt${i}`" class="Page-Block">
          <div class="Page-Number">{{i + 1}}.</div>
          <div class="Text Text--additional" v-html="item">
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'vip',
  layout: 'page',
  data() {
    return {
      statuses: [
        {
          level: 1,
          name: 'Rookie',
          passed: true,
        },
        {
          level: 2,
          name: 'Amateur',
          points: 8,
          condition: 25,
          passed: false,
          prize: '15 free spins',
        },
        {
          level: 3,
          name: 'Intermediate',
          condition: 75,
          passed: false,
          prize: '50 free spins',
        },
        {
          level: 4,
          name: 'Intermediate',
          condition: 250,
          passed: false,
          prize: '125 free spins',
        },
        {
          level: 5,
          name: 'Superstar',
          condition: 750,
          passed: false,
          prize: '150 free spins',
        },
        {
          level: 6,
          name: 'Superstar',
          condition: 4000,
          passed: false,
          prize: '50 eur',
        },
        {
          level: 7,
          name: 'Rookie',
          condition: 15000,
          passed: false,
          prize: '200 eur',
        },
        {
          level: 8,
          name: 'Diamond',
          condition: 200000,
          passed: false,
          prize: '1000 eur',
        },
        {
          level: 9,
          name: 'Amateur',
          condition: 750000,
          passed: false,
          prize: '10000 eur',
        },
        {
          level: 10,
          name: 'Amateur',
          condition: 5000000,
          passed: false,
          prize: 'Ferrari',
        },
      ],
      terms: [
        'You begin to participate in the VIP program after making your first deposit.',
        'CP is credited at the rate of 1 CP for every $ 12.5, 12.5 EUR, 15 CAD, 15 AUD, 15 NZD, 125 NOK, 325 CZK, 200 ZAR, 50 PLN bids.',
        'Exchange CP - 1 $, 1 EUR, 1.25 CAD, 1.25 AUD, 1.25 NZD, 10 NOK, 25 CZK, 17 ZAR, 4 PLN for 100 CP.',
        'All free spins are issued with a wager x10. All cash prizes are issued with wagering x1.',
        'Funds received when exchanging CP for real money are charged with wager x1.',
        'All prizes and free spins will be issued within 24 hours after the player has reached the VIP level.',
        'All prizes and free spins will be issued within 24 hours after the player has reached the VIP level.',
        'RoomCasino reserves the right to change the terms of the VIP program at any time.',
        'All free spins are issued with a wager x10. All cash prizes are issued with wagering x1.'
      ]
    }
  },
  computed: {
    ...mapState(['terms']),
  },
}
</script>

<style lang="scss">
.VipPage {
  &-Header {
    @media(min-width: $screen-m) {
      background-image: url(../assets/img/vip-bg-1248.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &-Statuses {
    margin-bottom: 40px;

    @media(min-width: $screen-s) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 11px;
    }

    @media(min-width: $screen-m) {
      grid-template-columns: 1fr 1fr 1fr;
      margin-bottom: 60px;
    }

    @media(min-width: $screen-l) {
      margin-bottom: 69px;
    }

    @media(min-width: $screen-xl) {
      grid-gap: 14px;
      margin-bottom: 80px;
    }
  }

  &-Status {
    &:last-child {
      @media(min-width: $screen-m) {
        grid-column-start: 2;
      }
    }
  }
}

.StatusCard {
  display: flex;
  justify-content: space-between;
  height: 162px;
  margin-bottom: 8px;
  padding: 24px 0 30px 24px;
  background: var(--color-bg);

  @media(min-width: $screen-m) {
    height: 145px;
    margin-bottom: 0;
    padding: 30px 0 24px 16px;
  }

  @media(min-width: $screen-l) {
    height: 162px;
    padding: 21px 0 30px 24px;
  }

  @media(min-width: $screen-xl) {
    height: 228px;
    padding: 45px 0 50px 30px;
  }

  &-Content {
    display: flex;
    flex-direction: column;
  }

  &-Lvl {
    margin-bottom: 12px;
  }

  &-Text {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-ghost);

    @media(min-width: $screen-l) {
      font-size: 12px;
    }

    @media(min-width: $screen-xl) {
      font-size: 14px;
    }
  }

  &-Name {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-main);

    @media(min-width: $screen-l) {
      font-size: 16px;
    }

    @media(min-width: $screen-xl) {
      font-size: 20px;
    }
  }

  &-Condition {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-text-main);

    @media(min-width: $screen-l) {
      font-size: 10px;
    }

    @media(min-width: $screen-xl) {
      font-size: 12px;
    }
  }

  &-Points {
    color: var(--color-text-ghost);
  }

  &-Rewards {
    text-align: center;
  }

  &-Passed {
    margin-top: auto;
  }

  &-Progress {
    position: relative;
    width: 122px;
    height: 6px;
    margin-top: auto;
    margin-bottom: 4px;
    background: var(--color-bg-lighter);
    border-radius: 12px;

    @media(min-width: $screen-m) {
      width: 110px;
    }

    @media(min-width: $screen-l) {
      width: 127px;
    }

    @media(min-width: $screen-xl) {
      width: 159px;
    }
  }

  &-Scale {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--color-main1);
    border-radius: 12px;
  }

  &-Rewards {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-Badge {
    width: 66px;
    margin: 0 30px;

    @media(min-width: $screen-m) {
      margin: 0 24px;
      width: 52px;
    }

    @media(min-width: $screen-l) {
      margin: 0 36px;
      width: 66px;
    }

    @media(min-width: $screen-xl) {
      margin: 0 50px;
      width: 82px;
    }
  }

  &-Reward {
    margin-top: auto;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-main1);

    @media(min-width: $screen-l) {
      font-size: 12px;
    }

    @media(min-width: $screen-xl) {
      font-size: 14px;
    }
  }
}

</style>
