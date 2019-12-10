import { Tag } from './../models/tag';
import store from '@/store/store';
import httpClient from './http-client.service';

export class TagsService {

  constructor() {
    //
  }

  async getTags(): Promise<Tag[] | undefined> {
    try {
      const response = await httpClient.get('/tags');
      const tags: Tag[] = response.data;
      return tags;
    } catch (error) {
      store.commit('emitLogout', { root: true });
    }
  }
}
