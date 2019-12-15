import store from '@/store/store';
import httpClient from './http-client.service';
import { Directory } from '@/models/Directory';

export class DirectoryService {

  constructor() {
    //
  }

  async getDirectories(): Promise<Directory[] | undefined> {
    try {
      const response = await httpClient.get('/directory');
      const directories: Directory[] = response.data;
      return directories;
    } catch (error) {
      store.commit('emitLogout', { root: true });
    }
  }
}
