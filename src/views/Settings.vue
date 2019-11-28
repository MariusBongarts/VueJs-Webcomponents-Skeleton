<template>
  <div class="home">

      <h1>Settings</h1>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserService } from './../services/user.service';
import { Getter, Mutation } from 'vuex-class';
import SlideInTransition from './../components/Transitions/SlideInTransition.vue';
import NavBar from './../components/NavBar.vue';

@Component({
  components: {
    SlideInTransition,
    NavBar
  }
})
export default class Settings extends Vue {
  userService = new UserService();
  @Mutation emitLogout!: () => void;
  show = true;

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
  flex-wrap: wrap;
  background: $secondary-light;
}

.box {
  background: red;
  width: 200px;
  height: 200px;
}
</style>
