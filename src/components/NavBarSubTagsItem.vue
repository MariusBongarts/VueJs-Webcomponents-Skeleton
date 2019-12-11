<template>
  <div class="tag-item">
    <span>{{ tag.name }}</span>
    <i class="logo-badge">{{badge}}</i>
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
  .tag-item {
    margin-right: 5px;
    font-size: 1.2em;
    padding-top: 2px;
    padding-bottom: 2px;
  }
}
</style>
