import ajax from '@/utils/ajax'

function parseKeyValueResponse(response) {
  return JSON.parse(response).values.reverse()
}

function getUrl(kpiId, companyUrlName) {
  return `https://borsdata.se/api/partialhighchart?companyUrlName=${companyUrlName}&kpiId=${kpiId}`
}

class BorsdataAPI {
  static getProfitPerShare(companyUrlName) {
    return ajax(getUrl(6, companyUrlName)).then(parseKeyValueResponse)
  }
  static getSalesPerShare(companyUrlName) {
    return ajax(getUrl(5, companyUrlName)).then(parseKeyValueResponse)
  }
}

export default BorsdataAPI
