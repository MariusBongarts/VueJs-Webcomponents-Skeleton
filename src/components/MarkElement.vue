<template>
  <div class="mark-element">
    <blockquote>
      {{ mark.completeText.split(this.mark.text)[0] }}
      <mark>{{ this.mark.text }}</mark>
      {{ mark.completeText.split(this.mark.text)[1] }}
    </blockquote>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { NavItemMain } from '../models/NavItemMain';
import { Mutation } from 'vuex-class';
import { NavigationStore } from '../store/navigation-store';
import { Route } from 'vue-router';
import { Mark } from '../models/mark';

@Component({
  components: {}
})
export default class MarkElement extends Vue {
  @Prop() mark!: Mark;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.mark-element {
  color: black;
  display: flex;
  flex-wrap: wrap;
}

blockquote {
  color: #555555;
  padding: 20px 30px 20px 75px;
  box-sizing: content-box;
  line-height: 1.6;
  position: relative;
  margin: 0;
}

blockquote::before {
  font-family: Arial;
  content: '\201C';
  color: $primary-color;
  font-size: 5em;
  position: absolute;
  left: 10px;
  top: -45px;
}

blockquote:nth-of-type(even) {
  text-align: right;
  border-right: 8px solid var(--primary-color);
  border-left: none;
  padding: 1.2em 75px 1.2em 30px;
}

mark {
  background: $highlight-color;
}
</style>
