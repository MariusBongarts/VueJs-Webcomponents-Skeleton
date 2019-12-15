<template>
  <div>
    <div v-if="!selected" class="origin-item" @click="navigateToOrigin()">
      <span>{{ origin }}</span>
      <i class="logo-badge">{{ badge }}</i>
    </div>
    <div class="nav-bookmarks" v-if="selected">
      <NavBarSubBookmarksItem
        v-for="(bookmarkBadge, index) in bookmarksBadges"
        :key="index"
        :bookmark="bookmarkBadge.bookmark"
        :badge="bookmarkBadge.badgeValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Bookmark } from '../models/bookmark';
import { BookmarksStore } from '../store/bookmarks-store';
import { MarksStore } from '../store/marks-store';
import { Mutation } from 'vuex-class';
import NavBarSubBookmarksItem from './../components/NavBarSubBookmarksItem.vue';

@Component({
  components: {
    NavBarSubBookmarksItem
  }
})
export default class NavBarSubBookmarksOriginItem extends Vue {
  @Prop() origin!: string;
  @Prop() badge!: number;
  @Prop() selected!: boolean;
  @Prop() bookmarksBadges!: Array<{ bookmark: Bookmark; badgeValue: number }>;
  @Mutation closeSubMenu!: () => void;

  async navigateToOrigin() {
    try {
      await this.$router.push('/bookmarks/' + this.origin);

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
.origin-item {
  background-color: $secondary-color;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  cursor: default;
  color: white;
  font-size: 1rem;
  user-select: none;
  border-radius: 10px;
}

.origin-item:hover {
  background-color: darken($color: $secondary-color, $amount: 3);
}

.origin-item span {
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
  .origin-item {
    margin-right: 5px;
    font-size: 1.2em;
    padding-top: 2px;
    padding-bottom: 2px;
  }
}
</style>
