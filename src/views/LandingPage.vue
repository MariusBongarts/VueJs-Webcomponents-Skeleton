<template>
  <div class="landing-page">
    <LandingHeader></LandingHeader>
    <Particles v-if="true"></Particles>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Particles from './../components/Particles.vue';
import LandingPageInfo from './../components/LandingPageInfo.vue';
import LoginContainer from './../components/LoginContainer.vue';
import LandingHeader from './../components/LandingHeader.vue';

@Component({
  components: {
    Particles,
    LandingPageInfo,
    LoginContainer,
    LandingHeader
  },
})
export default class Home extends Vue {
  private test = process.env.VUE_APP_MODE;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

body {
  height: 100vh;
  overflow: hidden;
}

.landing-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
</style>
