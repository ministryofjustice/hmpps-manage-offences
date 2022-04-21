import config, { ApiConfig } from '../config'
import RestClient from './restClient'
import { MostRecentLoadResult, Offence } from '../@types/manageOffences/manageOffencesClientTypes'

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

  getMostRecentLoadResult(user: User): Promise<[MostRecentLoadResult]> {
    return this.get(
      {
        path: '/offences/load-results',
      },
      { token: user.token }
    ) as Promise<[MostRecentLoadResult]>
  }

  triggerSdrsLoad(user: User) {
    this.post(
      {
        path: '/offences/load-all-offences',
      },
      { token: user.token }
    )
  }

  triggerSdrsUpdate(user: User) {
    this.post(
      {
        path: '/offences/load-offence-updates',
      },
      { token: user.token }
    )
  }
}
