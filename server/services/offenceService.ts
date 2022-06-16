import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import { MostRecentLoadResult, Offence } from '../@types/manageOffences/manageOffencesClientTypes'
import FeatureToggleType from '../types/featureToggleType'
import FeatureToggleEnum from '../enums/FeatureToggleEnum'
import FeatureToggleDisplay from '../types/featureToggleDisplay'

type User = Express.User

export default class OffenceService {
  constructor(private readonly manageOffencesApiClient: ManageOffencesApiClient) {}

  async getOffencesByCode(offenceCode: string, user: User): Promise<[Offence]> {
    return this.manageOffencesApiClient.getOffencesByCode(offenceCode, user)
  }

  async getMostRecentLoadResult(user: User): Promise<[MostRecentLoadResult]> {
    return this.manageOffencesApiClient.getMostRecentLoadResult(user)
  }

  async getFeatureToggles(user: User): Promise<FeatureToggleDisplay[]> {
    const toggles = await this.manageOffencesApiClient.getFeatureToggles(user)
    return toggles
      .sort((a, b) => a.feature.localeCompare(b.feature))
      .map(t => {
        return { ...t, displayName: FeatureToggleType[t.feature].displayName } as FeatureToggleDisplay
      })
  }

  async toggleFeature(feature: FeatureToggleEnum, enabled: boolean, user: User): Promise<unknown> {
    return this.manageOffencesApiClient.toggleFeature({ feature, enabled }, user)
  }
}
