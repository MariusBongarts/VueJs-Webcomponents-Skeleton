<template>
  <div class="nav-bookmarks">
     <button class="logout" @click="logout()">
       <LogoutIcon />
       </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserService } from '../services/user.service';
import LogoutIcon from './../components/Icons/LogoutIcon.vue';
import { Mutation } from 'vuex-class';

@Component({
  name: 'NavBarSub-settings',
  components: {
    LogoutIcon
  }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';
.nav-bookmarks {
  display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
}

button.logout {
 background: none;
 color: white;
 border: none;
 border-radius: 10px;
 margin: 50px auto;
 cursor: pointer;
 outline: none;
}

button.logout:hover {
  color: $danger-color;
}
</style>
