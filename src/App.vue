<template>
  <div id="app">
    <div v-if="loggedIn">
      <NavBar />
    </div>

    <div v-if="loggedIn" class="main-container">
      <div v-if="!marksLoaded" class="loading">
        <LoadingSpinner />
      </div>
      <router-view v-if="marksLoaded" />
    </div>

    <router-view v-if="!loggedIn" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserService } from './services/user.service';
import { Getter, Mutation } from 'vuex-class';
import NavBar from './components/NavBar.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import { AuthStore } from './store/auth-store';
import { SocketService } from './services/socket.service';
import { MarkerService } from './services/marker.service';
import { MarksStore } from './store/marks-store';
import { TagsService } from './services/tags.service';
import { TagsStore } from './store/tags-store';

@Component({
  components: {
    NavBar,
    LoadingSpinner
  }
})
export default class App extends Vue {
  loggedIn = false;
  marksLoaded = false;
  @Mutation initMarks!: () => void;
  @Mutation initTags!: () => void;

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
    this.loadTags();
  }

  async loadMarks() {
    const markService = new MarkerService();
    MarksStore.state.marks = (await markService.getMarks()) || [];
    this.marksLoaded = true;
    this.initMarks();
  }
  async loadTags() {
    const tagsService = new TagsService();
    TagsStore.state.tags = (await tagsService.getTags()) || [];
    this.initTags();
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
  color: $primary-color;
  height: 100%;
  max-width: 100vw;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 1.2em;
  display: flex;
  background: $secondary-light;
  overflow: hidden;
}

.main-container {
  width: 100%;
  height: 100%;
  background: $secondary-light;
  display: flex;
}

.loading {
  margin: auto;
}
</style>
