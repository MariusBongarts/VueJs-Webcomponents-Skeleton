import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import './webcomponents/dist/main.js';
import { SocketService } from './services/socket.service';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// Start socket connection
const socketService = new SocketService();
