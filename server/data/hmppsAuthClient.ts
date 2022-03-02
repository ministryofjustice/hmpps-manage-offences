import config, { ApiConfig } from '../config'
import RestClient from './restClient'

type User = Express.User

export type AuthUserDetails = {
  name: string
  activeCaseLoadId: string
}

export default class HmppsAuthClient extends RestClient {
  constructor() {
    super('HMPPS Auth Client', config.apis.hmppsAuth as ApiConfig)
  }

  async getUser(user: User): Promise<AuthUserDetails> {
    return (await this.get({ path: '/api/user/me' }, { token: user.token })) as Promise<AuthUserDetails>
  }
}
