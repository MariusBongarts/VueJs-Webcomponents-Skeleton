<template>
  <div class="home">
    <div>
      <SlideInTransition>
        <NavBar  v-if="show"/>
      </SlideInTransition>
    </div>

    <div>
      <!-- <img @click="navigate('/')" alt="Vue logo" src="../assets/logo.png"> -->
      <button @click="navigate('about')">About</button>
      <button @click="changeState()">Change state</button>
      <button @click="logout()">Logout</button>

      <transition name="slide-fade">
        <p v-if="show">hello</p>
      </transition>
      <button @click="() => (show = !show)">Animate</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserService } from "./../services/user.service";
import { Getter, Mutation } from "vuex-class";
import SlideInTransition from "./../components/Transitions/SlideInTransition.vue";
import NavBar from "./../components/NavBar.vue";

@Component({
  components: {
    SlideInTransition,
    NavBar
  }
})
export default class Home extends Vue {
  userService = new UserService();
  @Mutation emitLogout!: () => void;
  show = true;

  async logout() {
    this.emitLogout();
    await this.navigate("/");
  }

  changeState() {}

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

.home {
  display: flex;
  flex-wrap: wrap;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.box {
  background: red;
  width: 200px;
  height: 200px;
}
</style>
