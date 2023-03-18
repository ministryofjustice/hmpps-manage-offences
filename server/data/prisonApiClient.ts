import config, { ApiConfig } from '../config'
import RestClient from './restClient'
import { PageOffenceDto } from '../@types/prisonApi/prisonApiTypes'

type User = Express.User

export default class PrisonApiClient extends RestClient {
  constructor() {
    super('Prison API', config.apis.prisonApi as ApiConfig)
  }

  getOffencesByCodeStartsWith(offenceCode: string, user: User): Promise<PageOffenceDto> {
    return this.get(
      {
        path: `/api/offences/code/${offenceCode}?page=$pageNumber&size=1000&sort=code,ASC`,
      },
      { token: user.token },
    ) as Promise<PageOffenceDto>
  }
}
