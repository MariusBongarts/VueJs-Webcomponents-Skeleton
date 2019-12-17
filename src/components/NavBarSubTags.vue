<template>
  <div class="nav-tags-container">
    <div>
      <SearchBarFilter @input="e => applyFilter(e)" />
    </div>
    <div class="nav-tags">
      <NavBarSubTagsItem
        v-for="(tagBadge, index) in tagsBadges"
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
import { MarksStore } from '../store/marks-store';
import SearchBarFilter from './../components/SearchBarFilter.vue';
import { BookmarksStore } from '../store/bookmarks-store';

@Component({
  name: 'NavBarSub-tags',
  components: {
    NavBarSubTagsItem,
    SearchBarFilter
  }
})
export default class NavBarSubTags extends Vue {
  tags: Tag[] = [];
  tagsBadges: Array<{ tag: Tag; badgeValue: number }> = [];
  filter = '';
  selectedTag: Tag | undefined;

  mounted() {
    this.tags = TagsStore.state.tags;
    this.getSelectedTag();
    this.loadTags();
    this.listenForState();
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

  listenForState() {
    this.$store.subscribe(state => {
      this.loadTags();
    });
  }

  loadTags() {
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
      this.tags = TagsStore.state.tags.filter(tag =>
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
    let tags = [...new Set(relatedTags)].filter(
      tag => tag !== tag
    );
    tags = tags.filter(
      tag =>
        MarksStore.state.marks.filter(mark => mark.tags.includes(tag)).length > 0 ||
        BookmarksStore.state.bookmarks.filter(bookmark => bookmark.tags.includes(tag)).length >
          0
    );
    return TagsStore.state.tags.filter(tag =>
    relatedTags.some(tagString => tagString === tag.name)).filter(tagTmp => tagTmp.name !== tag.name);
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
  margin-bottom: 50px;
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
