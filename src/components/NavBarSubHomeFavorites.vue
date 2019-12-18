<template>
  <div class="nav-favorites">
    <!-- Favorite tags -->
    <div class="favorite-container tags">
      <div class="header">
        <TagIcon />
        <span>Favorite Tags</span>
      </div>
      <div class="main">
        <NavBarSubTags :limit="5" />
      </div>
    </div>

    <!-- Favorite folders -->
    <div class="favorite-container tags">
      <div class="header">
        <FolderIcon /> <span>Favorite Bookmarks</span>
      </div>
      <div class="main">
        <NavBarSubDirectories :limit="5" />
      </div>
    </div>

    <!-- Favorite origins -->
    <div class="favorite-container tags">
      <div class="header"><LinkIcon /> <span>Favorite Origins</span></div>
      <div class="main">
        <NavBarSubBookmarks :limit="5" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NavBarSubTags from './NavBarSubTags.vue';
import NavBarSubBookmarks from './NavBarSubBookmarks.vue';
import NavBarSubDirectories from './NavBarSubDirectories.vue';
import TagIcon from './../components/Icons/TagIcon.vue';
import FolderIcon from './../components/Icons/FolderIcon.vue';
import LinkIcon from './../components/Icons/LinkIcon.vue';

@Component({
  components: {
    NavBarSubTags,
    NavBarSubBookmarks,
    NavBarSubDirectories,
    TagIcon,
    FolderIcon,
    LinkIcon
  }
})
export default class NavBarSubHomeFavorites extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import './../variables.scss';
.nav-favorites {
  margin-top: 10px;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  .header {
    display: flex;
    justify-content: space-between;
    margin: 5px;
    span {
      margin: auto 0px;
    }
    svg {
      color: $primary-color;
    }
  }
}

.favorite-container {
  padding-top: 20px;
  padding-bottom: 20px;
}

.favorite-container:not(:last-child) {
  border-bottom: 1px solid $secondary-color;
}

// Custom scrollbar
/* Responsive layout - makes the two columns/boxes stack on top of each other instead of next to each other, on small screens */
@media (min-width: 600px) {
  .nav-favorites::-webkit-scrollbar {
    width: 5px;
  }
  .nav-favorites::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
  }
  .nav-favorites::-webkit-scrollbar-thumb {
    background: $primary-color;
    height: 10px;
    box-shadow: inset 0 0 6px $secondary-color;
    border-radius: 10px;
  }
  .nav-favorites::-webkit-scrollbar-thumb:hover {
    background: $primary-dark;
  }
}
//
</style>
