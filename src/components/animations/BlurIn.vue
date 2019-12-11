<template>
  <transition name="" appear>
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BlurIn extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: all 2s;
}
.v-enter-to {
  opacity: 1;
}
</style>
