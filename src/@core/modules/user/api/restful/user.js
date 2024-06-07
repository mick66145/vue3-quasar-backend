import useResource from '@/hooks/useResource'
import { User } from '@/@core/modules/user/models'
import request from '@/@core/utils/request'


export const useUserResource = ({ 
  uri = 'user'
}) => {

  const resetPassword = (id) => {
    return request({
      url: `/${uri}/${id}/reset_password`,
      method: 'post',
    }).then(res => res.data)
  }

  const { list , get , post , patch , put , destroy , selectAll } = useResource({uri , factory:User})

  return {
    list,
    get,
    post,
    patch,
    put,
    destroy,
    selectAll,
    resetPassword,
  }
}
