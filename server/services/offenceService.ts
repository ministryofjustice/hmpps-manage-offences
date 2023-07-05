import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import {
  LinkOffence,
  Offence,
  OffenceToScheduleMapping,
  Schedule,
} from '../@types/manageOffences/manageOffencesClientTypes'

type User = Express.User

export default class OffenceService {
  constructor(private readonly manageOffencesApi: ManageOffencesApiClient) {}

  async getOffencesByCode(offenceCode: string, user: User): Promise<[Offence]> {
    return this.manageOffencesApi.getOffencesByCode(offenceCode, user)
  }

  async searchOffences(searchString: string, user: User): Promise<[Offence]> {
    return this.manageOffencesApi.searchOffences(searchString, user)
  }

  async getOffenceById(offenceId: number, user: User): Promise<Offence> {
    return this.manageOffencesApi.getOffenceById(offenceId, user)
  }

  async getOffencesByIds(offenceIds: number[], user: User): Promise<Offence[]> {
    return Promise.all(offenceIds.map(id => this.manageOffencesApi.getOffenceById(id, user)))
  }

  async getOffenceToScheduleMapping(offenceId: number, user: User): Promise<OffenceToScheduleMapping> {
    return this.manageOffencesApi.getOffenceToScheduleMapping(offenceId, user)
  }

  async getAllSchedules(user: User): Promise<[Schedule]> {
    return this.manageOffencesApi.getAllSchedules(user)
  }

  async getScheduleById(scheduleId: number, user: User): Promise<Schedule> {
    return this.manageOffencesApi.getScheduleById(scheduleId, user)
  }

  async getOffencesNotLinked(
    searchString: string,
    schedule: Schedule,
    schedulePartId: number,
    user: User,
  ): Promise<Offence[]> {
    const offences = await this.searchOffences(searchString, user)
    const existingOffenceIds =
      schedule.code === 'PCSC'
        ? this.getExistingPCSCOffenceIds(schedule, schedulePartId)
        : this.getExistingOffenceIds(schedule)
    return offences.filter(o => !existingOffenceIds.includes(o.id))
  }

  private getExistingOffenceIds(schedule: Schedule) {
    return schedule.scheduleParts
      .filter(sp => sp.offences != null)
      .flatMap(sp => sp.offences)
      .map(o => o.id)
  }

  // TODO Temporary change for an edge case with PCSC until we come up with a better solution, PCSC offences can be linked across parts
  private getExistingPCSCOffenceIds(schedule: Schedule, schedulePartId: number) {
    return schedule.scheduleParts
      .filter(sp => sp.id === schedulePartId && sp.offences != null)
      .flatMap(sp => sp.offences)
      .map(o => o.id)
  }

  linkOffence(linkOffence: LinkOffence, user: User): Promise<unknown> {
    return this.manageOffencesApi.linkOffence(linkOffence, user)
  }

  unlinkOffence(schedulePartId: number, offenceId: number, user: User): Promise<unknown> {
    return this.manageOffencesApi.unlinkOffence(schedulePartId, offenceId, user)
  }
}
