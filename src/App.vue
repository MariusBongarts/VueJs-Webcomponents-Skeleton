<template>
  <div id="app" :class="{ loading: !loaded }">
    <div v-if="loggedIn">
      <NavBar />
    </div>

    <div
      v-if="loggedIn"
      class="main-container"
      :class="{ loading: !loaded }"
    >
      <div v-if="!loaded" class="loading">
        <LoadingSpinner />
      </div>
      <BlurIn>
        <router-view v-if="loaded" />
      </BlurIn>
    </div>

    <router-view v-if="!loggedIn" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserService } from './services/user.service';
import { Getter, Mutation } from 'vuex-class';
import NavBar from './components/NavBar.vue';
import BlurIn from './components/animations/BlurIn.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import { AuthStore } from './store/auth-store';
import { SocketService } from './services/socket.service';
import { MarksStore } from './store/marks-store';
import { MarkerService } from './services/marker.service';
import { BookmarkService } from './services/bookmarks.service';
import { TagsService } from './services/tags.service';
import { DirectoryService } from './services/directory.service';
import { TagsStore } from './store/tags-store';
import { BookmarksStore } from './store/bookmarks-store';
import { DirectoryStore } from './store/directory-store';

@Component({
  components: {
    NavBar,
    LoadingSpinner,
    BlurIn
  }
})
export default class App extends Vue {
  loggedIn = false;
  loaded = false;
  @Mutation initMarks!: () => void;
  @Mutation initTags!: () => void;
  @Mutation initBookmarks!: () => void;
  @Mutation initDirectories!: () => void;

  async mounted() {
    this.loggedIn = !!AuthStore.state.jwt;
    this.$store.subscribe(async () => {

      // Load data if user logged in
      const loggedIn = !!AuthStore.state.jwt;
      if (loggedIn && !this.loggedIn) {
        this.loggedIn = loggedIn;
        await this.loadInitialData();
      }
      this.loggedIn = loggedIn;

    });
    await this.loadInitialData();
  }

  async loadInitialData() {
    this.loaded = false;
    await this.loadMarks();

    // We don´t need to wait for everything except the marks,
    // the resst will be loaded asynchronously (Otherwise loading spinner takes too much time)
    this.loadTags();
    this.loadBookmarks();
    this.loadDirectories();

    this.loaded = true;
  }

  async loadMarks() {
    const markService = new MarkerService();
    MarksStore.state.marks = (await markService.getMarks()) || [];
    this.loaded = true;
    this.initMarks();
  }
  async loadTags() {
    const tagsService = new TagsService();
    TagsStore.state.tags = (await tagsService.getTags()) || [];
    this.initTags();
  }
  async loadBookmarks() {
    const bookmarkService = new BookmarkService();
    BookmarksStore.state.bookmarks = (await bookmarkService.getBookmarks()) || [];
    this.initBookmarks();
  }
  async loadDirectories() {
    const directoryService = new DirectoryService();
    DirectoryStore.state.directories = (await directoryService.getDirectories()) || [];
    this.initDirectories();
  }
}
</script>

<style lang="scss">
@import './variables.scss';
body {
  margin: 0;
  padding: 0;
  background-color: $secondary-light;
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
  overflow: hidden;
}

#app.loading {
  background-color: $secondary-dark;
}

.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: $secondary-light;
  transition: background-color 2s ease;
}

.main-container.loading {
  background-color: $secondary-color;
}

.loading {
  margin: auto;
}

/**
 * Tooltip Styles
 */

/* Add this attribute to the element that needs a tooltip */
[data-tooltip] {
  position: relative;
  z-index: 2;
  cursor: pointer;
}

/* Hide the tooltip content by default */
[data-tooltip]:before,
[data-tooltip]:after {
  visibility: hidden;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  opacity: 0;
  pointer-events: none;
}

/* Position tooltip above the element */
[data-tooltip]:before {
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-bottom: 5px;
  margin-left: -80px;
  padding: 7px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: $secondary-color;
  color: #fff;
  content: attr(data-tooltip);
  text-align: inherit;
  font-size: 12px;
}

/* Triangle hack to make tooltip look like a speech bubble */
[data-tooltip]:after {
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-left: -5px;
  border-top: 5px solid #000;
  border-top: 5px solid hsla(0, 0%, 20%, 0.9);
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: ' ';
  font-size: 0;
  line-height: 0;
}

/* Show tooltip content on hover */
[data-tooltip]:hover:before,
[data-tooltip]:hover:after {
  visibility: visible;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
  opacity: 1;
}
</style>
