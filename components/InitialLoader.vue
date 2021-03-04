<template>
  <div class="InitialLoader">
    <img class="InitialLoader-Loader" src="@/assets/img/animatedLoader.gif" />
  </div>
</template>

<script>
export default {
  name: 'InitialLoader',
};
</script>

<style lang="scss">
.InitialLoader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--color-body);

  &-Loader {
    width: 300px;
  }
}
</style>
