const useDummyData = true

const dummyProfitsPerShare = {"values":[{"x":"2008","y":"9.25"},{"x":"2009","y":"9.90"},{"x":"2010","y":"11.29"},{"x":"2011","y":"9.56"},{"x":"2012","y":"10.19"},{"x":"2013","y":"10.36"},{"x":"2014","y":"12.07"},{"x":"2015","y":"12.63"},{"x":"2016","y":"11.26"},{"x":"Q3-2017","y":"10.94"}],"information":{"DialogName":"Vinst/Aktie","DialogType":"2"}}
const dummySalesPerShare = {"values":[{"x":"2008","y":"53.49"},{"x":"2009","y":"61.27"},{"x":"2010","y":"65.55"},{"x":"2011","y":"66.47"},{"x":"2012","y":"72.99"},{"x":"2013","y":"77.68"},{"x":"2014","y":"91.49"},{"x":"2015","y":"109.28"},{"x":"2016","y":"116.17"},{"x":"Q3-2017","y":"122.25"}],"information":{"DialogName":"Omsättning/Aktie","DialogType":"2"}}

function parseKeyValueResponse(response) {
  return response.json().then((json) => json.values)
}

function getUrl(kpiId, companyUrlName) {
  return `https://cors.io/?https://borsdata.se/api/partialhighchart?companyUrlName=${companyUrlName}&kpiId=${kpiId}`
}

class BorsdataAPI {
  static getProfitPerShare(companyUrlName) {
    if (useDummyData) {
      return Promise.resolve(dummyProfitsPerShare.values)
    }
    return fetch(getUrl(6, companyUrlName)).then(parseKeyValueResponse)
  }
  static getSalesPerShare(companyUrlName) {
    if (useDummyData) {
      return Promise.resolve(dummySalesPerShare.values)
    }
    return fetch(getUrl(5, companyUrlName)).then(parseKeyValueResponse)
  }
}

export default BorsdataAPI
