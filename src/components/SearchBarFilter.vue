<template>
  <div class="search-bar-filter">
    <SearchIcon />
    <input
      id="searchInput"
      class="searchInput"
      type="search"
      placeholder="Filter"
      autocomplete="off"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { NavItemMain } from '../models/NavItemMain';
import SearchIcon from './../components/Icons/SearchIcon.vue';
import { Mutation } from 'vuex-class';
import { Route } from 'vue-router';

@Component({
  components: {
    SearchIcon
  }
})
export default class SearchBarFilter extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.search-bar-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 75px;
}

.search-bar-filter > *,
.search-bar-filter {
  transition: background-color 1s ease;
}

.search-bar-filter:focus-within > *,
.search-bar-filter:focus-within {
  background-color: $secondary-color;
  color: white;
}

.search-bar-filter:hover > * {
  color: white;
}

svg {
  color: grey;
  height: 20px;
  height: 20px;
  margin: auto 0px;
}

.searchInput {
  outline: none;
  border: none;
  height: 50%;
  background: none;
  color: white;
  margin: auto 0px;
  flex: 1 auto;
  font-size: 15px;
}

input[type='search']::-webkit-search-cancel-button {
  /* Remove default */
  -webkit-appearance: none;

  /* Custom cancel input button */
  height: 20px;
  width: 20px;
  cursor: pointer;
  // Use feather icon x
  background-image: url('data:image/svg+xml;base64,PHN2ZyBzdHlsZT0iY29sb3I6d2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXIteCI+PGxpbmUgeDE9IjE4IiB5MT0iNiIgeDI9IjYiIHkyPSIxOCI+PC9saW5lPjxsaW5lIHgxPSI2IiB5MT0iNiIgeDI9IjE4IiB5Mj0iMTgiPjwvbGluZT48L3N2Zz4=');
}
</style>
