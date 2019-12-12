<template>
  <div class="mark-overview" :v-if="urlMarks.length">
    <div class="selected-header" v-if="selectedId">
      <ArrowLeftIcon @click="navigateBack()" class="back-icon" />
      <span>{{ getHeader() }}</span>
    </div>
    <div
      class="url-marks"
      v-for="(urlMark, index) in urlMarks"
      :key="index"
      :mark="urlMark"
    >
      <div class="header">
        <h4>{{ urlMark.title }}</h4>
      </div>
      <MarkElement
        class="mark-element"
        v-for="(mark, index) in urlMark.marks"
        :key="index"
        :mark="mark"
      >
        {{ mark.text }}
      </MarkElement>
      <div class="header">
        <h5>
          {{ getTimestamp(urlMark.createdAt) }} -
          <a :data-tooltip="urlMark.url" target="_blank" :href="urlMark.url">
            {{ urlMark.url.split('/')[2] }}</a
          >
        </h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { NavItemMain } from '../models/NavItemMain';
import { MarkOverviewElementModel } from '../models/markOverviewElement.modal.';
import { Mutation } from 'vuex-class';
import { NavigationStore } from '../store/navigation-store';
import { Route } from 'vue-router';
import MarkElement from './../components/MarkElement.vue';
import ArrowLeftIcon from './../components/Icons/ArrowLeftIcon.vue';
import BlurIn from './../components/animations/BlurIn.vue';
import { Mark } from '../models/mark';
import { MarksStore } from './../store/marks-store';
import { MarkerService } from './../services/marker.service';
import { timeSinceTimestamp } from '../helper/dateHelper';
import { TagsStore } from '../store/tags-store';
import { Tag } from '../models/tag';

@Component({
  components: {
    MarkElement,
    BlurIn,
    ArrowLeftIcon
  }
})
export default class MarkOverview extends Vue {
  marks: Mark[] = [];
  @Mutation initMarks!: () => void;

  // Id param of path
  selectedId = '';

  selectedTag!: Tag | undefined;

  // Same marks made on one page at same time
  urlMarks: MarkOverviewElementModel[] = [];

  async mounted() {
    this.onUrlChange(this.$route);
    this.listenForState();
  }

  navigateBack() {
    const currentRoute = this.$route.name || '';
    this.$router.push({ name: currentRoute });
  }

  async loadMarks() {
    this.marks = this.getSortedMarks();
    // Load data if store is empty
    if (!this.marks.length) {
      const markService = new MarkerService();
      MarksStore.state.marks = (await markService.getMarks()) || [];
      this.initMarks();
    }
  }

  // If there is an id in the path it will be shown. Otherwise all marks
  @Watch('$route')
  async onUrlChange(route: Route) {
    this.selectedId = this.$route.params.id || '';
    this.selectedTag = undefined;
    if (route.name === 'tags' && this.$route.params.id) {
      this.selectedTag = TagsStore.state.tags.find(
        tag => tag._id === this.selectedId
      );
    }
    await this.loadMarks();
  }

  getTimestamp(createdAt: number) {
    return timeSinceTimestamp(createdAt);
  }

  getHeader() {
    if (this.selectedTag) {
      return this.selectedTag!.name;
    }
    return '';
  }

  listenForState() {
    this.$store.subscribe(state => {
      if (MarksStore.state.marks !== this.marks) {
        this.loadMarks();
      }
    });
  }

  // Newest mark should be first
  getSortedMarks() {
    const filteredMarks = this.getFilteredMarks();
    const sortedMarks = filteredMarks.sort((a, b) => b.createdAt - a.createdAt);
    this.getMarkOverviewElements(sortedMarks);
    return sortedMarks;
  }

  getFilteredMarks() {
    let marks = MarksStore.state.marks;

    if (this.selectedTag) {
      marks = marks.filter(
        mark =>
          mark.tags &&
          mark.tags.length &&
          mark.tags.includes(this.selectedTag!.name)
      );
    }

    return marks;
  }

  getMarkOverviewElements(sortedMarks: Mark[]) {
    this.urlMarks = [];
    sortedMarks.forEach((mark, index) => {
      const markOverviewElement: MarkOverviewElementModel = {
        url: mark.url,
        title: mark.title,
        createdAt: mark.createdAt,
        marks: [mark]
      };
      // Push to array when empty
      if (!this.urlMarks.length) {
        this.urlMarks.push(markOverviewElement);
        return;
      } else {
        // Check url of last mark is the same, then push it to exisiting markOverviewElement, else create new one
        if (this.urlMarks[this.urlMarks.length - 1].url === mark.url)
          this.urlMarks[this.urlMarks.length - 1].marks.push(mark);
        else this.urlMarks.push(markOverviewElement);
      }
    });
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
  z-index: 9999 !important;
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

.mark-overview {
  width: 100%;
  overflow: hidden;
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
