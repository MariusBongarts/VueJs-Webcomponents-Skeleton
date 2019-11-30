import { JwtPayload } from './../models/jwtPayload';
import { AuthState } from './auth-state';
import { GetterTree, MutationTree } from 'vuex';
import jwt_decode from 'jwt-decode';

const state: AuthState = {
  jwt: localStorage.jwt_webmarker
};

const getters = {
  getJwtPayload: () => jwt_decode(state.jwt) as JwtPayload
};

const mutations: MutationTree<AuthState> = {
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
