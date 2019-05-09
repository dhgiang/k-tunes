<template>
  <div>
    <h3>Logout</h3>
    <p>You are now logged out.</p>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  mounted() {
    Cookie.remove('auth')
    this.$store.commit('setAuth', null)
  }
}
</script>

<style>
h3 {
  padding-bottom: 1rem;
  text-align: center;
}
</style>
