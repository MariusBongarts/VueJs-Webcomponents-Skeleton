<template>
  <div
    class="main-nav-item"
    :class="{ active: active }"
    @click="toggleNavItem()"
  >
<component :is="navItem.icon"></component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { NavItemMain } from '../models/NavItemMain';
import { Mutation } from 'vuex-class';
import { NavigationStore } from '../store/navigation-store';
import { Route } from 'vue-router';
import SettingsIcon from './Icons/SettingsIcon.vue';
import SearchIcon from './Icons/SearchIcon.vue';
import BookmarkIcon from './Icons/BookmarkIcon.vue';
import MarkIcon from './Icons/MarkIcon.vue';
import TagIcon from './Icons/TagIcon.vue';
import HomeIcon from './Icons/HomeIcon.vue';
import FolderIcon from './../components/Icons/FolderIcon.vue';

@Component({
  components: {
    SettingsIcon,
    SearchIcon,
    BookmarkIcon,
    MarkIcon,
    TagIcon,
    HomeIcon,
    FolderIcon
  }
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
  width: 75px;
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
