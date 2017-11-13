<template>
  <div>
    <h3>{{ title }}</h3>
    <table>
      <tr v-for="item in getItems()">
        <th>{{ item.periodName }}</th>
        <td>{{ item.value }}</td>
        <td>
          <span v-if="item.changePercent">{{ item.changePercent | formatPercent }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'KeyFigureBox',
  props: ['title', 'data'],
  filters: {
    formatPercent(value) {
      return `${Math.round(value * 10) / 10} %`
    }
  },
  methods: {
    getItems() {
      let previousValue = null

      return this.data.map((item) => {
        const result = {
          periodName: item.x,
          value: item.y,
          changePercent: null,
        }
        if (previousValue) {
          result.changePercent = ((result.value - previousValue) / previousValue) * 100
        }
        previousValue = result.value
        return result
      })
    }
  },
}
</script>

<style scoped>
div {
  margin: 10px;
}
td {
  padding: 10px;
  text-align: right;
}
</style>
