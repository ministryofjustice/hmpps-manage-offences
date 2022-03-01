import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import { Offence } from '../@types/manageOffences/manageOffencesClientTypes'

type User = Express.User

export default class OffenceService {
  constructor(private readonly manageOffencesApiClient: ManageOffencesApiClient) {}

  async getOffencesByCode(offenceCode: string, user: User): Promise<[Offence]> {
    return this.manageOffencesApiClient.getOffencesByCode(offenceCode, user)
  }
}
