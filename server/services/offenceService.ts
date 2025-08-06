import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import {
  LinkOffence,
  Offence,
  OffenceMarkers,
  OffenceToScheduleMapping,
  PcscLists,
  Schedule,
  SchedulePart,
  SdsExclusionLists,
} from '../@types/manageOffences/manageOffencesClientTypes'
import AuthorisedRoles from '../enums/authorisedRoles'

type User = Express.User

export default class OffenceService {
  constructor(private readonly manageOffencesApi: ManageOffencesApiClient) {}

  public static INCHOATE_SENTENCE_END_DATED = new Date('2008-02-15')

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

    const { code } = offence

    const isSexual = isCodeInList(sdsExclusionLists.sexual, code)
    const isDomesticAbuse = isCodeInList(sdsExclusionLists.domesticAbuse, code)
    const isNationalSecurity = isCodeInList(sdsExclusionLists.nationalSecurity, code)
    const isViolent = isCodeInList(sdsExclusionLists.violent, code)
    const isTerrorism = isCodeInList(sdsExclusionLists.terrorism, code)

    const isSexualTrancheThree = isCodeInList(sdsExclusionLists.sexualTrancheThree, code)
    const isDomesticAbuseTrancheThree = isCodeInList(sdsExclusionLists.domesticAbuseTrancheThree, code)
    const isMurderTrancheThree = isCodeInList(sdsExclusionLists.murderTrancheThree, code)

    const inListA = isCodeInList(pcscLists.listA, code)
    const inListB = isCodeInList(pcscLists.listB, code)
    const inListC = isCodeInList(pcscLists.listC, code)
    const inListD = isCodeInList(pcscLists.listD, code)

    const markersExist =
      isSexual ||
      isDomesticAbuse ||
      isNationalSecurity ||
      isViolent ||
      isTerrorism ||
      isSexualTrancheThree ||
      isDomesticAbuseTrancheThree ||
      isMurderTrancheThree ||
      inListA ||
      inListB ||
      inListC ||
      inListD

    return {
      isSexual,
      isSexualTrancheThree,
      isDomesticAbuse,
      isDomesticAbuseTrancheThree,
      isNationalSecurity,
      isViolent,
      isTerrorism,
      isMurderTrancheThree,
      inListA,
      inListB,
      inListC,
      inListD,
      markersExist,
    }
  }

  isEligibleForEncouragementOffence(parentOffence: Offence, childOffences: Array<Offence>, roles: string[]): boolean {
    return (
      roles.includes(AuthorisedRoles.NOMIS_OFFENCE_ACTIVATOR) &&
      !parentOffence.isChild &&
      childOffences.some(o => o.code === `${parentOffence.code}E`) === false &&
      (!parentOffence.endDate || new Date(parentOffence.endDate) > OffenceService.INCHOATE_SENTENCE_END_DATED)
    )
  }

  async createSchedule(user: User, act: string, code: string, scheduleParts: number, url?: string) {
    const parts: SchedulePart[] = Array.from({ length: scheduleParts }, (_, index) => ({
      id: -1,
      partNumber: index + 1,
    }))
    await this.manageOffencesApi.createSchedule({ id: -1, act, code, url, scheduleParts: parts }, user)
  }

  async createSchedulePart(user: User, scheduleId: number, partNumber: number) {
    const schedulePart: SchedulePart = { id: -1, partNumber }
    await this.manageOffencesApi.createSchedulePart(schedulePart, scheduleId, user)
  }

  async linkSchedulePartOffences(user: User, scheduleId: number, schedulePartId: number, file: Express.Multer.File) {
    return this.manageOffencesApi.linkOffences(user, scheduleId, schedulePartId, file)
  }
}
