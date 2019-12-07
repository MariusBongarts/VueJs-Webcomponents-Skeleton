<template>
  <SlideInTransition>
    <div class="sub-nav" v-if="show"></div>
  </SlideInTransition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SlideInTransition from './../components/Transitions/SlideInTransition.vue';
import { Getter, Mutation } from 'vuex-class';
import { NavigationStore } from '@/store/navigation-store';
import { AuthStore } from '../store/auth-store';

@Component({
  components: {
    SlideInTransition,
    NavBarSub
  }
})
export default class NavBarSub extends Vue {
  show: boolean = true;

  mounted() {
    this.show = NavigationStore.state.showSubMenu;
    this.$store.subscribe(() => {
      this.show = NavigationStore.state.showSubMenu;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.sub-nav {
  height: 100%;
  width: 250px;
  background: $secondary-dark;
  z-index: 9998;
}

@media(max-width: 900px) {
  .sub-nav {
    width: 100vw;
  }
}
</style>
