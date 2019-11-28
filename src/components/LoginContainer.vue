<template>
  <transition name="bounce" appear>
    <lobby-container
      v-if="true"
      :url="this.url"
      @loggedIn="e => login(e)"
    ></lobby-container>
  </transition>
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
    console.log(e);
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
@import './../variables.scss';

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
// .bounce-leave-active {
//   animation: bounce-in 0.3s reverse;
// }
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
