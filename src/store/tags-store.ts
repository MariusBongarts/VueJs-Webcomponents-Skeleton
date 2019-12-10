import { Tag } from './../models/tag';
import { TagsState } from './tags-state';
import { Mark } from './../models/mark';
import { GetterTree, MutationTree } from 'vuex';

const state: TagsState = {
  tags: []
};

const getters = {
  getTags: () => state.tags
};

const mutations: MutationTree<TagsState> = {
  initTags: () => {
    state.tags = state.tags;
  },
  addTag: (state, newTag: Tag) => {
    if (state.tags.filter(tag => tag._id === newTag.id)) {
      state.tags = [...state.tags, newTag];
    }
  },
  deleteTag: (state, deletedTagId: string) => {
      state.tags = state.tags.filter(tag => tag._id !== deletedTagId);
  },
  updateTag: (state, updatedTag: Tag) => {
      state.tags = state.tags.map(tag => tag.id === updatedTag._id ? updatedTag : tag);
  }
};

export const TagsStore = {
  state,
  getters,
  mutations
};
