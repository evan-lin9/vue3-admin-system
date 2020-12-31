import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../views/dashboard.vue";
import { sleep, getToken } from "@/utils";
import generateRoutes from './routes'

export const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login")
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
      next({ path: '/' })
      NProgress.done()
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
