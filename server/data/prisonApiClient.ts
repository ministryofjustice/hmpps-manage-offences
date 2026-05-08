import { RestClient, asUser } from '@ministryofjustice/hmpps-rest-client'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import config from '../config'
import logger from '../../logger'
import { PageOffenceDto } from '../@types/prisonApi/prisonApiTypes'

type User = Express.User

export default class PrisonApiClient extends RestClient {
  constructor(authenticationClient: AuthenticationClient) {
    super('Prison API', config.apis.prisonApi, logger, authenticationClient)
  }

  getOffencesByCodeStartsWith(offenceCode: string, user: User): Promise<PageOffenceDto> {
    return this.get(
      {
        path: `/api/offences/code/${offenceCode}?page=$pageNumber&size=1000&sort=code,ASC`,
      },
      asUser(user.token),
    ) as Promise<PageOffenceDto>
  }
}
