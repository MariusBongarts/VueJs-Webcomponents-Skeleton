<template>
  <div class="nav-bookmarks-container">
    <div>
      <SearchBarFilter v-if="!limit" @input="e => applyFilter(e)" />
    </div>
    <div class="nav-bookmarks">
      <NavBarSubBookmarksOriginItem
        v-for="(originBadge, index) in originBadges.filter(
          originBadge =>
            !selectedOrigin || selectedOrigin === originBadge.origin
        )"
        :selected="selectedOrigin === originBadge.origin || filter"
        :origin="originBadge.origin"
        :badge="originBadge.badgeValue"
        :key="index"
        :bookmarksBadges="getBookMarkBadgeForOrigin(originBadge.origin)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Bookmark } from '../models/bookmark';
import { BookmarksStore } from '../store/bookmarks-store';
import NavBarSubBookmarksOriginItem from './../components/NavBarSubBookmarksOriginItem.vue';
import { MarksStore } from '../store/marks-store';
import SearchBarFilter from './../components/SearchBarFilter.vue';
import { Route } from 'vue-router';

@Component({
  name: 'NavBarSub-bookmarks',
  components: {
    NavBarSubBookmarksOriginItem,
    SearchBarFilter
  }
})
export default class NavBarSubBookmarks extends Vue {
  // Can be set to limit the shown origins to show favorites.
  @Prop() limit!: number;
  bookmarks: Bookmark[] = [];
  origins: string[] = [];
  bookmarksBadges: Array<{ bookmark: Bookmark; badgeValue: number }> = [];
  originBadges: Array<{ origin: string; badgeValue: number }> = [];
  filter = '';
  selectedOrigin = '';

  mounted() {
    this.bookmarks = BookmarksStore.state.bookmarks;
    this.getCurrentRouteInfo();
    this.loadData();
    this.listenForState();
  }

  // Check if an origin is selected
  @Watch('$route')
  async onUrlChange() {
    this.getCurrentRouteInfo();
  }

  getCurrentRouteInfo() {
    this.selectedOrigin = '';
    if (
      this.$route.name!.startsWith('bookmarks-origin') &&
      this.$route.params.origin
    ) {
      this.selectedOrigin = this.$route.params.origin;
    }
  }

  loadData() {
    this.loadBookmarks();
    this.loadOriginsForBookmarks();
  }

  listenForState() {
    this.$store.subscribe(state => {
      this.loadData();
    });
  }

  getBookMarkBadgeForOrigin(origin: string) {
    return this.bookmarksBadges.filter(bookmarkBadge =>
      bookmarkBadge.bookmark.url.split('/')[2].startsWith(origin)
    );
  }

  loadBookmarks() {
    this.filterBookmarks();
    this.bookmarksBadges = this.bookmarks.map(bookmark => {
      return {
        bookmark,
        badgeValue: this.getBadgeValue(bookmark)
      };
    });
    this.bookmarksBadges = this.bookmarksBadges.sort(
      (a, b) => b.badgeValue - a.badgeValue
    );
  }

  loadOriginsForBookmarks() {
    this.origins = [
      ...new Set(this.bookmarks.map(bookmark => bookmark.url.split('/')[2]))
    ];
    this.origins = [...new Set(this.origins.map(origin => origin))];
    this.originBadges = this.origins.map(origin => {
      return {
        origin,
        badgeValue: MarksStore.state.marks.filter(mark =>
          mark.url.includes(origin)
        ).length
      };
    });
    this.originBadges = this.originBadges.sort(
      (a, b) => b.badgeValue - a.badgeValue
    );
    this.originBadges = this.originBadges.filter(origin => origin.origin);
    // Slice array if limit is set
    if (this.limit) {
      this.originBadges = this.originBadges.slice(0, this.limit);
    }
  }

  filterBookmarks() {
    this.bookmarks = BookmarksStore.state.bookmarks.filter(
      bookmark =>
        bookmark.url.toLowerCase().includes(this.filter.toLowerCase()) ||
        (bookmark.title &&
          bookmark.title.toLowerCase().includes(this.filter.toLowerCase()))
    );
  }

  getBadgeValue(bookmark: Bookmark) {
    return MarksStore.state.marks.filter(mark => mark.url === bookmark.url)
      .length;
  }

  // Filter got from SearchBar to filter bookmarks
  applyFilter(filter: string) {
    this.filter = filter;
    this.loadData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';
.nav-bookmarks-container {
  height: 100%;
}

.nav-bookmarks {
  height: 100%;
  overflow-y: scroll;
}

// Custom scrollbar
/* Responsive layout - makes the two columns/boxes stack on top of each other instead of next to each other, on small screens */
@media (min-width: 600px) {
  .nav-bookmarks::-webkit-scrollbar {
    width: 5px;
  }
  .nav-bookmarks::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
  }
  .nav-bookmarks::-webkit-scrollbar-thumb {
    background: $primary-color;
    height: 10px;
    box-shadow: inset 0 0 6px $secondary-color;
    border-radius: 10px;
  }
  .nav-bookmarks::-webkit-scrollbar-thumb:hover {
    background: $primary-dark;
  }
}
//
</style>
