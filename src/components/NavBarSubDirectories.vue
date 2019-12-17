<template>
  <div class="nav-directories-container">
    <div>
      <SearchBarFilter @input="e => applyFilter(e)" />
    </div>
    <div class="nav-directories">
      <NavBarSubDirectoryItem
        v-for="(directoryBadge, index) in directoriesBadges"
        :key="index"
        :directory="directoryBadge.directory"
        :badge="directoryBadge.badgeValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Directory } from '../models/directory';
import { DirectoryStore } from '../store/directory-store';
import NavBarSubDirectoryItem from './../components/NavBarSubDirectoryItem.vue';
import { MarksStore } from '../store/marks-store';
import SearchBarFilter from './../components/SearchBarFilter.vue';
import { BookmarksStore } from '../store/bookmarks-store';

@Component({
  name: 'NavBarSub-directories',
  components: {
    NavBarSubDirectoryItem,
    SearchBarFilter
  }
})
export default class NavBarSubDirectories extends Vue {
  directories: Directory[] = [];
  directoriesBadges: Array<{ directory: Directory; badgeValue: number }> = [];
  filter = '';
  selectedDirectory: Directory | undefined;

  mounted() {
    this.directories = DirectoryStore.state.directories;
    this.getSelectedDirectory();
    this.loadDirectorys();
    this.listenForState();
  }

  @Watch('$route')
  async onUrlChange() {
    this.getSelectedDirectory();
    this.loadDirectorys();
  }

  getSelectedDirectory() {
    this.selectedDirectory = undefined;
    if (this.$route.name!.startsWith('directories') && this.$route.params.id) {
      this.selectedDirectory = DirectoryStore.state.directories.find(
        directory => directory._id === this.$route.params.id
      );
    }
  }

  listenForState() {
    this.$store.subscribe(state => {
      this.loadDirectorys();
    });
  }

  loadDirectorys() {
    this.filterDirectorys();
    this.directoriesBadges = this.directories.map(directory => {
      return {
        directory,
        badgeValue: this.getBadgeValue(directory)
      };
    });
    this.directoriesBadges = this.directoriesBadges.sort(
      (a, b) => b.badgeValue - a.badgeValue
    );
  }

  filterDirectorys() {
    if (this.selectedDirectory) {
      this.directories = this.getSubDirectories(this.selectedDirectory);
    } else {
      this.directories = DirectoryStore.state.directories.filter(directory =>
        directory.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    }
  }

  getSubDirectories(directory: Directory) {
    return DirectoryStore.state.directories.filter(directoryTmp =>
    directoryTmp._parentDirectory && directoryTmp._parentDirectory === directory._id);
  }

  getBadgeValue(directory: Directory) {
    return MarksStore.state.marks.filter(mark => mark.tags.includes(directory.name))
      .length;
  }

  // Filter got from SearchBar to filter directories
  applyFilter(filter: string) {
    this.filter = filter;
    this.loadDirectorys();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';
.nav-directories-container {
  height: 100%;
}

.nav-directories {
  height: 100%;
  overflow-y: scroll;
  margin-bottom: 50px;
}

// Custom scrollbar
/* Responsive layout - makes the two columns/boxes stack on top of each other instead of next to each other, on small screens */
@media (min-width: 600px) {
  .nav-directories::-webkit-scrollbar {
    width: 5px;
  }
  .nav-directories::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
  }
  .nav-directories::-webkit-scrollbar-thumb {
    background: $primary-color;
    height: 10px;
    box-shadow: inset 0 0 6px $secondary-color;
    border-radius: 10px;
  }
  .nav-directories::-webkit-scrollbar-thumb:hover {
    background: $primary-dark;
  }
}
//
</style>
