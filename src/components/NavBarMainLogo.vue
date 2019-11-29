<template>
  <div
    class="main-nav-item"
    :class="{ active: active }"
    @click="toggleNavItem()"
  >
    <img @click="navigate('/')" :src="require('./../assets/logoNew2.png')" />
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
export default class NavBarMainLogo extends Vue {}
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

img {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  margin: auto;
  box-shadow: 0px 0px 20px 10px $primary-color-transparent;
}
</style>
