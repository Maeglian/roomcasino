<template>
  <modal v-bind="$attrs" :name="name" adaptive @before-close="$emit('close')">
    <div class="Modal">
      <div class="Close Modal-Close" @click="$modal.hide(name)" />
      <div class="Modal-Content">
        <slot />
      </div>
      <button v-if="okBtn" class="Btn Btn--common Btn--full" @click="$modal.hide(name)">
        OK
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    okBtn: {
      type: Boolean,
      required: false,
      default: true,
    },
    showOnMount: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  mounted() {
    if (this.showOnMount) this.$modal.show(this.name);
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
