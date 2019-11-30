<template>
  <div class="home">

      <h1>Home</h1>
      <button @click="logout()">Logout</button>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserService } from './../services/user.service';
import { Getter, Mutation } from 'vuex-class';
import SlideInTransition from './../components/Transitions/SlideInTransition.vue';
import NavBar from './../components/NavBar.vue';
import { MarkerService } from '../services/marker.service';

@Component({
  components: {
    SlideInTransition,
    NavBar
  }
})
export default class Home extends Vue {
  userService = new UserService();
  markService = new MarkerService();
  @Mutation emitLogout!: () => void;
  show = true;

  async mounted() {
    const marks = await this.markService.getMarks();
    console.log(marks);
  }

  async logout() {
    this.emitLogout();
    await this.navigate('/');
  }

  async navigate(route: string) {
    try {
      await this.$router.push(route);
    } catch (error) {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';
.home {
  display: flex;
}

</style>
