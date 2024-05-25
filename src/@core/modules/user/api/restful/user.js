import Resource from '@/@core/api/restful/resource'
import { User } from '@/@core/modules/user/models'

class UserResource extends Resource {
  constructor () {
    super('user')
    this.setModel(User)
  }
  
  async resetPassword (id) {
    return await request({
      url: `/${this.uri}/${id}/reset_password`,
      method: 'post',
    }).then(res => res.data)
  }
}

export default UserResource
