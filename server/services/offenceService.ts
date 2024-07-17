import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import {
  LinkOffence,
  Offence,
  OffenceMarkers,
  OffenceToScheduleMapping,
  PcscLists,
  Schedule,
  SdsExclusionLists,
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
    const existingOffenceIds = this.getExistingOffenceIds(schedule)
    return offences.filter(o => !existingOffenceIds.includes(o.id))
  }

  private getExistingOffenceIds(schedule: Schedule) {
    return schedule.scheduleParts
      .filter(sp => sp.offences != null)
      .flatMap(sp => sp.offences)
      .map(o => o.id)
  }

  linkOffence(linkOffence: LinkOffence, user: User): Promise<unknown> {
    return this.manageOffencesApi.linkOffence(linkOffence, user)
  }

  unlinkOffence(schedulePartId: number, offenceId: number, user: User): Promise<unknown> {
    return this.manageOffencesApi.unlinkOffence(schedulePartId, offenceId, user)
  }

  async getSdsExclusionLists(user: User): Promise<SdsExclusionLists> {
    return this.manageOffencesApi.getSdsExclusionLists(user)
  }

  async getPcscLists(user: User): Promise<PcscLists> {
    return this.manageOffencesApi.getPcscLists(user)
  }

  async getOffenceMarkers(offence: Offence, user: User): Promise<OffenceMarkers> {
    const [sdsExclusionLists, pcscLists] = await Promise.all([this.getSdsExclusionLists(user), this.getPcscLists(user)])

    const isCodeInList = (list: { code: string }[], code: string) => list.some(item => item.code === code)

    const isSexual = isCodeInList(sdsExclusionLists.sexual, offence.code)
    const isDomesticAbuse = isCodeInList(sdsExclusionLists.domesticAbuse, offence.code)
    const isNationalSecurity = isCodeInList(sdsExclusionLists.nationalSecurity, offence.code)
    const isViolent = isCodeInList(sdsExclusionLists.violent, offence.code)
    const isTerrorism = isCodeInList(sdsExclusionLists.violent, offence.code)
    const inListA = isCodeInList(pcscLists.listA, offence.code)
    const inListB = isCodeInList(pcscLists.listB, offence.code)
    const inListC = isCodeInList(pcscLists.listC, offence.code)
    const inListD = isCodeInList(pcscLists.listD, offence.code)

    const markersExist =
      isSexual ||
      isDomesticAbuse ||
      isNationalSecurity ||
      isViolent ||
      isTerrorism ||
      inListA ||
      inListB ||
      inListC ||
      inListD

    return {
      isSexual,
      isDomesticAbuse,
      isNationalSecurity,
      isViolent,
      isTerrorism,
      inListA,
      inListB,
      inListC,
      inListD,
      markersExist,
    }
  }
}
