<template>
  <div class="nav-tags-container">
    <!-- Search bar will be hidden when the limit of shown tags is set -->
    <div v-if="!limit">
      <SearchBarFilter @input="e => applyFilter(e)" />
    </div>
    <div ref="container" class="nav-tags">
      <!-- Show directory of selected Tag, when exists -->
      <div
        class="tags"
        v-if="
          selectedTag &&
            selectedTag._directory &&
            getDirectoryForTag(selectedTag)
        "
      >
        <NavBarSubDirectoryItem
          :key="index"
          :directory="getDirectoryForTag(selectedTag)"
        />
      </div>

      <NavBarSubTagsItem
        v-for="(tagBadge, index) in getInfiniteScrollTags()"
        :key="index"
        :tag="tagBadge.tag"
        :badge="tagBadge.badgeValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Tag } from '../models/tag';
import { TagsStore } from '../store/tags-store';
import NavBarSubTagsItem from './../components/NavBarSubTagsItem.vue';
import NavBarSubDirectoryItem from './../components/NavBarSubDirectoryItem.vue';
import { MarksStore } from '../store/marks-store';
import SearchBarFilter from './../components/SearchBarFilter.vue';
import { BookmarksStore } from '../store/bookmarks-store';
import { DirectoryStore } from '../store/directory-store';
import { SearchStore } from '../store/search-store';

@Component({
  name: 'NavBarSub-tags',
  components: {
    NavBarSubTagsItem,
    SearchBarFilter,
    NavBarSubDirectoryItem
  }
})
export default class NavBarSubTags extends Vue {
  // Can be set to limit the shown tags.
  @Prop() limit!: number;
  tags: Tag[] = [];
  tagsBadges: Array<{ tag: Tag; badgeValue: number }> = [];
  filter = '';
  selectedTag: Tag | undefined | null = null;
  pagination = 50;

  mounted() {
    this.filter = SearchStore.state.filter;
    this.getSelectedTag();
    this.loadTags();
    this.listenForState();
    this.listenForScrolling();
  }

  getInfiniteScrollTags() {
    return this.tagsBadges.slice(0, this.limit || this.pagination);
  }

  // InfiniteScolling: When user scrolled to bottom 20 more items will be reloaded
  listenForScrolling() {
    const container = this.$refs.container as HTMLElement;
    container.addEventListener('scroll', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.scrollHeight - target.scrollTop < target.clientHeight * 2) {
        this.pagination = this.pagination + 50;
      }
    });
  }

  listenForState() {
    this.$store.subscribe(state => {
      if (SearchStore.state.filter) {
        this.filter = SearchStore.state.filter;
      }
      this.loadTags();
    });
  }

  @Watch('$route')
  async onUrlChange() {
    this.getSelectedTag();
    this.loadTags();
  }

  getSelectedTag() {
    this.selectedTag = undefined;
    if (this.$route.name!.startsWith('tags') && this.$route.params.id) {
      this.selectedTag = TagsStore.state.tags.find(
        tag => tag._id === this.$route.params.id
      );
    }
  }

  getDirectoryForTag(tag: Tag) {
    if (tag._directory) {
      return DirectoryStore.state.directories.find(
        directory => directory._id === tag._directory
      );
    } else {
      return null;
    }
  }

  loadTags() {
    // Filter tags, which are a directory. They are a directory if the directory in store has the same name as the tag
    this.tags = TagsStore.state.tags.filter(
      tag =>
        !tag._directory ||
        (DirectoryStore.state.directories.find(
          directory => directory._id === tag._directory
        ) &&
          DirectoryStore.state.directories.find(
            directory => directory._id === tag._directory
          )!.name !== tag.name)
    );

    this.filterTags();
    this.tagsBadges = this.tags.map(tag => {
      return {
        tag,
        badgeValue: this.getBadgeValue(tag)
      };
    });
    this.tagsBadges = this.tagsBadges.sort(
      (a, b) => b.badgeValue - a.badgeValue
    );
  }

  filterTags() {
    if (this.selectedTag) {
      this.tags = this.getRelatedTags(this.selectedTag);
    } else {
      this.tags = this.tags.filter(tag =>
        tag.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    }
  }

  // Load all related tags for the selected one to suggest other tags to user
  getRelatedTags(tag: Tag) {
    let relatedTags: string[] = [];
    MarksStore.state.marks
      .filter(mark => mark.tags.includes(tag.name))
      .forEach(mark => (relatedTags = [...relatedTags, ...mark.tags]));
    BookmarksStore.state.bookmarks
      .filter(bookmark => bookmark.tags.includes(tag.name))
      .forEach(bookmark => (relatedTags = [...relatedTags, ...bookmark.tags]));
    let tags = [...new Set(relatedTags)].filter(tag => tag !== tag);
    tags = tags.filter(
      tag =>
        MarksStore.state.marks.filter(mark => mark.tags.includes(tag)).length >
          0 ||
        BookmarksStore.state.bookmarks.filter(bookmark =>
          bookmark.tags.includes(tag)
        ).length > 0
    );
    return this.tags
      .filter(tag => relatedTags.some(tagString => tagString === tag.name))
      .filter(tagTmp => tagTmp.name !== tag.name)
      .filter(tag =>
        tag.name.toLowerCase().includes(this.filter.toLowerCase())
      );
  }

  getBadgeValue(tag: Tag) {
    return MarksStore.state.marks.filter(mark => mark.tags.includes(tag.name))
      .length;
  }

  // Filter got from SearchBar to filter tags
  applyFilter(filter: string) {
    this.filter = filter;
    this.loadTags();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';
.nav-tags-container {
  height: 100%;
}

.nav-tags {
  height: 100%;
  overflow-y: scroll;
}

// Custom scrollbar
/* Responsive layout - makes the two columns/boxes stack on top of each other instead of next to each other, on small screens */
@media (min-width: 600px) {
  .nav-tags::-webkit-scrollbar {
    width: 5px;
  }
  .nav-tags::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
  }
  .nav-tags::-webkit-scrollbar-thumb {
    background: $primary-color;
    height: 10px;
    box-shadow: inset 0 0 6px $secondary-color;
    border-radius: 10px;
  }
  .nav-tags::-webkit-scrollbar-thumb:hover {
    background: $primary-dark;
  }
}
//
</style>
