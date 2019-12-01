<template>
  <div class="mark-overview" v-if="marks.length">
    <MarkElement
      class="mark-element"
      v-for="(mark, index) in marks"
      :key="index"
      :mark="mark"
    >
      {{ mark.text }}
    </MarkElement>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { NavItemMain } from '../models/NavItemMain';
import { Mutation } from 'vuex-class';
import { NavigationStore } from '../store/navigation-store';
import { Route } from 'vue-router';
import MarkElement from './../components/MarkElement.vue';
import { Mark } from '../models/mark';
import { MarksStore } from './../store/marks-store';

@Component({
  components: {
    MarkElement
  }
})
export default class MarkOverview extends Vue {
  marks: Mark[] = [];

  async mounted() {
    this.listenForState();
    this.marks = this.getSortedMarks();
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
    return MarksStore.state.marks.sort((a, b) => b.createdAt - a.createdAt);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.mark-overview {
  width: 100%;
  overflow: hidden;
}

.mark-element {
  margin-top: 20px;
  background: white;
}

@media (min-width: 600px) {
  .mark-element {
    margin: 50px;
    border-radius: 5px;
  }
}
</style>
