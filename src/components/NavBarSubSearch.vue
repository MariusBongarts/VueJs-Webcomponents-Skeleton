<template>
  <div class="nav-home">
    <NavBarSubHomeFavorites />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavBarSubHomeFavorites from './NavBarSubHomeFavorites.vue';

@Component({
  name: 'NavBarSub-search',
  components: {
    NavBarSubHomeFavorites
  }
})
export default class NavBarSubSearch extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-home {
  height: 100%;
}
</style>
