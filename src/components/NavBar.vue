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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import SlideInTransition from './../components/Transitions/SlideInTransition.vue';
import NavBarSub from './../components/NavBarSub.vue';
import NavBarMain from './../components/NavBarMain.vue';
import NavBarMainItem from './../components/NavBarMainItem.vue';
import MenuIcon from './../components/Icons/MenuIcon.vue';
import CloseIcon from './../components/Icons/CloseIcon.vue';
import { NavigationStore } from '../store/navigation-store';
import { SearchStore } from '../store/search-store';
import { Route } from 'vue-router';

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
    // this.listenForState();
  }

  @Watch('$route')
  async onUrlChange(route: Route) {
    if (route.name === 'search') {
      this.showMobileNav = false;
    }
  }

  listenForResize() {
    window.addEventListener('resize', () => {
      this.mobile = window.innerWidth < 900;
    });
  }

  // listenForState() {
  //   this.$store.subscribe(state => {
  //     if (this.$route.name !== 'search' && !this.$route.params.id) {
  //       //this.showMobileNav = NavigationStore.state.showSubMenu;
  //     }
  //   });
  // }

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
  color: $secondary-color;
}

.close-menu {
  color: $primary-color;
}

.nav-bar {
  height: 100vh;
  margin: 0;
  display: flex;
  z-index: 9999 !important;
}

@media (max-width: 900px) {
  .sub-nav {
    width: calc(100vw - 75px);
  }
}
</style>
