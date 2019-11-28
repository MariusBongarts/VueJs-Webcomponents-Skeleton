<template>
  <div class="header-container">
    <!-- <img @click="navigate('/')" :src="require('./../assets/logo.jpg')" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LandingHeader extends Vue {
  async navigate(route: string) {
    try {
      await this.$router.push(route);
    } catch (error) {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.header-container {
  z-index: 9999;
  position: fixed;
  left: 0px;
  top: 0px;
  height: 150px;
  width: 150px;
  cursor: pointer;
  padding: 10px;
}

img {
  border-radius: 50%;
  box-shadow: 1px 1px 1px 1px $primary-color;
  width: 100%;
  height: 100%;
  animation-name: spin;
  animation-duration: 30s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

img:hover {
  box-shadow: 6px 2px 15px 4px $primary-color;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
