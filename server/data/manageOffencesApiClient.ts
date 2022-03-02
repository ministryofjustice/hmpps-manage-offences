import config, { ApiConfig } from '../config'
import RestClient from './restClient'
import { Offence } from '../@types/manageOffences/manageOffencesClientTypes'

type User = Express.User

export default class ManageOffencesApiClient extends RestClient {
  constructor() {
    super('Manage offences API', config.apis.manageOffences as ApiConfig)
  }

  getOffencesByCode(offenceCode: string, user: User): Promise<[Offence]> {
    return this.get(
      {
        path: `/offences/code/${offenceCode}`,
      },
      { token: user.token }
    ) as Promise<[Offence]>
  }
}
