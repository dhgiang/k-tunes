<template>
  <div>
    <h3>Register</h3>
    <div class="Add">
      <form @submit.prevent="onSubmit">
        <strong>Username:</strong>
        <input type="text" v-model="name" placeholder="Enter your name">
        <br>
        <strong>Email:</strong>
        <input type="text" v-model="email" placeholder="Enter your email">
        <br>
        <strong>Enter Password:</strong>
        <input type="password" v-model="password" placeholder="Enter a password">
        <br>
        <strong>Confirm Password</strong>
        <input type="password" v-model="password2" placeholder="Re-type password to confirm">
        <br>
        <input type="submit" value="Create Account">
        <input type="reset" value="Clear" @click="clear">
      </form>
      <div v-if="$store.state.error" class="error">
        <Error v-for="error in errors" :key="error.id" :message="error.message"/>
      </div>
      <div id="snackbar">User Created</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { config, fetchData } from '../utils/util.js'
import Error from '../components/Error'

const Cookie = process.client ? require('js-cookie') : undefined
const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g

export default {
  components: {
    Error
  },
  data() {
    return {
      title: 'Register',
      errors: [],
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    async onSubmit() {
      // validate password
      if (this.password !== this.password2) {
        this.errors.push({ id: '1', message: 'passwords do not match' })
      }
      if (!this.email.match(regex)) {
        this.errors.push({ id: '2', message: 'Email address is invalid' })
      }

      if (this.errors.length > 0) {
        this.$store.commit('setError', this.errors)
      } else {
        try {
          const url = `https://kepler.space/frontend2019/skillful_wire/createUser?name=${
            this.name
          }&email=${this.email}&password=${this.password}`
          const { data } = await axios.post(url)
          const { _attributes, _text } = fetchData(data).response
          console.log('result: ', data)
          if (_attributes.success === 'false') {
            this.errors.push({ id: 3, message: _text })
          } else if (_attributes.success === 'true') {
            var x = document.getElementById('snackbar')
            x.className = 'show'
            setTimeout(function() {
              x.className = x.className.replace('show', '')
            }, 3000)
            this.errors = []
            this.name = ''
            this.email = ''
            this.password = ''
            this.password2 = ''
          }
        } catch (err) {
          console.log('error: ', err)
        }
      }
    },
    clear() {
      this.errors = []
      this.name = ''
      this.email = ''
      this.password = ''
      this.password2 = ''
      this.$store.commit('setError', this.errors)
      console.log('array: ', this.errors.length)
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

input[type='submit'],
input[type='reset'] {
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
