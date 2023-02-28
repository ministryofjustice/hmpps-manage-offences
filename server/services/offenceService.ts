import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import {
  FeatureToggle,
  LinkOffence,
  MostRecentLoadResult,
  Offence,
  Schedule,
} from '../@types/manageOffences/manageOffencesClientTypes'
import FeatureToggleType from '../types/featureToggleType'
import FeatureToggleDisplay from '../types/featureToggleDisplay'

type User = Express.User

export default class OffenceService {
  constructor(private readonly manageOffencesApiClient: ManageOffencesApiClient) {}

  async getOffencesByCode(offenceCode: string, user: User): Promise<[Offence]> {
    return this.manageOffencesApiClient.getOffencesByCode(offenceCode, user)
  }

  async getOffenceById(offenceId: number, user: User): Promise<Offence> {
    return this.manageOffencesApiClient.getOffenceById(offenceId, user)
  }

  async getOffenceWithScheduleDataById(offenceId: number, user: User): Promise<Offence> {
    return this.manageOffencesApiClient.getOffenceWithScheduleDataById(offenceId, user)
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

  async toggleFeatures(featureToggles: FeatureToggle[], user: User): Promise<unknown> {
    return this.manageOffencesApiClient.toggleFeatures(featureToggles, user)
  }

  async getAllSchedules(user: User): Promise<[Schedule]> {
    return this.manageOffencesApiClient.getAllSchedules(user)
  }

  async getScheduleById(scheduleId: number, user: User): Promise<Schedule> {
    return this.manageOffencesApiClient.getScheduleById(scheduleId, user)
  }

  async getOffencesNotLinked(offenceCode: string, schedule: Schedule, user: User): Promise<Offence[]> {
    const offences = await this.getOffencesByCode(offenceCode, user)
    const existingOffenceIds = schedule.scheduleParts
      .filter(sp => sp.offences != null)
      .flatMap(sp => sp.offences)
      .map(o => o.id)
    return offences.filter(o => !existingOffenceIds.includes(o.id))
  }

  linkOffence(linkOffence: LinkOffence, user: User): Promise<unknown> {
    return this.manageOffencesApiClient.linkOffence(linkOffence, user)
  }

  unlinkOffence(schedulePartId: number, offenceId: number, user: User): Promise<unknown> {
    return this.manageOffencesApiClient.unlinkOffence(schedulePartId, offenceId, user)
  }
}
