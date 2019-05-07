<template>
  <div>
    <button>
      <nuxt-link to="/songs">Back to Main</nuxt-link>
    </button>
    <ul>
      <li>ID: {{ song.id }}</li>
      <li>SUCCESS: {{ song.success }}</li>
      <li>RAW_DATA:</li>
      <textarea name id cols="80" rows="40">{{ song.rawdata }}</textarea>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { config, fetchData } from '../../../utils/util.js'

export default {
  middleware: 'authenticated',
  data() {
    return {
      song: {}
    }
  },
  async created() {
    try {
      console.log('id: ', this.$route.params.id)
      // const email = 'duch.giang@gmail.com'
      const email = 'dgiang@delvinia.com'
      const password = 'test1234'
      const id = this.$route.params.id
      const url = `https://kepler.space/frontend2019/skillful_wire/getSong?email=${email}&password=${password}&songid=${id}`

      const { data } = await axios.get(url, config)
      const { _attributes, rawdata } = fetchData(data).response

      if (_attributes.success && rawdata !==undefined) {
        this.song = {
          id: this.$route.params.id,
          success: _attributes.success,
          rawdata: rawdata._text
        }
      }

    } catch (err) {
      console.log('error: ', err)
    }
  }
}
</script>

<style>
</style>
