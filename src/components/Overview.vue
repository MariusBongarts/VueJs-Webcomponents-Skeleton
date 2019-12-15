<template>
  <div class="overview" :v-if="bookmarks.length">
    <div class="selected-header" v-if="selectedId || selectedOrigin">
      <ArrowLeftIcon @click="navigateBack()" class="back-icon" />
      <span>{{ getHeader() }} </span>
    </div>

    <OverviewBookmark
      v-for="(bookmark, index) in bookmarks"
      :key="index"
      :bookmark="bookmark"
    />

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { NavItemMain } from '../models/NavItemMain';
import { Mutation } from 'vuex-class';
import { NavigationStore } from '../store/navigation-store';
import { Route } from 'vue-router';
import OverviewBookmark from './../components/OverviewBookmark.vue';
import ArrowLeftIcon from './../components/Icons/ArrowLeftIcon.vue';
import BlurIn from './../components/animations/BlurIn.vue';
import { Mark } from '../models/mark';
import { MarksStore } from './../store/marks-store';
import { MarkerService } from './../services/marker.service';
import { timeSinceTimestamp } from '../helper/dateHelper';
import { TagsStore } from '../store/tags-store';
import { Tag } from '../models/tag';
import { Bookmark } from '../models/bookmark';
import { BookmarksStore } from '../store/bookmarks-store';

@Component({
  components: {
    BlurIn,
    ArrowLeftIcon,
    OverviewBookmark
  }
})
export default class Overview extends Vue {
  bookmarks: Bookmark[] = [];
  @Mutation initMarks!: () => void;

  // Id param of path
  selectedId = '';

  selectedTag!: Tag | undefined;
  selectedOrigin: string = '';
  selectedBookmark!: Bookmark | undefined;

  async mounted() {
    this.onUrlChange(this.$route);
    this.loadBookmarks();
    this.listenForState();
  }

  navigateBack() {
    const currentRoute = this.$route.name || '';
    if (this.selectedBookmark) {
      this.$router.go(-1);
    } else {
      this.$router.push({ name: currentRoute });
    }
  }

  // If there is an id in the path it will be shown. Otherwise all marks
  @Watch('$route')
  async onUrlChange(route: Route) {
    this.selectedId = this.$route.params.id || '';
    this.selectedTag = undefined;
    this.selectedOrigin = '';
    this.selectedBookmark = undefined;
    if (route.name === 'tags' && this.$route.params.id) {
      this.selectedTag = TagsStore.state.tags.find(
        tag => tag._id === this.selectedId
      );
    }
    if (route.name === 'bookmarks' && this.$route.params.origin) {
      this.selectedOrigin = this.$route.params.origin;
    }

    if (route.name === 'bookmarks' && this.$route.params.id) {
      this.selectedBookmark = BookmarksStore.state.bookmarks.find(
        bookmark => bookmark._id === this.$route.params.id
      );
    }

    await this.loadBookmarks();
  }

  getTimestamp(createdAt: number) {
    return timeSinceTimestamp(createdAt);
  }

  getHeader() {
    if (this.selectedTag) {
      return this.selectedTag!.name;
    }
    if (this.selectedBookmark) {
      return this.selectedBookmark.title;
    }
    if (this.selectedOrigin) {
      return this.selectedOrigin;
    }
    return '';
  }

  listenForState() {
    this.$store.subscribe(state => {
      if (BookmarksStore.state.bookmarks.length !== this.bookmarks.length) {
        this.loadBookmarks();
      }
    });
  }

  loadBookmarks() {
    this.bookmarks = this.getSortedBookmarks();
    console.log(this.bookmarks);
  }

  // Newest mark should be first
  getSortedBookmarks() {
    const filteredBookmarks = this.getFilteredBookmarks();
    const sortedBoomarks = filteredBookmarks.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    return sortedBoomarks;
  }

  getFilteredBookmarks() {
    let bookmarks = BookmarksStore.state.bookmarks;

    // TODO: Take mark tags also into account
    if (this.selectedTag) {
      bookmarks = bookmarks.filter(
        bookmarks =>
          bookmarks.tags &&
          bookmarks.tags.length &&
          bookmarks.tags.includes(this.selectedTag!.name)
      );
    }

    if (this.selectedOrigin && !this.selectedBookmark) {
      bookmarks = bookmarks.filter(bookmarks =>
        bookmarks.url.includes(this.selectedOrigin)
      );
    }

    if (this.selectedBookmark) {
      // TODO: Scroll to selected Bookmark
      bookmarks = bookmarks.filter(
        bookmark => bookmark._id === this.selectedBookmark!._id
      );
      console.log(bookmarks);
    }
    return bookmarks;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.selected-header {
  background: $primary-color;
  height: 60px;
  width: 100%;
  position: fixed;
  color: white;
  display: flex;
  justify-content: left;
  z-index: 9998 !important;
  .back-icon {
    margin: auto 10px;
    cursor: pointer;
  }

  span {
    margin: auto 10px;
    font-size: 1em;
    font-weight: bold;
  }
}

.url-marks {
  margin-top: 50px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 50px 0px;

  .header {
    display: flex;
    justify-content: center;

    a {
      color: $font-color;
      text-decoration: none;
    }
  }
}

.overview {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}

.mark-element {
  background-color: white;
  margin-top: 30px;
}

@media (min-width: 720px) {
  .mark-element {
    border-radius: 5px;
  }
  .url-marks {
    padding: 50px 50px;
  }
}

@media (min-width: 900px) {
  .url-marks {
    padding: 50px 100px;
  }
}
@media (min-width: 1200px) {
  .url-marks {
    padding: 50px 150px;
  }
}
</style>
