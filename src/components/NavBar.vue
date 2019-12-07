<template>
  <div class="nav-bar">
    <div
      class="burger-menu"
      v-if="mobile && !showMobileNav"
      @click="toggleMobileNav()"
    >
      <MenuIcon />
    </div>
    <div
      class="close-menu"
      v-if="mobile && showMobileNav"
      @click="toggleMobileNav()"
    >
      <CloseIcon />
    </div>
    <SlideInTransition>
      <NavBarMain v-if="showMobileNav || !mobile"></NavBarMain>
    </SlideInTransition>
    <SlideInTransition>
      <NavBarSub v-if="showMobileNav || !mobile"></NavBarSub>
    </SlideInTransition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SlideInTransition from './../components/Transitions/SlideInTransition.vue';
import NavBarSub from './../components/NavBarSub.vue';
import NavBarMain from './../components/NavBarMain.vue';
import NavBarMainItem from './../components/NavBarMainItem.vue';
import MenuIcon from './../components/Icons/MenuIcon.vue';
import CloseIcon from './../components/Icons/CloseIcon.vue';

@Component({
  components: {
    SlideInTransition,
    NavBarSub,
    NavBarMain,
    NavBarMainItem,
    MenuIcon,
    CloseIcon
  }
})
export default class NavBar extends Vue {
  mobile = true;
  showMobileNav = false;

  mounted() {
    this.mobile = screen.width < 900;
    this.listenForResize();
  }

  listenForResize() {
    window.addEventListener('resize', () => {
      this.mobile = window.innerWidth < 900;
    });
  }

  toggleMobileNav() {
    this.showMobileNav = !this.showMobileNav;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.burger-menu,
.close-menu {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 9999 !important;
}

.nav-bar {
  height: 100vh;
  margin: 0;
  display: flex;
  z-index: 9999 !important;
}
</style>
