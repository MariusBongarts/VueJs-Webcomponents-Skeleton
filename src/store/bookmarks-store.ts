import { Bookmark } from './../models/bookmark';
import { BookmarksState } from './bookmarks-state';
import { Mark } from './../models/mark';
import { GetterTree, MutationTree } from 'vuex';

const state: BookmarksState = {
  bookmarks: []
};

const getters = {
  getBookmarks: () => state.bookmarks
};

const mutations: MutationTree<BookmarksState> = {
  initBookmarks: () => {
    state.bookmarks = state.bookmarks;
  },
  addBookmark: (state, newBookmark: Bookmark) => {
    if (state.bookmarks.filter(bookmark => bookmark._id === newBookmark.id)) {
      state.bookmarks = [...state.bookmarks, newBookmark];
    }
  },
  deleteBookmark: (state, deletedBookmarkId: string) => {
      state.bookmarks = state.bookmarks.filter(bookmark => bookmark._id !== deletedBookmarkId);
  },
  updateBookmark: (state, updatedBookmark: Bookmark) => {
      state.bookmarks = state.bookmarks.map(bookmark => bookmark.id === updatedBookmark._id ? updatedBookmark : bookmark);
  }
};

export const BookmarksStore = {
  state,
  getters,
  mutations
};
