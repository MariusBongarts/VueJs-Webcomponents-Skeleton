<template>
  <div class="directory-item" @click="navigateToTag()">
    <span>
      <FolderIcon />
      {{ directory.name }}</span
    >
    <i v-if="badge" class="logo-badge">{{ badge }}</i>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Directory } from '../models/directory';
import { DirectoryStore } from '../store/directory-store';
import { Mutation } from 'vuex-class';
import FolderIcon from './../components/Icons/FolderIcon.vue';

@Component({
  components: {
    FolderIcon
  }
})
export default class NavBarSubDirectoryItem extends Vue {
  @Prop() directory!: Directory;
  @Prop() badge!: number;
  @Mutation closeSubMenu!: () => void;

  async navigateToTag() {
    try {
      await this.$router.push('/directories/' + this.directory._id);

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
.directory-item {
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

.directory-item:hover {
  background-color: darken($color: $secondary-color, $amount: 3);
}

.directory-item span {
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
  .directory-item {
    margin-right: 5px;
    font-size: 1.2em;
    padding-top: 2px;
    padding-bottom: 2px;
  }
}

svg {
  height: 20px;
}
</style>
