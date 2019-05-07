<template>
  <nuxt-link :to="'/songs/' + id">
    <div class="song">
      <small>{{ id }}</small>
      <p>{{ title }} by</p>
      <em>{{ artist }}</em>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Song',
  props: ['id', 'title', 'artist']
}
</script>

<style>
.song {
  padding: 1rem;
  border: 1px dotted #ccc;
  margin: 1rem 0;
}
</style>
