import { Mark } from './../models/mark';
import { AuthStore } from './../store/auth-store';
import { MarksStore } from './../store/marks-store';
import openSocket from 'socket.io-client';
import store from '@/store/store';

export class SocketService {
  socket!: SocketIOClient.Socket;

  constructor() {
    this.initSocket();
    this.handleSockets();
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
      console.log('createdMark');
      store.commit('addMark', createdMark, { root: true });
      console.log(createdMark);
    });

    this.socket.on('deleteMark', (deletedMarkId: string) => {
      console.log('deleteMark');
      console.log(deletedMarkId);
    });

    this.socket.on('updateMark', (updatedMark: Mark) => {
      console.log('updateMark');
      console.log(updatedMark);
    });

    this.socket.on('connect', (data: string) => {
      console.log('Socket connection successful!');
    });
  }

}
