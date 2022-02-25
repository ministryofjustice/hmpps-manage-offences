import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import { Offence } from '../@types/manageOffences/manageOffencesClientTypes'

export default class OffenceService {
  private manageOffencesApiClient: ManageOffencesApiClient

  setManageOffencesApiClient(token: string) {
    this.manageOffencesApiClient = new ManageOffencesApiClient(token)
  }

  async getOffencesByCode(offenceCode: string): Promise<[Offence]> {
    return this.manageOffencesApiClient.getOffencesByCode(offenceCode)
  }
}
