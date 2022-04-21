import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import { MostRecentLoadResult, Offence } from '../@types/manageOffences/manageOffencesClientTypes'

type User = Express.User

export default class OffenceService {
  constructor(private readonly manageOffencesApiClient: ManageOffencesApiClient) {}

  async getOffencesByCode(offenceCode: string, user: User): Promise<[Offence]> {
    return this.manageOffencesApiClient.getOffencesByCode(offenceCode, user)
  }

  async getMostRecentLoadResult(user: User): Promise<[MostRecentLoadResult]> {
    return this.manageOffencesApiClient.getMostRecentLoadResult(user)
  }

  async triggerSdrsLoad(user: User) {
    this.manageOffencesApiClient.triggerSdrsLoad(user)
  }

  async triggerSdrsUpdate(user: User) {
    this.manageOffencesApiClient.triggerSdrsUpdate(user)
  }
}
