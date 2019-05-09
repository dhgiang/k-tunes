<template>
  <div class="container">
    <div class="song">
      <p>
        <strong>{{ title }}</strong>
      </p>
      <p>
        <em>by {{ artist }}</em>
      </p>
      <p>
        Download Status: 
        <nuxt-link v-if="downloaded" :to="'/songs/' + id">
          Already downloaded <font-awesome-icon :icon="['fas', 'file']"/>
        </nuxt-link>
        <span v-else>none</span>
      </p>
    </div>
    <div class="buttonIcon">
      <nuxt-link :to="'/songs/' + id">
        <button class="download">
          <font-awesome-icon :icon="['fas', 'download']"/>
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Song',
  props: ['id', 'title', 'artist', 'downloaded'],
  loading: false,
  asyncData() {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve({})
      }, 500)
    })
  },
  mounted() {
    setTimeout(() => {
      this.$nuxt.$loading.finish()
    }, 500)
  },
  methods: {
    goToFinal() {
      this.$nuxt.$loading.start()
      setTimeout(() => {
        this.$router.push("'/songs/' + id")
      }, 500)
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 120px;
}

.song {
  padding: 0.5rem;
  border: 1px dotted #ccc;
  justify-content: flex-start;
  min-width: 250px;
  max-width: 800px;
  width: 75%;
  float: left;
}

.download {
  height: 50px;
  width: 100%;
}

button:hover::before {
  width: 100%;
}
button:hover {
  background: #76d8ac;
  cursor: pointer;
}
.buttonIcon {
  padding: 1rem 0 1rem 0;
  margin: 0 0 1rem 0;
  position: relative;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100px;
  height: 100px;
  float: right;
  line-height: 50px;
}
</style>
