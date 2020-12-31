<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>路由列表</h1>
    <ul>
      <li v-for="(route, index) in routes" :key="route.path">
        <router-link
          :to="route.path"
        >
          {{ route.name || index }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { routes } from "@/router";
export default {
  name: "Dashboard",
  data() {
    return {
      routes
    }
  }
};
</script>
