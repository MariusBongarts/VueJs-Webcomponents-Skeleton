<template>
  <div>
    {{mark.text}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { NavItemMain } from '../models/NavItemMain';
import { Mutation } from 'vuex-class';
import { NavigationStore } from '../store/navigation-store';
import { Route } from 'vue-router';
import { Mark } from '../models/mark';

@Component({
  components: {
  }
})
export default class MarkElement extends Vue {
  @Prop() mark!: Mark;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';


</style>
