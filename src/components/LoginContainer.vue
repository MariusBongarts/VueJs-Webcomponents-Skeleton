<template>
  <lobby-container
  :url="this.url"
  @login="e => login(e)"></lobby-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AuthStore from './../store/store';
import { Getter, Mutation } from 'vuex-class';

@Component
export default class LoginContainer extends Vue {
  @Mutation emitLogin!: () => void;
  url = process.env.VUE_APP_BACKEND_URL;

  async login(e: CustomEvent) {
    this.emitLogin();
    try {
      await this.$router.push('/home');
    } catch (error) {
      //
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../variables.scss";


</style>
