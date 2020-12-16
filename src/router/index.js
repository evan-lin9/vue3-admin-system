import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import { sleep } from "@/utils";
import { readFileSync } from 'fs'

const source = readFileSync('views/biz-officer/pages/officer-category/index.vue')
console.log(source)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  await sleep(500).then(() => next());
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
