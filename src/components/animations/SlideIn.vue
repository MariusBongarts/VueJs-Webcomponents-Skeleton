<template>
  <transition name="" appear>
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SlideIn extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.v-enter-active {
  transition: all 1s;
  z-index: 9999;
}
.v-enter-to {
  opacity: 1;
  transform: translateX(0%);
}

.v-leave {
  opacity: 1;
}
.v-leave-active {
  transition: all 1s;
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
