<template>
  <div class="error">
    <p>* {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: ['id', 'message']
}
</script>

<style>
.error {
  border: 1px #ccc;
  margin: 0.5rem 0;
  color: red;
  font-size: 12px;
}
</style>
