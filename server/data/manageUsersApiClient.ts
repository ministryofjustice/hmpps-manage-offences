import RestClient from './restClient'
import config, { ApiConfig } from '../config'
import logger from '../../logger'

export interface User {
  username: string
  name?: string
  active?: boolean
  authSource?: string
  uuid?: string
  userId?: string
  staffId?: number // deprecated, use userId
  activeCaseLoadId?: string // deprecated, use user roles api
}

export interface UserRole {
  roleCode: string
}

export default class ManageUsersApiClient extends RestClient {
  constructor() {
    super('Manage Users Api Client', config.apis.manageUsersApi as ApiConfig)
  }

  async getUser(user: Express.User): Promise<User> {
    logger.info('Getting user details: calling HMPPS Manage Users Api')
    return (await this.get({ path: '/users/me' }, { token: user.token })) as Promise<User>
  }
}
