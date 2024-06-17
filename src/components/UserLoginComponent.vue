<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="userName" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userName: '',
      password: '',
      user: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('https://localhost:7299/user/login', {
          userName: this.userName,
          password: this.password,
        });
        this.user = response.data;
        this.$emit('loggedIn', this.user);
      } catch (error) {
        alert('Incorrect username or password');
      }
    },
  },
};
</script>