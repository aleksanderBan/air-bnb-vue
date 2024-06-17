<template>
  <div id="app">
    <Login v-if="!user && !isAdminLoggedIn" @loggedIn="userLoggedIn" />
    <Register v-if="!user && !isAdminLoggedIn" />
    
    <div v-if="user && !isAdminLoggedIn">
      <h1>Welcome, {{ user.userName }}</h1>
      <UserPage :user="user" />
      <button @click="goToLogin">Logoff</button>
    </div>

    <AdminLoginComponent v-if="!user && !isAdminLoggedIn" @loggedIn="adminLoggedIn" />

    <div v-if="isAdminLoggedIn">
      <AdminPage @goToLogin="goToLogin" />
    </div>
  </div>
</template>

<script>
import Login from './components/UserLoginComponent.vue';
import Register from './components/RegisterComponent.vue';
import UserPage from './components/UserPageComponent.vue';
import AdminLoginComponent from './components/AdminLoginComponent.vue';
import AdminPage from './components/AdminPageComponent.vue';


export default {
  components: {
    Login,
    Register,
    UserPage,
    AdminLoginComponent,
    AdminPage,
  },
  data() {
    return {
      user: null,
      isAdminLoggedIn: false,
    };
  },
  methods: {
    userLoggedIn(user) {
      this.user = user;
    },
    adminLoggedIn() {
      this.isAdminLoggedIn = true;
    },
    goToLogin() {
      this.user = null;
      this.isAdminLoggedIn = false;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
</style>