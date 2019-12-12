<template>
  <SlideInTransition>
    <div class="sub-nav" v-if="show || mobile">
      <component
        v-if="currentRoute"
        :is="'NavBarSub-' + currentRoute"
      ></component>
    </div>
  </SlideInTransition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SlideInTransition from './../components/Transitions/SlideInTransition.vue';
import { Getter, Mutation } from 'vuex-class';
import { NavigationStore } from '@/store/navigation-store';
import { AuthStore } from '../store/auth-store';
import NavBarSubDirectories from './../components/NavBarSubDirectories.vue';
import NavBarSubTags from './../components/NavBarSubTags.vue';
import NavBarSubHome from './../components/NavBarSubHome.vue';
import NavBarSubBookmarks from './../components/NavBarSubBookmarks.vue';
import NavBarSubSearch from './../components/NavBarSubSearch.vue';
import NavBarSubSettings from './../components/NavBarSubSettings.vue';

@Component({
  components: {
    SlideInTransition,
    NavBarSub,
    NavBarSubHome,
    NavBarSubTags,
    NavBarSubBookmarks,
    NavBarSubDirectories,
    NavBarSubSettings,
    NavBarSubSearch
  }
})
export default class NavBarSub extends Vue {
  show: boolean = true;

  // Subbar should always be visible on mobile devices
  mobile = true;

  // Defines which sub navbar will be shown
  currentRoute: string = '';

  mounted() {
    this.show = NavigationStore.state.showSubMenu;
    this.mobile = screen.width < 900;
    this.listenForResize();
    this.currentRoute = this.$route.name || '';
    this.listenForRouter();
    this.listenForState();
  }

  listenForRouter() {
    this.$router.beforeEach((to, from, next) => {
      if (this.currentRoute !== to.name) {
        this.currentRoute = to.name || '';
      }
      next();
    });
  }

  listenForState() {
    this.$store.subscribe(() => {
      this.show = NavigationStore.state.showSubMenu;
    });
  }

  listenForResize() {
    window.addEventListener('resize', () => {
      this.mobile = window.innerWidth < 900;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  -->
<style scoped lang="scss">
@import './../variables.scss';

.sub-nav {
  height: 100%;
  width: 250px;
  background: $secondary-dark;
  z-index: 9998;
}

.sub-nav::-webkit-scrollbar {
  display: none;
}

.content {
  overflow-y: scroll;
  overflow-x: hidden;
}

</style>
