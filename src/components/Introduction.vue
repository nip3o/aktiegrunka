<template>
  <div>
    <h2>Byggmax</h2>
    <button v-on:click="loadData('byggmax')">Ladda</button>
    <div class="key-figures">
      <KeyFigureBox
        class="key-figure"
        v-bind:title="'Försäljningstillväxt'"
        v-bind:data="salesPerShare"
      ></KeyFigureBox>
      <KeyFigureBox
        class="key-figure"
        v-bind:title="'Vinstutveckling'"
        v-bind:data="profitPerShare"
      ></KeyFigureBox>
    </div>
  </div>
</template>

<script>
import KeyFigureBox from '@/components/KeyFigureBox'
import BorsdataAPI from '@/api'

export default {
  name: 'Introduction',
  components: {KeyFigureBox},
  methods: {
    loadData(companyUrlName) {
      BorsdataAPI.getSalesPerShare(companyUrlName).then((values) => {
        this.salesPerShare = values
      })
      BorsdataAPI.getProfitPerShare(companyUrlName).then((values) => {
        this.profitPerShare = values
      })
    }
  },
  data: function () {
    return {
      salesPerShare: [],
      profitPerShare: [],
    }
  }
}
</script>

<style scoped>
.key-figures {
  display: flex;
}
</style>
