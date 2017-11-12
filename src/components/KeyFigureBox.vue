<template>
  <div>
    <h3>{{ title }}</h3>
    <dl>
      <li v-for="item in data">
        <b>{{ item.x }}</b> {{ item.y }}
      </li>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'KeyFigureBox',
  props: ['title', 'data'],
}
</script>

<style scoped>
div {
  margin: 10px;
}
</style>
