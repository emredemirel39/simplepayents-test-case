<script>
import { mapState, mapWritableState, mapActions } from 'pinia';
import { useUserStore } from './stores/userStore';

export default {
  name: 'App',

  data() {
    return {

    }
  },

  computed: {
    ...mapWritableState(useUserStore, ['userName', 'isLoggedIn', 'user'])
  },

  beforeMount() {

    localStorage.setItem('X-Application-Token', 'wefiEFv_dwDEvf-12Veda_feadvkJbBgh831');
    this.checkLocalStorage();
  },

  mounted() {
    if (this.isLoggedIn) {
      this.getCurrentUser();
    }
  },


  methods: {
    ...mapActions(useUserStore, ['checkLocalStorage', 'getCurrentUser']),
  }
}

</script>

<template>
 <div class="app">
   <header class="header">
      <div class="container header__wrapper">
        <nav class="header__left">
          <ul>
            <li><router-link to="/">Создать Аккаунт</router-link></li>
            <li><router-link to="/profile">Мой Профиль</router-link></li>
          </ul>
        </nav>
        <div class="header__right">
          <p>Привет {{isLoggedIn ? user?.name : 'гость'}}!</p>
        </div>
      </div>
  </header>
  <main class="main">
    <div class="container">
      <router-view />
    </div>
  </main>
 </div>
</template>

<style lang="scss" scoped>

.app{
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.header {
  width: 100%;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.204);
  padding: 10px 0;
}

.header__wrapper{
  display: flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__left {
  
  ul{
    display: flex;
    gap: 1rem;
  }

  li{
    list-style: none;
  }

  a {
    font-size: 22px;
  }
}

.header__right{
  width: 180px;
  text-align: center;

  p{
    width: 100%;
    font-size: 22px;
  }
}
</style>
