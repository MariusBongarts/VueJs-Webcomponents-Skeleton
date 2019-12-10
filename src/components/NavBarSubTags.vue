<template>
  <div class="nav-tags">
    <NavBarSubTagsItem
      v-for="(tagBadge, index) in tagsBadges"
      :key="index"
      :tag="tagBadge.tag"
      :badge="tagBadge.badgeValue"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Tag } from '../models/tag';
import { TagsStore } from '../store/tags-store';
import NavBarSubTagsItem from './../components/NavBarSubTagsItem.vue';
import { MarksStore } from '../store/marks-store';

@Component({
  name: 'NavBarSub-tags',
  components: {
    NavBarSubTagsItem
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
    this.tagsBadges = this.tagsBadges.sort((a, b) => b.badgeValue - a.badgeValue);
  }

  getBadgeValue(tag: Tag) {
    return MarksStore.state.marks.filter(mark => mark.tags.includes(tag.name))
      .length;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
