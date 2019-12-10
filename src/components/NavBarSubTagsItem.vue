<template>
  <div class="tag-item">
    <span>{{ tag.name }}</span>
    <span class="badge">{{badge}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Tag } from '../models/tag';
import { TagsStore } from '../store/tags-store';
import { MarksStore } from '../store/marks-store';

@Component({
  components: {}
})
export default class NavBarSubTagsItem extends Vue {
  @Prop() tag!: Tag;
  @Prop() badge!: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';
.tag-item {
  background-color: $secondary-color;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 5px;
  margin-left: 5px;
  cursor: default;
  color: white;
  font-size: 1rem;
  user-select: none;
  border-radius: 10px;
}

.tag-item:hover {
  background-color: darken($color: $secondary-color, $amount: 3);
}

.tag-item span {
  padding: 3px;
  margin: 2px;
}

.badge {
  background: $primary-dark;
  border-radius: 50%;
  width: 1.1em;
  height: 1.1em;
  line-height: 100%;
}

@media (max-width: 900px) {
  .tag-item {
    margin-right: 5px;
    font-size: 1.2em;
    padding-top: 2px;
    padding-bottom: 2px;
  }
}
</style>
