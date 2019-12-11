<template>
  <div class="mark-overview" v-if="urlMarks.length">
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
          <a target="_blank" :href="urlMark.url">
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
import BlurIn from './../components/animations/BlurIn.vue';
import { Mark } from '../models/mark';
import { MarksStore } from './../store/marks-store';
import { MarkerService } from './../services/marker.service';
import { timeSinceTimestamp } from '../helper/dateHelper';

@Component({
  components: {
    MarkElement,
    BlurIn
  }
})
export default class MarkOverview extends Vue {
  marks: Mark[] = [];
  @Mutation initMarks!: () => void;

  // Same marks made on one page at same time
  urlMarks: MarkOverviewElementModel[] = [];

  async mounted() {
    this.listenForState();
    this.marks = this.getSortedMarks();

    // Load data if store is empty
    if (!this.marks.length) {
      const markService = new MarkerService();
      MarksStore.state.marks = (await markService.getMarks()) || [];
      this.initMarks();
    }
  }

  getTimestamp(createdAt: number) {
    return timeSinceTimestamp(createdAt);
  }

  listenForState() {
    this.$store.subscribe(state => {
      if (MarksStore.state.marks !== this.marks) {
        this.marks = this.getSortedMarks();
      }
    });
  }

  // Newest mark should be first
  getSortedMarks() {
    const sortedMarks = MarksStore.state.marks.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    this.getMarkOverviewElements(sortedMarks);
    return sortedMarks;
  }

  getMarkOverviewElements(sortedMarks: Mark[]) {
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

.url-marks {
  margin-top: 50px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
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
