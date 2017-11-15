<template>
  <div>
    <h3>{{ title }}</h3>
    <table>
      <tr v-for="year in years">
        <th>{{ year.periodName }}</th>
        <td>{{ year.value }}</td>
        <td>
          <span v-if="year.changePercent">{{ year.changePercent | formatPercent }}</span>
        </td>
      </tr>
      <tr>
        <td>Medel</td>
        <td colspan="2">{{ averagePercent | formatPercent }}</td>
      </tr>
      <tr>
        <td>Gissning</td>
        <td colspan="2">
          <input type="number" class="percent"> %
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
  computed: {
    years() {
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
      }).reverse()
    },
    averagePercent() {
      const sum = this.years.reduce((sum, year) => sum + (year.changePercent || 0), 0)
      const count = this.years.length - 1
      return sum / count
    },
  },
}
</script>

<style scoped>
div {
  margin: 10px;
}
td, th {
  padding: 0 10px;
  text-align: right;
}
input.percent {
  width: 40px;
  text-align: right;
}
</style>
