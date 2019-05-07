<template>
  <div>
    <h3>Login</h3>
    <div>
      <form @submit.prevent="onSubmit">
        <strong>Email:</strong>
        <label for="email">
          <input id="email" type="email" v-model="email" placeholder="Enter your email">
        </label>
        <br>
        <strong>Password:</strong>
        <input type="password" v-model="password" placeholder="Enter a password">
        <br>
        <input type="submit" value="Login">
        <input @click="register" type="button" value="Register">
      </form>
      <div v-if="$store.state.error" class="error">
        <p>{{ error }}</p>
      </div>
      <div id="snackbar">User Authenticated - let's download some songs</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { config, fetchData } from '../utils/util.js'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  data() {
    return {
      title: 'Login',
      error: '',
      email: '',
      password: ''
    }
  },
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
    async onSubmit() {
      try {
        const songId = '5d85f3d4fb32888d19d9f423fd261cf9'
        const url = `https://kepler.space/frontend2019/skillful_wire/getSong?email=${
          this.email
        }&password=${this.password}&songid=${songId}`
        const { data } = await axios.get(url, config)
        const { _attributes } = fetchData(data).response

        if (_attributes.success === 'true') {
          const auth = {
            email: this.email,
            password: this.password,
            accessToken: 'someStringGotFromApiServiceWithAjax'
          }

          this.$store.commit('setAuth', auth)
          Cookie.set('auth', auth)

          this.email = ''
          this.password = ''
          const redirectSongs = () => this.$router.push('/songs')
          let x = document.getElementById('snackbar')
          x.className = 'show'
          setTimeout(function() {
            x.className = x.className.replace('show', '')
            redirectSongs()
          }, 3000)
        } else {
          this.error = 'You have entered the wrong username or password'
          this.$store.commit('setError', this.error)
        }
      } catch (err) {
        this.error = `Something wrong with the API - ${err}`
      }
    },
    async register() {
      this.$router.push('/register')
    }
  }
}
</script>
<style scoped>
form {
  display: grid;
}

input {
  width: 250px;
  border: 1px dotted #ccc;
  line-height: 1.6rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
h3 {
  padding-bottom: 1rem;
  text-align: center;
}

.error {
  color: red;
  font-size: 12px;
}

input[type='submit'],
input[type='button'] {
  width: 250px;
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b833 solid;
  cursor: pointer;
  margin-bottom: 5px;
}

#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #41b883;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>