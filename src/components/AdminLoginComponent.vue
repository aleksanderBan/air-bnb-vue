<template>
  <div>
    <h2>Admin Login</h2>
    <div class="move">
    <input v-model="password" type="password" placeholder="Admin Password" />
    <button @click="login" id="xd">Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('https://localhost:7299/admin/login', {
          password: this.password,
        });
        if (response.data.success) {
          this.$emit('loggedIn');
        } else {
          alert('Incorrect admin password');
        }
      } catch (error) {
        console.error('Login failed', error);
        alert('Login failed');
      }
    },
  },
};
</script>
