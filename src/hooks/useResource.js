import { ref } from 'vue-demi'
import request from '@/@core/utils/request'

export const useResource = ({uri})=> {
  
  const factory = ref(null)

  const list = ({query})=> {
    return request({
      url: `/${uri}`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        res.data.list = [...res.data.list].map((element) => {
          const model = factory.value(element)
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

  const get = ({id, query})=> {
    const url = !id ? `/${uri}` : `/${uri}/${id}`
    id && ( query = { ...query, id: +id })
    return request({
      url: url,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const model = factory.value({...res.data,})
        return model
      })
  }

  const post = ({params})=> {
    return request({
      url: `/${uri}`,
      method: 'post',
      data: params,
    }).then(res => res.data)
      .then(res => res.data)
  }

  const patch = ({id, params}) => {
    params = { ...params, id: +id }
    return request({
      url: `/${uri}/${id}`,
      method: 'patch',
      data: params,
    }).then(res => res.data)
      .then(res => res.data)
  }

  const put =  ({id, params}) => {
    const url = !id ? `/${uri}` : `/${uri}/${id}`
    id && ( params = { ...params, id: +id })
    return request({
      url: url,
      method: 'put',
      data: params,
    })
  }

  // const delete = ({id, query})=> {
  //   query = { id: +id }
  //   return request({
  //     url: `/${uri}/${id}`,
  //     method: 'delete',
  //     params: query,
  //   }).then(res => res.data)
  // }

  const selectAll = ({query}) => {
    return request({
      url: `/${uri}/action/select_all`,
      method: 'get',
      params: query,
    }).then(res => res.data)
      .then(res => {
        const { list } = res.data
        return { list: list }
      },
      )
  }

  const setFactory = (model) => {
    factory.value = model
  }

  return {
    list,
    get,
    post,
    patch,
    put,
    selectAll,
    setFactory,
  }
}
