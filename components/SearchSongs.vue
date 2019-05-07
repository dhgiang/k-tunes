<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="text" placeholder="Search song ...">
    <input type="submit" value="Search">
    <input @click="reset()" type="reset" value="reset">
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SearchSongs',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('search-text', this.text)
      this.text = ''
    },
    async reset() {
      this.$emit('reset', '')
      this.text = ''
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
}
input {
  border: 1px dotted #ccc;
  line-height: 1.6rem;
  margin: 5px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

input[type='submit'],
input[type='reset'] {
  display: inline;
  flex: 10;
  background: #41b883;
  color: #fff;
  border: 1px #41b833 solid;
  cursor: pointer;
}
</style>
