<template>
  <modal v-bind="$attrs" name="baseModal" adaptive @before-close="$emit('close')">
    <div class="Modal">
      <div class="Close Modal-Close" @click="$modal.hide('baseModal')" />
      <div class="Modal-Content">
        <slot />
      </div>
      <button class="Btn Btn--common Btn--full" @click="$modal.hide('baseModal')">
        OK
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'BaseModal',
  mounted() {
    this.$modal.show('baseModal');
  },
};
</script>

<style lang="scss">
.Modal {
  &-Content {
    padding: 34px 24px;
    background: var(--color-body);
  }

  &-Title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.1;
    color: var(--color-text-main);
    text-transform: uppercase;
  }

  &-Text {
    font-size: 14px;
    line-height: 1.64;
    color: var(--color-text-ghost);
  }
}
</style>
