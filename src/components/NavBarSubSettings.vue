<template>
  <div class="nav-bookmarks">
     <button @click="logout()">Logout</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserService } from '../services/user.service';
import { Mutation } from 'vuex-class';

@Component({
  name: 'NavBarSub-settings',
  components: {}
})
export default class NavBarSubSettings extends Vue {
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
