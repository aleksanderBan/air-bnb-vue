<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="userName" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
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
    };
  },
  methods: {
    async register() {

      if (!this.userName.trim() || !this.password.trim()) {
        alert('Please fill in both username and password.');
        return;
      }

      try {
        await axios.post('https://localhost:7299/user/register', {
          userName: this.userName,
          password: this.password,
        });
        alert('Registration successful');
      } catch (error) {
        alert('Registration failed');
      }
    },
  },
};
</script>