<template>
  <header class="header">
    <h1 class="title">K-Tunes</h1>
    <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li v-if="!$store.state.auth">
        <nuxt-link to="/login">Login</nuxt-link>
      </li>
      <li v-if="$store.state.auth">
        <nuxt-link to="/songs">Songs</nuxt-link>
      </li>
      <li v-if="$store.state.auth">
        <nuxt-link to="/logout">Logout</nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'AppHeader'
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dotted #ccc;
}

.header .title {
  font-size: 3rem;
  color: #526488;
}

.header ul {
  display: flex;
}

.header a {
  display: inline-block;
  background: #41b883;
  color: #fff;
  padding: 0.3rem 1rem;
  margin-right: 0.5rem;
}
</style>
