import store from '@/store/store';
import httpClient from './http-client.service';
import { Bookmark } from '@/models/bookmark';

export class BookmarkService {

  constructor() {
    //
  }

  async getBookmarks(): Promise<Bookmark[] | undefined> {
    try {
      const response = await httpClient.get('/bookmarks');
      const bookmarks: Bookmark[] = response.data;
      return bookmarks;
    } catch (error) {
      store.commit('emitLogout', { root: true });
    }
  }
}
