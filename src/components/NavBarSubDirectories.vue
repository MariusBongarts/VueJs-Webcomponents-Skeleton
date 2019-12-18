<template>
  <div class="nav-directories-container">
    <div>
      <SearchBarFilter v-if="!limit" @input="e => applyFilter(e)" />
    </div>
    <div class="nav-directories">
      <NavBarSubDirectoryItem
        v-for="(directoryBadge, index) in directoriesBadges"
        :key="index"
        :directory="directoryBadge.directory"
        :badge="directoryBadge.badgeValue"
      />
      <div
        class="tags"
        v-if="selectedDirectory && getTagsForDirectory().length"
      >
        <NavBarSubTagsItem
          v-for="(tag, index) in getTagsForDirectory()"
          :key="index"
          :tag="tag"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Directory } from '../models/directory';
import { DirectoryStore } from '../store/directory-store';
import NavBarSubDirectoryItem from './../components/NavBarSubDirectoryItem.vue';
import NavBarSubTagsItem from './../components/NavBarSubTagsItem.vue';
import { MarksStore } from '../store/marks-store';
import SearchBarFilter from './../components/SearchBarFilter.vue';
import { BookmarksStore } from '../store/bookmarks-store';
import { TagsStore } from '../store/tags-store';
import { SearchStore } from '../store/search-store';

@Component({
  name: 'NavBarSub-directories',
  components: {
    NavBarSubDirectoryItem,
    SearchBarFilter,
    NavBarSubTagsItem
  }
})
export default class NavBarSubDirectories extends Vue {
  // Can be set to limit the shown directories to show favorites.
  @Prop() limit!: number;
  directories: Directory[] = [];
  directoriesBadges: Array<{ directory: Directory; badgeValue: number }> = [];
  filter = '';
  selectedDirectory: Directory | null = null;

  mounted() {
    this.directories = DirectoryStore.state.directories;
    this.filter = SearchStore.state.filter;
    this.getSelectedDirectory();
    this.loadDirectories();
    this.listenForState();
  }

  @Watch('$route')
  async onUrlChange() {
    this.getSelectedDirectory();
    this.loadDirectories();
  }

  getSelectedDirectory() {
    this.selectedDirectory = null;
    if (this.$route.name!.startsWith('directories') && this.$route.params.id) {
      this.selectedDirectory =
        DirectoryStore.state.directories.find(
          directory => directory._id === this.$route.params.id
        ) || null;
    }
  }

  listenForState() {
    this.$store.subscribe(state => {
      if (SearchStore.state.filter) {
        this.filter = SearchStore.state.filter;
      }
      this.loadDirectories();
    });
  }

  loadDirectories() {
    this.filterDirectories();
    this.directoriesBadges = this.directories
      .filter(
        directory =>
          !directory._parentDirectory ||
          (this.selectedDirectory &&
            this.selectedDirectory._id === directory._parentDirectory)
      )
      .map(directory => {
        return {
          directory,
          badgeValue: this.getBadgeValue(directory)
        };
      });
    this.directoriesBadges = this.directoriesBadges.sort(
      (a, b) => b.badgeValue - a.badgeValue
    );
    // Slice array if limit is set
    if (this.limit) {
      this.directoriesBadges = this.directoriesBadges.slice(0, this.limit);
    }
  }

  filterDirectories() {
    if (this.selectedDirectory) {
      this.directories = this.getSubDirectories(this.selectedDirectory);
    } else {
      this.directories = DirectoryStore.state.directories.filter(directory =>
        directory.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    }
  }

  getSubDirectories(directory: Directory) {
    return DirectoryStore.state.directories.filter(
      directoryTmp =>
        directoryTmp._parentDirectory &&
        directoryTmp._parentDirectory === directory._id &&
        directoryTmp.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  getTagsForDirectory(directory?: Directory) {
    if (!directory) directory = this.selectedDirectory!;
    if (directory) {
      return TagsStore.state.tags.filter(
        tag =>
          tag._directory === directory!._id &&
          tag.name !== directory!.name &&
          tag.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    } else {
      return [];
    }
  }

  getBadgeValue(directory: Directory) {
    return MarksStore.state.marks.filter(mark =>
      mark.tags.includes(directory.name)
    ).length;
  }

  // Filter got from SearchBar to filter directories
  applyFilter(filter: string) {
    this.filter = filter;
    this.loadDirectories();
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
