import { State } from './../models/state';
import { GetterTree, MutationTree } from 'vuex';

const state: State = {
  jwt: localStorage.jwt_webmarker
};

const getters = {
};

const mutations: MutationTree<State> = {
  emitLogout: () => {
    state.jwt = '';
    localStorage.jwt_webmarker = '';
  },
  emitLogin: () => {
    state.jwt = localStorage.jwt_webmarker;
  }
};

export const AuthStore = {
  state,
  getters,
  mutations
};
