import request from '@/@core/utils/request'

/**
 * Simple RESTful resource class
 */
class Resource {
  model = {};
  constructor (uri) {
    this.uri = uri
  }

  list (query) {
    return request({
      url: `/${this.uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const model = new this.model(element)
          return model
        })
        const { list, meta } = res.data
        if (meta?.pagination) {
          const { count, total } = meta.pagination
          return {
            list: list,
            total: total,
            count: count,
          }
        } else {
          return { list: list }
        }
      },
      )
  }

  get (id, query) {
    const url = !id ? `/${this.uri}` : `/${this.uri}/${id}`
    id && ( query = { ...query, id: id })
    return request({
      url: url,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const model = new this.model({
          ...res.data,
        })
        return model
      })
  }

  post (params) {
    return request({
      url: `/${this.uri}`,
      method: 'post',
      data: params,
    }).then(res => res.data)
      .then(res => res.data)
  }

  patch (id, params) {
    params = { ...params, id: id }
    return request({
      url: `/${this.uri}/${id}`,
      method: 'patch',
      data: params,
    }).then(res => res.data)
      .then(res => res.data)
  }

  put (id, params) {
    const url = !id ? `/${this.uri}` : `/${this.uri}/${id}`
    id && ( params = { ...params, id: id })
    return request({
      url: url,
      method: 'put',
      data: params,
    })
  }

  delete (id, query) {
    query = { id: id }
    return request({
      url: `/${this.uri}/${id}`,
      method: 'delete',
      params: query,
    }).then(res => res.data)
  }

  selectAll (query) {
    return request({
      url: `/${this.uri}/action/select_all`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list: list }
      },
      )
  }

  setModel (model) {
    this.model = model
  }
}

export { Resource as default }
