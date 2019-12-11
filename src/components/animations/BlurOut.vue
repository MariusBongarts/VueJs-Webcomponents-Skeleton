<template>
  <transition name="" appear>
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BlurOut extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-leave {
  opacity: 1;
}
.v-leave-active {
  transition: all 1s;
}
.v-leave-to {
  opacity: 0;
}
</style>
