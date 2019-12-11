<template>
  <div class=".search-bar-filter">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { NavItemMain } from '../models/NavItemMain';
import { Mutation } from 'vuex-class';
import { Route } from 'vue-router';

@Component({
  components: {}
})
export default class SearchBarFilter extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.search-bar-filter {

}

</style>
