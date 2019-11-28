<template>
  <div class="nav-bar">
    <NavBarMain></NavBarMain>
    <NavBarSub></NavBarSub>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SlideInTransition from './../components/Transitions/SlideInTransition.vue';
import NavBarSub from './../components/NavBarSub.vue';
import NavBarMain from './../components/NavBarMain.vue';
import NavBarMainItem from './../components/NavBarMainItem.vue';

@Component({
  components: {
    SlideInTransition,
    NavBarSub,
    NavBarMain,
    NavBarMainItem
  }
})
export default class NavBar extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.nav-bar {
  height: 100vh;
  margin: 0;
  display: flex;
  z-index: 9999 !important;
}
</style>
