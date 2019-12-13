import { NavigationState } from './navigation-state';
import { GetterTree, MutationTree } from 'vuex';

const state: NavigationState = {
  showSubMenu: screen.width < 900 ? false : true
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
