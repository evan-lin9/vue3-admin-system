import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import { components, plugins } from "@/utils/element-component";
import { compileScript } from '@vue/compiler-sfc'


const app = createApp(App);
app.config.globalProperties.$ELEMENT = {
  size: "small",
  zIndex: 3000
};

components.forEach(component => {
  app.use(component);
});

plugins.forEach(plugin => {
  app.use(plugin);
});
app
  .use(store)
  .use(router)
  .mount("#app");
