<template>
  <div class="home">
    <Overview></Overview>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { UserService } from './../services/user.service';
import { Getter, Mutation } from 'vuex-class';
import SlideInTransition from './../components/Transitions/SlideInTransition.vue';
import NavBar from './../components/NavBar.vue';
import Overview from './../components/Overview.vue';
import { MarkerService } from '../services/marker.service';
import { Mark } from '../models/mark';
import { MarksStore } from './../store/marks-store';
import { Route } from 'vue-router';

@Component({
  components: {
    SlideInTransition,
    NavBar,
    Overview
  }
})
export default class Home extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';
.home {
  display: flex;
  flex-wrap: wrap;
  max-height: 100vh;
  width: 100%;
  overflow-y: scroll;
}

// Custom scrollbar
/* Responsive layout - makes the two columns/boxes stack on top of each other instead of next to each other, on small screens */
@media (min-width: 600px) {
  .home::-webkit-scrollbar {
    width: 8px;
  }
  .home::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 50%;
  }
  .home::-webkit-scrollbar-thumb {
    background: $primary-color;
    height: 10px;
    box-shadow: inset 0 0 6px $secondary-color;
    border-radius: 10px;
  }
  .home::-webkit-scrollbar-thumb:hover {
    background: $primary-dark;
  }
}
//

.marks-container {
  width: 100%;
  background: white;
  margin: 5px;
  padding: 5px;
}
</style>
