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
      BorsdataAPI.getSalesPerShare(companyUrlName).then((values) => {
        this.salesPerShare = values
      }).catch(showError)

      BorsdataAPI.getProfitPerShare(companyUrlName).then((values) => {
        this.profitPerShare = values
      }).catch(showError)
    }
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
