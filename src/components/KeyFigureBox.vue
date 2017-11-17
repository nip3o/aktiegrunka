<template>
  <div>
    <h3>{{ title }}</h3>
    <table>
      <tr v-for="item in yearItems.slice().reverse()">
        <th>{{ item.periodName }}</th>
        <td>{{ item.value }}</td>
        <td>
          <span v-if="item.changePercent">{{ item.changePercent | formatPercent }}</span>
        </td>
      </tr>
      <tr>
        <td>Medel</td>
        <td colspan="2">{{ averagePercent | formatPercent }}</td>
      </tr>
      <tr>
        <td>Trendlinje</td>
        <td colspan="2">{{ trendPercent | formatPercent }}</td>
      </tr>
      <tr>
        <td>Gissning</td>
        <td colspan="2">
          <input type="number" class="percent"> %
        </td>
      </tr>
    </table>

    <LineChart
      :chartData="chartData"
      :width="250"
      :height="250"
    ></LineChart>
  </div>
</template>

<script>
import regression from 'regression'
import LineChart from '@/components/LineChart'

export default {
  name: 'KeyFigureBox',
  components: {LineChart},
  props: ['title', 'data'],
  filters: {
    formatPercent(value) {
      return `${Math.round(value * 10) / 10} %`
    }
  },
  computed: {
    yearItems() {
      let previousValue = null

      return this.data.map((item) => {
        const result = {
          periodName: item.x,
          value: parseFloat(item.y),
          changePercent: null,
          year: parseInt(item.x.slice(-4), 10),  // Yup, this is pretty ugly.
        }
        if (previousValue) {
          result.changePercent = ((result.value - previousValue) / previousValue) * 100
        }
        previousValue = result.value
        return result
      })
    },
    averagePercent() {
      const sum = this.yearItems.reduce((sum, item) => sum + (item.changePercent || 0), 0)
      const count = this.yearItems.length - 1
      return sum / count
    },
    trendPercent() {
      if (!this.yearItems.length) {
        return null
      }
      const values = this.yearItems.map((item) => [item.year, item.value])
      this.trend = regression.linear(values)

      const lastItem = this.yearItems[this.yearItems.length - 1]
      const nextValue = this.trend.predict(lastItem.year + 5)[1]
      return ((nextValue - lastItem.value) / lastItem.value) * 100 / 5
    },
    chartData() {
      if (!this.yearItems) {
        return {}
      }
      return {
        labels: this.yearItems.map((i) => i.periodName),
        datasets: [{
          label: this.title,
          data: this.yearItems.map((i) => i.value),
          borderColor: '#666',
          backgroundColor: '#666',
        }, {
          label: 'Trend',
          data: this.yearItems.map((i) => this.trend.predict(i.year)[1] ),
          borderColor: '#E91E63',
          backgroundColor: '#E91E63',
          pointBorderWidth: 0,
        }],
      }
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
