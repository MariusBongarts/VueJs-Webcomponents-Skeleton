import { AuthStore } from './store/auth-store';
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Marks from './views/Marks.vue';
import Bookmarks from './views/Bookmarks.vue';
import Settings from './views/Settings.vue';
import Account from './views/Account.vue';
import Tags from './views/Tags.vue';
import LandingPage from './views/LandingPage.vue';
import LandingPageInfo from './components/LandingPageInfo.vue';
import LoginContainer from './components/LoginContainer.vue';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: LandingPage,
      children: [
        { path: '/', component: LandingPageInfo },
        { path: '/login', component: LoginContainer },
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/directories',
      name: 'directories',
      component: Home,
    },
    {
      path: '/directories/:id',
      name: 'directories',
      component: Home,
      props: true
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: Home,
    },
    {
      path: '/bookmarks/:origin',
      name: 'bookmarks',
      component: Home,
      props: true
    },
    {
      path: '/bookmarks/:origin/:id',
      name: 'bookmarks',
      component: Home,
      props: true
    },
    {
      path: '/tags',
      name: 'tags',
      component: Home,
    },
    {
      path: '/tags/:id',
      name: 'tags',
      component: Home,
      props: true
    },
    {
      path: '/search',
      name: 'search',
      component: Home,
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "about" */ './views/Settings.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    // For pwa support
    {
      path: '/index.html',
      component: Home,
      alias: '/home'
    },
  ],
});

// Check beforeEach if user is logged in
router.beforeEach((to, from, next) => {
  try {

    // If user is loggedIn but navigates to login or root
    if ((to.path === '/' || to.path === '/login') && AuthStore.state.jwt) next('/home');

    // If user is not loggedIn
    if ((to.path === '/' || to.path === '/login') && !AuthStore.state.jwt) next();

    // If logged In
    else AuthStore.state.jwt ? next() : next('/');

  } catch (error) {
    //
  }
});

export default router;
