<template>
  <div class="Modal">
    <div v-if="closeBtn" class="Close Modal-Close" @click="$emit('close')"></div>
    <div class="ConfirmDialog">
      <div class="CabinetPage-Header ConfirmDialog-Title">
        {{ title }}
      </div>
      <div class="CabinetPage-Text ConfirmDialog-Text">
        {{ text }}
      </div>
      <div class="ConfirmDialog-Btns">
        <button class="Btn Btn--common Btn--dark ConfirmDialog-Btn" @click="onClickCancel">
          Cancel
        </button>
        <button class="Btn Btn--common Btn--color ConfirmDialog-Btn" @click="onClickOk">
          Yes, {{ okBtnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    okBtnText: {
      type: String,
      required: true,
    },
    closeBtn: {
      type: Boolean,
      required: false,
      default: false,
    },
    onCancel: {
      type: [Function, Boolean],
      required: false,
      default: false,
    },
    onOk: {
      type: [Function, Boolean],
      required: false,
      default: false,
    },
  },
  methods: {
    onClickCancel() {
      if (this.onCancel) this.onCancel.call(this);
      else this.$emit('cancel');

      this.$emit('close');
    },
    onClickOk() {
      if (this.onOk) this.onOk();
      else this.$emit('ok');

      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
.ConfirmDialog {
  background: var(--color-bg);

  &-Text {
    padding: 16px 16px 35px;
  }

  &-Btns {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &-Btn {
    width: calc(50% - 2px);
    padding-right: 0;
    padding-left: 0;
  }
}
</style>
