import { searchKeysValue } from './utils/filter'

const companyJobList = [
  {
    id: 1,
    name: '助理',
    parent_job: null,
    sequence: 0,
  },
]
let id = 2

export default [
  {
    url: '/api/company_job',
    method: 'get',
    response: config => {
      // eslint-disable-next-line camelcase
      const { keyword, page = 1, page_size = 20 } = config.query
      const keywordFilter = {
        name: keyword,
        tel: keyword,
        tel_service: keyword,
        address: keyword,
        email: keyword,
      }
      const mockList = keyword ? searchKeysValue([...companyJobList], keywordFilter) : [...companyJobList]
      // eslint-disable-next-line camelcase
      const pageList = mockList.filter((item, index) => index < page_size * page && index >= page_size * (page - 1))
      return {
        code: 20000,
        data: {
          list: pageList,
          meta: {
            pagination: {
              total: mockList.length,
              // eslint-disable-next-line camelcase
              count: page_size,
            },
          },
        },
      }
    },
  },
  {
    url: '/api/company_job/:id(\\d+)',
    method: 'get',
    response: config => {
      const { id } = config.query
      for (const companyJob of companyJobList) {
        if (+companyJob.id === +id) {
          return {
            code: 20000,
            data: companyJob,
          }
        }
      }
    },
  },
  {
    url: '/api/company_job',
    method: 'post',
    response: options => {
      const body = options.body
      body.id = id
      id += 1
      companyJobList.push(body)
      return {
        code: 20000,
        data: body,
      }
    },
  },
  {
    url: '/api/company_job/:id(\\d+)',
    method: 'patch',
    response: config => {
      const { id } = config.query
      const index = companyJobList.findIndex(x => x.id === id)
      return {
        code: 20000,
        data: 'success',
      }
    },
  },
  {
    url: '/api/company_job/:id(\\d+)',
    method: 'delete',
    response: config => {
      const { id } = config.query
      const index = companyJobList.findIndex(x => x.id === id)
      return {
        code: 20000,
        data: 'success',
      }
    },
  },
]
