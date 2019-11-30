import { MarksStore } from './marks-store';
import Vue from 'vue';
import Vuex from 'vuex';
import { AuthStore } from './auth-store';
import { NavigationStore } from './navigation-store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: AuthStore,
    navigation: NavigationStore,
    marks: MarksStore
  }
});
