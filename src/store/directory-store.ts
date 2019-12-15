import { DirectoryState } from './directory-state';
import { Directory } from './../models/directory';
import { Mark } from './../models/mark';
import { GetterTree, MutationTree } from 'vuex';

const state: DirectoryState = {
  directories: []
};

const getters = {
  getDirectories: () => state.directories
};

const mutations: MutationTree<DirectoryState> = {
  initDirectories: () => {
    state.directories = state.directories;
  },
  addDirectory: (state, newDirectory: Directory) => {
    if (state.directories.filter(directory => directory._id === newDirectory.id)) {
      state.directories = [...state.directories, newDirectory];
    }
  },
  deleteDirectory: (state, deletedDirectoryId: string) => {
      state.directories = state.directories.filter(directory => directory._id !== deletedDirectoryId);
  },
  updateDirectory: (state, updatedDirectory: Directory) => {
      state.directories = state.directories.map(directory => directory.id === updatedDirectory._id ? updatedDirectory : directory);
  }
};

export const DirectoryStore = {
  state,
  getters,
  mutations
};
