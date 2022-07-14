import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import { MostRecentLoadResult, Offence, Schedule } from '../@types/manageOffences/manageOffencesClientTypes'
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

  async getAllSchedules(user: User): Promise<[Schedule]> {
    return this.manageOffencesApiClient.getAllSchedules(user)
  }

  async getScheduleById(scheduleId: number, user: User): Promise<Schedule> {
    return this.manageOffencesApiClient.getScheduleById(scheduleId, user)
  }

  async getOffencesNotLinked(offenceCode: string, scheduleId: number, user: User): Promise<Offence[]> {
    const offences = await this.getOffencesByCode(offenceCode, user)
    const { scheduleParts } = await this.getScheduleById(scheduleId, user)
    const existingOffenceIds = scheduleParts
      .filter(sp => sp.offences != null)
      .flatMap(sp => sp.offences)
      .map(o => o.id)
    return offences.filter(o => !existingOffenceIds.includes(o.id))
  }

  linkOffence(schedulePartId: number, offenceId: number, user: User): Promise<unknown> {
    return this.manageOffencesApiClient.linkOffence(schedulePartId, offenceId, user)
  }
}
