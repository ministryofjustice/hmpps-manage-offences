import logger from '../../logger'
import config, { ApiConfig } from '../config'
import AuthTokenService from './authTokenService'
import RestClient from './restClient'

export interface User {
  username: string
  name?: string
  active?: boolean
  authSource?: string
  uuid?: string
  userId?: string
  activeCaseLoadId?: string // Will be removed from User. For now, use 'me/caseloads' endpoint in 'nomis-user-roles-api'
}

export interface UserRole {
  roleCode: string
}

export default class ManageUsersApiClient extends RestClient {
  constructor(authTokenService: AuthTokenService) {
    super('Manage Users Api Client', config.apis.manageUsersApi as ApiConfig, authTokenService)
  }

  async getUser(token: string): Promise<User> {
    logger.info('Getting user details: calling HMPPS Manage Users Api')
    return (await this.get({ path: '/users/me' }, { token })) as unknown as Promise<User>
  }
}
