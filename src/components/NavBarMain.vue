<template>
  <div class="main-nav">
    <div class="main">
      <NavBarMainItem
        v-for="(navItem, index) in navItems.filter(item => item.main)"
        :key="index"
        :navItem="navItem"
      ></NavBarMainItem>
    </div>
    <div class="sub">
      <NavBarMainItem
        v-for="(navItem, index) in navItems.filter(item => !item.main)"
        :key="index"
        :navItem="navItem"
      ></NavBarMainItem>
      <NavBarMainLogo />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavBarMainItem from './../components/NavBarMainItem.vue';
import NavBarMainLogo from './../components/NavBarMainLogo.vue';
import { NAV_ITEMS_MAIN } from './../constants';

@Component({
  components: {
    NavBarMainItem,
    NavBarMainLogo
  }
})
export default class NavBarMain extends Vue {
  navItems = NAV_ITEMS_MAIN;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.main-nav {
  height: 100%;
  width: 75px;
  background: $secondary-color;
  z-index: 9999 !important;
  display: flex;
  flex-direction: column;
}

.main,
.sub {
  background: $secondary-color;
}
</style>
