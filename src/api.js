
function parseKeyValueResponse(response) {
  return response.json().then((json) => json.values.reverse())
}

function getUrl(kpiId, companyUrlName) {
  return `https://cors.io/?https://borsdata.se/api/partialhighchart?companyUrlName=${companyUrlName}&kpiId=${kpiId}`
}

class BorsdataAPI {
  static getProfitPerShare(companyUrlName) {
    return fetch(getUrl(6, companyUrlName)).then(parseKeyValueResponse)
  }
  static getSalesPerShare(companyUrlName) {
    return fetch(getUrl(5, companyUrlName)).then(parseKeyValueResponse)
  }
}

export default BorsdataAPI
