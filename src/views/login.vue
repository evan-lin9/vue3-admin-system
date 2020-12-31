<template>
  <div class="login-container">
    <div class="box">
      <div class="left">
        <div class="content">
          <h3 class="desc">Send your info to us</h3>
        </div>
      </div>
      <div class="right">
        <h3 class="title">Sign Up</h3>
        <form class="login-form">
          <div class="item">
            <label class="label" for="username">USERNAME</label>
            <input
              v-model="payload.username"
              autocomplete="off"
              class="input"
              type="text"
              id="username"
              placeholder="ygstudying@qq.com"
            />
          </div>
          <div class="item">
            <label class="label" for="password">PASSWORD</label>
            <input
              v-model="payload.password"
              autocomplete="off"
              class="input"
              type="password"
              id="password"
              placeholder="123456"
            />
          </div>
          <button @click="onSubmit" class="button" type="button">SUBMIT</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import store from '@/store'
import router from '@/router'

export default {
  name: "Login",
  setup() {
    const payload = reactive({
      username: "ygstudying@qq.com",
      password: 123456
    });
    const onSubmit = async () => {
      await store.dispatch('login', payload)
      await router.push('/')
    };
    return {
      payload,
      onSubmit
    };
  }
};
</script>

<style scoped lang="scss">
@import "~@/styles/variales.scss";

.login-container {
  height: 100vh;
  background: $back-color;
  display: flex;
  align-items: center;
}
.box {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.left {
  position: relative;
  height: 380px;
  width: 380px;
  background: url("../assets/login.jpg") center center;
  background-size: 158%;
  .content:after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background-color: $blue;
    opacity: 0.6;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .desc {
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    font-size: $font-size6;
    padding: $spacing2;
    z-index: 2;
  }
}
.right {
  height: 480px;
  width: 320px;
  box-sizing: border-box;
  background: white;
  padding: $spacing6;
  .title {
    color: rgba($blue, 0.9);
    font-size: $font-size4;
  }
}
.login-form {
  .item:first-child {
    margin-top: $spacing6;
  }
  .item:nth-child(2) {
    margin-top: $spacing5;
  }
  .label {
    font-family: "Helvetica", serif;
    font-size: $font-size2;
    letter-spacing: 3px;
    color: $gray;
    padding: $spacing1 0;
  }
  .input {
    display: block;
    width: 250px;
    margin-top: $spacing1;
    padding: $spacing2 0;
    border: none;
    border-bottom: 2px solid rgba($gray, 0.4);
    &:focus {
      outline: none;
    }
  }
  .button {
    height: 40px;
    width: 160px;
    margin-top: $spacing6;
    background-color: $blue;
    color: white;
    border-radius: 40px;
    outline: none;
    border: 1px solid transparent;
    letter-spacing: 2px;
    cursor: pointer;
  }
}
</style>
