<template>
  <div id="app">
    <div v-if="loggedIn">
      <NavBar />
    </div>

    <div v-if="loggedIn" class="main">
      <router-view />
    </div>

    <router-view v-if="!loggedIn" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserService } from './services/user.service';
import { Getter, Mutation } from 'vuex-class';
import NavBar from './components/NavBar.vue';
import { AuthStore } from './store/auth-store';
import { SocketService } from './services/socket.service';
import { MarkerService } from './services/marker.service';
import { MarksStore } from './store/marks-store';

@Component({
  components: {
    NavBar
  }
})
export default class App extends Vue {
  loggedIn = false;
  @Mutation initMarks!: () => void;

  async mounted() {
    this.loggedIn = !!AuthStore.state.jwt;
    this.$store.subscribe(() => {
      this.loggedIn = !!AuthStore.state.jwt;
    });

    this.loadInitialData();
  }

  // We don´t need to wait for this. It can be loaded asynchronously
  loadInitialData() {
    this.loadMarks();
  }

  async loadMarks() {
    const markService = new MarkerService();
    MarksStore.state.marks = (await markService.getMarks()) || [];
    this.initMarks();
  }
}
</script>

<style lang="scss">
@import './variables.scss';
body {
  // background: $secondary-dark;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary-color;
  height: 100%;
  max-width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  background: $secondary-light;
  overflow: hidden;
}

.main {
  width: 100%;
  height: 100%;
  background: $secondary-light;
}
</style>
