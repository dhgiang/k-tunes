<template>
  <div>
    <h3>Most popular hits</h3>
    <div>
      <SearchSongs v-on:search-text="searchText" v-on:reset="reset"/>
    </div>
    <Song
      v-for="song in songs"
      :key="song.id"
      :id="song.id"
      :title="song.title"
      :artist="song.artist"
      :downloaded="song.downloaded"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Cookie from 'js-cookie'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Song from '../../components/Song'
import SearchSongs from '../../components/SearchSongs'
import { config, fetchData, remapSongs } from '../../utils/util.js'

export default {
  components: {
    Song,
    SearchSongs,
    FontAwesomeIcon
  },
  middleware: 'authenticated',
  asyncData({ req }) {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve({
          songs: []
        })
      }, 500)
    })
  },
  async created() {
    try {
      let downloadedSongs = []
      this.$nuxt.$loading.start()
      setTimeout(() => {}, 1000)
      const { data } = await axios.get(
        'https://kepler.space/frontend2019/skillful_wire/listSongs',
        config
      )

      const email = this.$store.state.auth.email
      const password = this.$store.state.auth.password
      const downloaded = await axios.get(
        `https://kepler.space/frontend2019/skillful_wire/listSongs?email=${email}&password=${password}`,
        config
      )

      const values = fetchData(downloaded.data)
      const { song } = fetchData(data).response.songs
      const count = values.response.songs.song

      if (count) {
        downloadedSongs = count.length
          ? count.map(s => s._text)
          : [count._text]
      } else {
        downloadedSongs = ['1']
      }

      this.songs = remapSongs(song, downloadedSongs).sort()
      this.$store.commit('setSongs', this.songs)
    } catch (err) {
      console.log('error: ', err)
    }
  },
  methods: {
    async searchText(text) {
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }

      this.songs = this.songs.filter(song =>
        song.title.toUpperCase().includes(text.toUpperCase())
      )
    },
    async reset() {
      this.songs = this.$store.state.songs
    }
  },
  head() {
    return {
      title: 'K-Tunes Songs',
      meta: [
        {
          hid: 'description',
          name: 'music player',
          content: 'music player'
        }
      ]
    }
  }
}
</script>

<style>
input[type='button'] {
  display: flex-end;
  width: 100px;
  background: #41b883;
  color: #fff;
  border: 1px #41b833 solid;
}
</style>
