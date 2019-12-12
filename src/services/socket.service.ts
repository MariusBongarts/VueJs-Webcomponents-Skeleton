import { Mark } from './../models/mark';
import { AuthStore } from './../store/auth-store';
import { MarksStore } from './../store/marks-store';
import openSocket from 'socket.io-client';
import store from '@/store/store';

export class SocketService {
  socket!: SocketIOClient.Socket;

  constructor() {
    if (process.env.VUE_APP_MODE === 'prod') {
      this.initSocket();
      this.handleSockets();
    }
  }

  initSocket() {
    const jwt = AuthStore.state.jwt;
    const jwtPayload = AuthStore.getters.getJwtPayload();
    if (process.env.VUE_APP_MODE === 'prod') {
      this.socket = openSocket(process.env.VUE_APP_SOCKET_URL, { query: { jwt } });
    } else {
      this.socket = openSocket(process.env.VUE_APP_SOCKET_URL, { query: { jwt } });
    }
    this.socket.emit('join', { id: jwtPayload._id, email: jwtPayload.email });
  }

  handleSockets() {

    this.socket.on('createMark', (createdMark: Mark) => {
      store.commit('addMark', createdMark, { root: true });
    });

    this.socket.on('deleteMark', (deletedMarkId: string) => {
      store.commit('deleteMark', deletedMarkId, { root: true });
    });

    this.socket.on('updateMark', (updatedMark: Mark) => {
      store.commit('updateMark', updatedMark, { root: true });
    });

    this.socket.on('connect', (data: string) => {
      console.log('Socket connection successful!');
    });
  }

}
