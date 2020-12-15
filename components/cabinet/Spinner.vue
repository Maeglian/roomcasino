<template>
  <div class="Spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
};
</script>

<style scoped>
.Spinner {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  color: var(--color-text-main);
}

.Spinner div {
  transform-origin: 15px 15px;
  animation: spin 1.2s linear infinite;
}

.Spinner div:after {
  content: '';
  position: absolute;
  top: 3px;
  left: 12px;
  display: block;
  width: 2px;
  height: 7px;
  background: #fff;
  border-radius: 20%;
}

.Spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}

.Spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}

.Spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}

.Spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}

.Spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}

.Spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}

.Spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}

.Spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}

.Spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}

.Spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}

.Spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}

.Spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}

@keyframes spin {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
