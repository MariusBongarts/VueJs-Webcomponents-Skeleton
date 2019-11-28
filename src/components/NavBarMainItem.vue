<template>
  <div
    class="main-nav-item"
    :class="{ active: active }"
    @click="toggleNavItem()"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-settings"
    >
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { NavItemMain } from '../models/NavItemMain';
import { Mutation } from 'vuex-class';
import { NavigationStore } from '../store/navigation-store';
import { Route } from 'vue-router';

@Component({
  components: {}
})
export default class NavBarMainItem extends Vue {
  active = false;
  @Prop() navItem!: NavItemMain;
  @Mutation closeSubMenu!: () => void;
  @Mutation showSubMenu!: () => void;

  mounted() {
    if (this.$route.name === this.navItem.name) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  @Watch('$route')
  onUrlChange(route: Route) {
    if (route.name === this.navItem.name) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  /*
   * When the navItem is active, the sub menu should be closed
   * When the navItem is inactive, it will be navigated to route
   */
  async toggleNavItem(item: string) {

    if (this.active && NavigationStore.state.showSubMenu) {
      this.closeSubMenu();
    } else {
      this.showSubMenu();
    }

    // IMPORTANT: It is important that this action takes place after the previos closeSubMenu() action
    if (this.$route.name !== this.navItem.route) {
      await this.$router.push(this.navItem.route);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.main-nav-item {
  width: 75;
  height: 75px;
  line-height: 75px;
  text-align: center;
  color: white;
  display: flex;
  justify-content: center;
}

.main-nav-item.active,
.main-nav-item:hover {
  background: $secondary-dark;
}

svg {
  margin: auto;
}
</style>
