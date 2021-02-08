import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import VueI18n from './language';

export const app = createApp(App);

app.config.devtools = true

app
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(VueI18n)
  .mount("#app");
