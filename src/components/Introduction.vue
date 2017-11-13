<template>
  <div>
    <label>
      Aktie-slug
      <input type="text" v-model="companyUrlName">
    </label>
    <button v-on:click="loadData(companyUrlName)">Ladda</button>

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

    <a v-bind:href="getBorsdataUrl(companyUrlName)">Visa på börsdata.se</a>
  </div>
</template>

<script>
import KeyFigureBox from '@/components/KeyFigureBox'
import BorsdataAPI from '@/api'

function showError() {
  window.alert(
    'Något gick åt skogen! Kolla att aktie-slugen är rättskriven ' +
    '(står i URL:en, t.ex. "byggmax" eller "g5-entertainment").'
  )
}

export default {
  name: 'Introduction',
  components: {KeyFigureBox},
  methods: {
    loadData(companyUrlName) {
      Promise.all([
        BorsdataAPI.getSalesPerShare(companyUrlName),
        BorsdataAPI.getProfitPerShare(companyUrlName)
      ]).then(([salesPerShare, profitPerShare]) => {
        this.salesPerShare = salesPerShare
        this.profitPerShare = profitPerShare
      }).catch(showError)
    },
    getBorsdataUrl(companyUrlName) {
      return `https://borsdata.se/${companyUrlName}/nyckeltal`
    },
  },
  data: function () {
    return {
      salesPerShare: [],
      profitPerShare: [],
      companyUrlName: 'byggmax',
    }
  }
}
</script>

<style scoped>
.key-figures {
  display: flex;
}
</style>
