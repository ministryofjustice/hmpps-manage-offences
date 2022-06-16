import config, { ApiConfig } from '../config'
import RestClient from './restClient'
import { FeatureToggle, MostRecentLoadResult, Offence } from '../@types/manageOffences/manageOffencesClientTypes'

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

  getFeatureToggles(user: User): Promise<[FeatureToggle]> {
    return this.get(
      {
        path: '/admin/feature-toggles',
      },
      { token: user.token }
    ) as Promise<[FeatureToggle]>
  }

  toggleFeature(featureToggle: FeatureToggle, user: User): Promise<unknown> {
    return this.put(
      {
        path: '/admin/toggle-feature',
        data: featureToggle,
      },
      { token: user.token }
    )
  }
}
