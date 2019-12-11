<template>
  <div class="nav-tags-container">
    <div>
      <SearchBarFilter />
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Tag } from '../models/tag';
import { TagsStore } from '../store/tags-store';
import NavBarSubTagsItem from './../components/NavBarSubTagsItem.vue';
import { MarksStore } from '../store/marks-store';
import SearchBarFilter from './../components/SearchBarFilter.vue';

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

  mounted() {
    this.tags = TagsStore.state.tags;
    this.loadTags();
    this.listenForState();
  }

  listenForState() {
    this.$store.subscribe(state => {
      this.loadTags();
    });
  }

  loadTags() {
    this.tags = TagsStore.state.tags;
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

  getBadgeValue(tag: Tag) {
    return MarksStore.state.marks.filter(mark => mark.tags.includes(tag.name))
      .length;
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
