import { DirectoryStore } from './directory-store';
import { BookmarksStore } from './bookmarks-store';
import { MarksStore } from './marks-store';
import Vue from 'vue';
import Vuex from 'vuex';
import { AuthStore } from './auth-store';
import { NavigationStore } from './navigation-store';
import { TagsStore } from './tags-store';
import { SearchStore } from './search-store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: AuthStore,
    navigation: NavigationStore,
    marks: MarksStore,
    tags: TagsStore,
    bookmarks: BookmarksStore,
    directories: DirectoryStore,
    search: SearchStore
  }
});
