<template>
  <div class="mark-overview">
    <div class="header-title">
      <h4>{{ bookmark.title }}</h4>
    </div>
    <OverviewMarkElement
      class="mark-element"
      v-for="(mark, index) in marks"
      :key="index"
      :mark="mark"
    >
    </OverviewMarkElement>
    <div class="header">
      <h5>
        {{ getTimestamp(bookmark.createdAt) }} -
        <a :data-tooltip="bookmark.url" target="_blank" :href="bookmark.url">
          {{ bookmark.url.split('/')[2] }}</a
        >
      </h5>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { NavItemMain } from '../models/NavItemMain';
import { Mutation } from 'vuex-class';
import { NavigationStore } from '../store/navigation-store';
import { Route } from 'vue-router';
import OverviewMarkElement from './../components/OverviewMarkElement.vue';
import ArrowLeftIcon from './../components/Icons/ArrowLeftIcon.vue';
import BlurIn from './../components/animations/BlurIn.vue';
import SlideInFromRight from './../components/animations/SlideInFromRight.vue';
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
    OverviewMarkElement,
    BlurIn,
    ArrowLeftIcon,
    SlideInFromRight
  }
})
export default class OverviewBookmark extends Vue {
  @Prop() bookmark!: Bookmark;
  @Prop() marks!: Mark[];
  @Mutation initMarks!: () => void;

  getTimestamp(createdAt: number) {
    return timeSinceTimestamp(createdAt);
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

.mark-overview {
  border-bottom: 1px solid $white-dark;
  padding: 20px 0px;

  .header-title {
    display: flex;
    justify-content: center;
    color: $font-color;
    padding: 0px 20px;
  }
}

a {
  color: $font-color;
  text-decoration: none;
}

.mark-overview {
  width: 100%;
  overflow: hidden;
}

.mark-element {
  background-color: white;
  margin-top: 15px;
}

@media (min-width: 720px) {
  .mark-element {
    border-radius: 5px;
  }
  .mark-overview {
    padding: 15px 50px;
  }
}

@media (min-width: 900px) {
  .mark-overview {
    padding: 15px 50px;
  }
}
@media (min-width: 1200px) {
  .mark-overview {
    padding: 30px 150px;
  }
}
</style>
