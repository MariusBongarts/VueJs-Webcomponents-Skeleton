import { MarkerService } from './../services/marker.service';
import { Mark } from './../models/mark';
import { MarksState } from './marks-state';
import { GetterTree, MutationTree } from 'vuex';
import store from './store';

const state: MarksState = {
  marks: []
};

const getters = {
  getMarks: () => state.marks
};

const mutations: MutationTree<MarksState> = {
  initMarks: () => {
    state.marks = state.marks;
  },
  addMark: (state, newMark) => {
    if (state.marks.filter(mark => mark._id === newMark.id)) {
      state.marks = [...state.marks, newMark];
    }
  }
};

export const MarksStore = {
  state,
  getters,
  mutations
};
