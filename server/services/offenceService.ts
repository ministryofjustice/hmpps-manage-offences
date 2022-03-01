import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import { Offence } from '../@types/manageOffences/manageOffencesClientTypes'

export default class OffenceService {
  constructor(private readonly manageOffencesApiClient: ManageOffencesApiClient) {}

  async getOffencesByCode(offenceCode: string, user: Express.User): Promise<[Offence]> {
    return this.manageOffencesApiClient.getOffencesByCode(offenceCode, user)
  }
}
