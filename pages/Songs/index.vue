<template>
  <div>
    <h3>Most popular hits</h3>
    <div>
      <SearchSongs v-on:search-text="searchText" v-on:reset="reset"/>
    </div>
    <FilterSongs/>
    <Song
      v-for="song in songs"
      :key="song.id"
      :id="song.id"
      :title="song.title"
      :artist="song.artist"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Song from '../../components/Song'
import SearchSongs from '../../components/SearchSongs'
import FilterSongs from '../../components/FilterSongs'
import { config, fetchData, remapSongs } from '../../utils/util.js'

export default {
  components: {
    Song,
    SearchSongs,
    FilterSongs
  },
  middleware: 'authenticated',
  data() {
    return {
      songs: []
    }
  },
  async created() {
    try {
      const { data } = await axios.get(
        'https://kepler.space/frontend2019/skillful_wire/listSongs',
        config
      )
      const { song } = fetchData(data).response.songs
      const songList = remapSongs(song)
      this.songs = songList.sort()
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
      try {
        const { data } = await axios.get(
          'https://kepler.space/frontend2019/skillful_wire/listSongs',
          config
        )
        const { song } = fetchData(data).response.songs
        const songList = remapSongs(song)
        this.songs = songList.sort()
      } catch (err) {
        console.log('error: ', err)
      }
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
