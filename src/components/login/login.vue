<template>
  <form class="login-form">
    <h1>
      <span>{{title}}</span>
      <!-- <span class="error-msg" v-show="errorMsg">{{errorMsg}}</span> -->
    </h1>
    <input type="text" class="login-input" placeholder="用户名" v-model="username">
    <div class="btn-group">
      <button type="submit"  class="login-btn" @click="doSubmit">登 录</button>
      <!-- <button class="regist-btn" @click="handleRegist">注 册</button> -->
    </div>
  </form>
</template>

<script>
  import axios from 'axios';
  import { api } from '../../utils/requtes';
  export default {
    metaInfo: {
      title: 'Login page',
    },
    data () {
      return {
        username: '',
        errorMsg: '',
        userToken: '',
        title: '登录',
      };
    },
    methods: {
      doSubmit (e) {
        if(!this.validate()) {
          return alert('用户名不能为空');
        }
        console.log('eee',e)
        e.preventDefault();
        axios.post(`${api}login` ,{username: this.username})
          .then((res) => {
            if(res.status != true){
              console.log(res);
            }
            localStorage.setItem(this.username, this.username);
            this.$router.push({name: 'home', params: {username: this.username}});
          })
          .catch((res) => {
            console.log(res);
          })
      },
      validate () {
        if (!this.username.trim()) {
          this.errorMsg = '用户名不能为空';
          return false;
        }
        this.errorMsg = '';
        return true;
      },
      handleRegist () {
        if (this.errorMsg) {
          this.errorMsg = '';
        }
        this.title = '注册';
      },
    },
  };
</script>

<style>
  .login-form {
    /* width: 500px; */
    margin: 0 auto;
    display: flex;
    background-color: #fff;
    border: 1px solid #aaa;
    padding: 30px;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top:  30%;
    left: 50%;
    /* top: 50%;
    left: 50%; */
    transform: translate(-50%, -50%);
  }

  .error-msg {
    font-size: 14px;
    color: #e15050;
    margin-left: 10px;
  }

  .login-input {
    /* width: 400px; */
    font-size: 20px;
    height: 16px;
    padding: 10px;
    margin-top: 30px;
    border-radius: 15px;
    border:1px solid  #9a5eeb;
  }

  .login-btn, .regist-btn {
    margin-right: 24px;
    display: inline-block;
    width: 120px;
    border-radius: 15px;
    font-size: 20px;
    height: 40px;
    color: #fff;
    background-color: #9a5eeb;
    border: none;
    margin-top: 30px;
    transition: .3s all;
  }

  .login-btn:hover, .regist-btn:hover {
    background-color: #e91e63;
  }
</style>
