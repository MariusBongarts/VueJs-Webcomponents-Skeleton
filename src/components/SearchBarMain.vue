<template>
  <div class="search-bar-filter">
    <SearchIcon />
    <input
      id="searchInput"
      ref="searchInput"
      class="searchInput"
      type="search"
      placeholder="Search"
      autocomplete="off"
      @input="emitFilter()"
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
export default class SearchBarMain extends Vue {
  // Is set to true after first input and to false evry 500 ms to prevent too many emit events
  emitBlocked = false;
  emitFilter(e: HTMLInputElement) {
    const inputElement = this.$refs.searchInput as HTMLInputElement;
    if (!this.emitBlocked) {
      this.$emit('input', inputElement.value);
    }

    // Prevent too many emit events
    this.emitBlocked = true;
    setTimeout(() => {
      if (this.emitBlocked) this.$emit('input', inputElement.value);
      this.emitBlocked = false;
    }, 500);
  }

  clearInput() {
    const inputElement = this.$refs.searchInput as HTMLInputElement;
    inputElement.value = '';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

.search-bar-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  z-index: 9999 !important;
}

.search-bar-filter > * {
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
  font-size: 1em;
}

input[type='search']::-webkit-search-cancel-button {
  /* Remove default */
  -webkit-appearance: none;

  /* Custom cancel input button */
  height: 30px;
  width: 30px;
  margin-right: 100px;
  cursor: pointer;
  // Use feather icon x
  background-image: url('data:image/svg+xml;base64,PHN2ZyBzdHlsZT0iY29sb3I6d2hpdGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXIteCI+PGxpbmUgeDE9IjE4IiB5MT0iNiIgeDI9IjYiIHkyPSIxOCI+PC9saW5lPjxsaW5lIHgxPSI2IiB5MT0iNiIgeDI9IjE4IiB5Mj0iMTgiPjwvbGluZT48L3N2Zz4=');
}
</style>
