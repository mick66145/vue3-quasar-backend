import Resource from '@/api/restful/resource'
import request from '@/utils/request'

class BrowserHistoryResource extends Resource {
  constructor () {
    super('browser_history')
  }

  async trafficOverview (query) {
    return await request({
      url: `/${this.uri}/action/traffic_overview`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list: list }
      })
  }

  async browserChartReport (query) {
    return await request({
      url: `/${this.uri}/action/browser_chart_report`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list: list }
      })
  }

  async deviceTypeChartReport (query) {
    return await request({
      url: `/${this.uri}/action/device_type_chart_report`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list: list }
      })
  }

  async trafficChartReport (query) {
    return await request({
      url: `/${this.uri}/action/traffic_chart_report`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list: list }
      })
  }
}

export default BrowserHistoryResource
