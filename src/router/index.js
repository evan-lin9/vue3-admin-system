import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createRouter, createWebHashHistory } from "vue-router";
import { sleep, getToken } from "@/utils";
import generateRoutes from './route.config'

export const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  ...generateRoutes
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next('/');
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
  } else {
    if (to.path === '/login') {
      await sleep(500).then(() => next());
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done()
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
