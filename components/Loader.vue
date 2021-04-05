<template>
  <div class="Loader">
    <img class="Loader-Logo" src="@/assets/img/logo.svg" />
    <div class="Loader-Spinner">{{ $t('buttons.loading') }}...</div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style lang="scss">
.Loader {
  padding-top: 15px;
  text-align: center;

  &-Image {
    display: inline-block;
  }

  &-Spinner,
  &-Spinner:before,
  &-Spinner:after {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation-fill-mode: both;
    animation: load 2.2s infinite ease-in-out;
  }

  &-Spinner {
    position: relative;
    margin: 0 auto 60px;
    font-size: 10px;
    color: var(--color-main1);
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }

  &-Spinner:before,
  &-Spinner:after {
    content: '';
    position: absolute;
    top: 0;
  }

  &-Spinner:before {
    left: -15px;
    animation-delay: -0.32s;
  }

  &-Spinner:after {
    left: 15px;
  }
}

@keyframes load {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }

  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
