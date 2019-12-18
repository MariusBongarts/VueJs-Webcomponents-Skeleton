import { SearchState } from './search-state';
import { GetterTree, MutationTree } from 'vuex';

const state: SearchState = {
  filter: ''
};

const getters = {
  getFilter: () => state.filter
};

const mutations: MutationTree<SearchState> = {
  applyFilter: (state, value: string) => {
    state.filter = value;
  }
};

export const SearchStore = {
  state,
  mutations
};
