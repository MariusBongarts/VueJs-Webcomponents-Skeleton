<template>
  <div class="landing-page">
    <LandingHeader></LandingHeader>
    <Particles v-if="true"></Particles>

    <SlideInFromRight>
      <button class="chrome-btn">
        <a
          target="_blank"
          href="https://chrome.google.com/webstore/detail/web-highlights-web-text-h/hldjnlbobkdkghfidgoecgmklcemanhm?hl=de"
          >Add to chrome</a
        >
      </button>
    </SlideInFromRight>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Particles from './../components/Particles.vue';
import LandingPageInfo from './../components/LandingPageInfo.vue';
import LoginContainer from './../components/LoginContainer.vue';
import LandingHeader from './../components/LandingHeader.vue';
import SlideInFromRight from './../components/animations/SlideInFromRight.vue';

@Component({
  components: {
    Particles,
    LandingPageInfo,
    LoginContainer,
    LandingHeader,
    SlideInFromRight
  }
})
export default class Home extends Vue {}
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

.chrome-btn {
  display: none;
}

@media (min-width: 900px) {
  .chrome-btn {
    display: block;
    position: fixed;
    right: 50px;
    top: 50px;
    font: 500 14px 'Google Sans', Arial, sans-serif;
    border-radius: 4px;
    height: 36px;
    z-index: 9999 !important;
    border: none;
    background: #1a73e8c2;
    box-shadow: 0px 2px 1px -1px rgba(26, 115, 232, 0.2),
      0 1px 1px 0 rgba(26, 115, 232, 0.141),
      0 1px 3px 0 rgba(26, 115, 232, 0.122);
    a {
      text-decoration: none;
      padding: 50px;
      color: rgba(255, 255, 255, 0.698);
    }
  }

  .chrome-btn:hover {
    background: #1a73e8;
    transition: all .2s ease;
    transform: scale(1.03);

    a {
      color: white;
    }
  }
}
</style>
