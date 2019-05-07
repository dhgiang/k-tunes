<template>
  <div>
    Filter songs:
    <select @change="filterTodos($event)">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FilterSongs'
}
</script>

<style>
select {
  margin-top: 20px;
  padding-left: 6px;
  border: #41b883 1px solid;
}
</style>
