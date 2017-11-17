import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: [],
  mounted () {
    this.renderChart(this.chartData, {
      elements: {
        line: {
            tension: 0,
            fill: false,
        },
        point: {
          radius: 0
        },
      }
    })
  }
}
