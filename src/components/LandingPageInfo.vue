<template>
  <div class="landing-container">
    <div class="info-container">
      <div class="mainInfo">
        <span>Structure your Web</span>
      </div>
      <div class="subInfo">
        <span>Highlight the web and save text wherever you want.</span>
      </div>
    </div>
    <hr class="divider" />
    <button @click="navigate('/login')" class="loginBtn">Get started</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LandingPageInfo extends Vue {
  private navigate(route: string) {
    this.$router.push(route);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../variables.scss";

.landing-container {
  z-index: 9999;
}

.info-container {
  font-family: var(--font-family);
  color: var(--white-dark);
  color: white;
  margin: auto;
  text-align: center;
}

.mainInfo {
  font-size: 18px;
  padding-bottom: 15px;
}

.subInfo {
  font-size: 14px;
}

hr.divider {
  width: 80%;
  margin: 10px auto;
  border: solid 0.3px var(--secondary-light);
}

.loginBtn {
  background: $primary-color;
  z-index: 9999;
  padding: 10px 40px;
  border: none;
  border-radius: 20px;
  color: $white-dark;
  font-weight: bold;
  box-shadow: 1px 1px 1px 1px $primary-color-transparent;
  outline: none;
  cursor: pointer;
}
</style>
