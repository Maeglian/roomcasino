<template>
  <!-- eslint-disable max-len -->
  <div class="CabinetPage LimitsPage">
    <div class="CabinetPage-Title LimitsPage-Title">
      {{ title }}
    </div>
    <button class="CabinetPage-AddBtn">
      <span class="CabinetPage-AddBtnText">
        Create limits
      </span>
      <span class="CabinetPage-AddBtnPlus CabinetPage-AddBtnPlus--right">
        +
      </span>
    </button>
    <div class="LimitsPage-Content">
      <div class="LimitsPage-Text CabinetPage-Text">
        Do you want to track your activity, loss limits or limit deposits? Your account can be set with all limits. It'll help you to get an overview of your gambling. All restriction takes effect instantly.
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LimitsPage',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.LimitsPage {
  &-Text {
    margin-top: 36px;

    @media (min-width: $screen-m) {
      width: 60%;
      margin-top: 31px;
    }
  }
}

</style>
