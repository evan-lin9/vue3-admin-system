<template>
  <div class="hello">
    <h1 class="a">{{ msg }}</h1>
    <p>2321</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<style>
.a {
  color: cadetblue;
}
</style>
