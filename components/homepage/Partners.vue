<template>
  <div class="Partners">
    <client-only>
      <marquee-text :duration="durationSpeed">
        <div class="Partners-Wrapper">
          <div class="Partners-Partner Partners-Partner--visa">
            <img class="Partners-Image" src="@/assets/img/visa.svg" />
          </div>
          <div class="Partners-Partner Partners-Partner--maestro">
            <img class="Partners-Image" src="@/assets/img/maestro.svg" />
          </div>
          <div class="Partners-Partner">
            <img class="Partners-Image" src="@/assets/img/skrill.svg" />
          </div>
          <div class="Partners-Partner Partners-Partner--paysafe">
            <img class="Partners-Image" src="@/assets/img/paysafe.svg" />
          </div>
          <div class="Partners-Partner">
            <img class="Partners-Image" src="@/assets/img/wirecard.svg" />
          </div>
          <div class="Partners-Partner">
            <img class="Partners-Image" src="@/assets/img/webmoney.svg" />
          </div>
          <div class="Partners-Partner Partners-Partner--sofort">
            <img class="Partners-Image" src="@/assets/img/sofort.svg" />
          </div>
          <div class="Partners-Partner">
            <img class="Partners-Image" src="@/assets/img/microgaming.svg" />
          </div>
          <div class="Partners-Partner Partners-Partner--visa">
            <img class="Partners-Image" src="@/assets/img/interac_35.png" />
          </div>
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
    justify-content: space-between;
    align-items: center;
  }

  &-Partner {
    margin-right: 16px;

    @media (min-width: $screen-m) {
      margin-right: 25px;
    }

    @media (min-width: $screen-xl) {
      margin-right: 37px;
    }
  }
}
</style>
