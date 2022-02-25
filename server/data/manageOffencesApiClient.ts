import config, { ApiConfig } from '../config'
import RestClient from './restClient'
import { Offence } from '../@types/manageOffences/manageOffencesClientTypes'

export default class ManageOffenceesApiClient {
  restClient: RestClient

  constructor(token: string) {
    this.restClient = new RestClient('Manage offences API', config.apis.manageOffences as ApiConfig, token)
  }

  getOffencesByCode(offenceCode: string): Promise<[Offence]> {
    return this.restClient.get({
      path: `/offences/code/${offenceCode}`,
    }) as Promise<[Offence]>
  }
}
