import { NavigationState } from './navigation-state';
import { State } from './../models/state';
import { GetterTree, MutationTree } from 'vuex';

const state: NavigationState = {
  showSubMenu: true
};

const getters = {
  getShowSubMenu: () => state.showSubMenu
};

const mutations: MutationTree<NavigationState> = {
  closeSubMenu: () => {
    state.showSubMenu = false;
  },
  showSubMenu: () => {
    state.showSubMenu = true;
  }
};

export const NavigationStore = {
  state,
  mutations
};
