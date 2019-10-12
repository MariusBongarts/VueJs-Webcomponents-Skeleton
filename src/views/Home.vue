<template>
  <div class="home">
    <img @click="navigate('/')" alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <button  @click="navigate('about')">About</button>
    <button @click="changeState()">Change state</button>
        <button @click="logout()">Logout</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import { UserService } from './../services/user.service';
import { Getter, Mutation } from 'vuex-class';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  userService = new UserService();
  @Mutation emitLogout!: () => void;

  async logout()  {
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

  changeState() {
    this.$store.state.auth.jwt = 'Yeeeah';
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>