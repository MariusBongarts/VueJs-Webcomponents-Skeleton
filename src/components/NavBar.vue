<template>
  <div class="nav-bar">
    Test
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../variables.scss";

.nav-bar {
  height: 100vh;
  margin: 0;
  width: 200px;
  background: $secondary-color;
}

</style>
