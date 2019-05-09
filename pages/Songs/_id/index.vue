<template>
  <div>
    <button>
      <nuxt-link to="/songs">Back to Main</nuxt-link>
    </button>
    <ul>
      <li>ID: {{ song.id }}</li>
      <li>Title: {{ song.title }}</li>
      <li>Artist: {{ song.artist }}</li>
      <li>SUCCESS: {{ song.success }}</li>
      <li>RAW_DATA:</li>
      <textarea name id cols="80" rows="40" v-model="song.rawdata"></textarea>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { config, fetchData } from '../../../utils/util.js'

export default {
  middleware: 'authenticated',
  asyncData() {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve({
          song: {}
        })
      }, 500)
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  },
  async created() {
    try {
      const email = this.$store.state.auth.email
      const password = this.$store.state.auth.password
      const id = this.$route.params.id
      const url = `https://kepler.space/frontend2019/skillful_wire/getSong?email=${email}&password=${password}&songid=${id}`

      const { data } = await axios.get(url, config)
      const { _attributes, rawdata } = fetchData(data).response

      if (_attributes.success && rawdata !== undefined) {
        const songs = this.$store.state.songs
        const item = songs.filter(song => song.id === id)[0];

        this.song = {
          id: this.$route.params.id,
          success: _attributes.success,
          rawdata: rawdata._text,
          title: item.title,
          artist: item.artist
        }
      }
      this.$nuxt.$loading.finish()
    } catch (err) {
      console.log('error: ', err)
      this.$nuxt.$loading.fail()
    }
  }
}
</script>

<style>
</style>
