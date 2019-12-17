<template>
  <div class="bookmark-item" @click="navigateToBookmark()">
    <span>
      <BookmarkIcon />
      {{ bookmark.title }}</span
    >
    <i class="logo-badge">{{ badge }}</i>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Bookmark } from '../models/bookmark';
import { BookmarksStore } from '../store/bookmarks-store';
import { MarksStore } from '../store/marks-store';
import { Mutation } from 'vuex-class';
import BookmarkIcon from './../components/Icons/BookmarkIcon.vue';

@Component({
  components: {
    BookmarkIcon
  }
})
export default class NavBarSubBookmarksItem extends Vue {
  @Prop() bookmark!: Bookmark;
  @Prop() badge!: number;
  @Mutation closeSubMenu!: () => void;

  async navigateToBookmark() {
    try {
      await this.$router.push(
        `/bookmarks/${this.bookmark.url.split('/')[2]}/${this.bookmark._id}`
      );

      // Close sub menu only in mobile mode
      if (screen.width < 900) this.closeSubMenu();
    } catch (error) {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';
.bookmark-item {
  background-color: $secondary-color;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  cursor: default;
  color: white;
  font-size: 0.8rem;
  user-select: none;
  border-radius: 10px;
}

.bookmark-item:hover {
  background-color: darken($color: $secondary-color, $amount: 3);
}

.bookmark-item span {
  padding: 3px;
  margin: 2px;
  width: 80%;
  word-break: break-all;
}

.logo-badge {
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: $primary-color;
  font-size: 12px;
  line-height: 2;
  text-align: center;
  margin: auto 5px;
}

@media (max-width: 900px) {
  .bookmark-item {
    margin-right: 5px;
    font-size: 1.2em;
    padding-top: 2px;
    padding-bottom: 2px;
  }
}

svg {
  height: 20px;
}
</style>
