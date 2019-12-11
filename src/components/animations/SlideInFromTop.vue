<template>
  <transition name="" appear>
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SlideInFromTop extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-enter {
  opacity: 0;
  transform: translateY(-100%);
}
.v-enter-active {
  transition: all .5s;
}
.v-enter-to {
  opacity: 1;
  transform: translateY(0%);
}

.v-leave {
  opacity: 1;
}
.v-leave-active {
  transition: all .5s;
}
.v-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
