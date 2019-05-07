<template>
  <div>
    <h3>Welcome to the best Music on K-tunes</h3>
    <div>
      <p>Download a free song in midi today</p>  
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  head() {
    return {
      title: 'Welcome To K-Tunes',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'K Tunes music'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      try {
      } catch (err) {
        console.log('error: ', err)
      }

      setTimeout(() => {
        // we simulate the async request with timeout.
        const auth = {
          accessToken: 'someStringGotFromApiServiceWithAjax'
        }
        this.$store.commit('setAuth', auth) // mutating to store for client rendering
        Cookie.set('auth', auth) // saving token in cookie for server rendering
        this.$router.push('/songs')
      }, 1000)
    }
  }
}
</script>
<style scoped>
form {
  display: grid;
}

p {
  text-align: center;
}

input {
  width: 250px;
  border: 1px dotted #ccc;
  line-height: 1.6rem;
  margin: 5px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

h3 {
  padding-bottom: 1rem;
  text-align: center;
}

input[type='submit'] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b833 solid;
  cursor: pointer;
}
</style>
