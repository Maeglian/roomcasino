<template>
  <div class="Partners">
    <client-only>
      <marquee-text :duration="durationSpeed">
        <div class="Partners-Wrapper">
          <div class="Partners-Partner">
            <img class="Partners-Image Partners-Image--height" src="@/assets/img/interac.svg" />
          </div>
          <div class="Partners-Partner">
            <img class="Partners-Image Partners-Image--height" src="@/assets/img/astropay.svg" />
          </div>
          <div class="Partners-Partner">
            <img class="Partners-Image" src="@/assets/img/inpay.png" />
          </div>
          <div class="Partners-Partner">
            <img class="Partners-Image Partners-Image--height" src="@/assets/img/mastercard.svg" />
          </div>
          <div class="Partners-Partner">
            <img class="Partners-Image" src="@/assets/img/visa.svg" />
          </div>
          <div class="Partners-Partner">
            <img class="Partners-Image Partners-Image--width" src="@/assets/img/ecashout.svg" />
          </div>
          <div class="Partners-Partner">
            <img class="Partners-Image Partners-Image--width" src="@/assets/img/flexepin.png" />
          </div>
          <div class="Partners-Partner">
            <img class="Partners-Image Partners-Image--width" src="@/assets/img/neosurf.png" />
          </div>
          <div class="Partners-Partner">
            <img
              class="Partners-Image Partners-Image--width-more"
              src="@/assets/img/muchbetter.png"
            />
          </div>
          <!--          <div class="Partners-Partner">-->
          <!--            <img class="Partners-Image" src="@/assets/img/payguru.png"/>-->
          <!--          </div>-->
        </div>
      </marquee-text>
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Partners',

  computed: {
    ...mapState(['width']),

    durationSpeed() {
      return this.width > 460 ? 60 : 30;
    },
  },
};
</script>

<style lang="scss">
.Partners {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border);

  @media (min-width: $screen-m) {
    padding-bottom: 25px;
  }

  @media (min-width: $screen-xl) {
    padding-bottom: 30px;
  }

  &-Wrapper {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  &-Partner {
    flex-shrink: 0;
    margin-right: 16px;

    @media (min-width: $screen-m) {
      margin-right: 25px;
    }

    @media (min-width: $screen-xl) {
      margin-right: 37px;
    }
  }

  &-Image--height {
    height: 50px;
  }

  &-Image--width {
    width: 80px;
  }

  &-Image--width-more {
    width: 190px;
  }
}
</style>
