<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="onClick">{{ msg }}</button>
  </div>
</template>

<script>
  export default {
    meta: {
      title: '首页',
      number: 1,
      hide: true,
      roles: [1, 2, 3]
    },
    name: 'OfficerCategory',
    data() {
      return  {
        msg: 'hello'
      }
    },
    methods: {
      onClick() {
        this.msg = '1111'
      }
    }
  }
</script>
