import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import { Offence } from '../@types/manageOffences/manageOffencesClientTypes'

export default class OffenceService {
  async getOffencesByCode(offenceCode: string, token: string): Promise<[Offence]> {
    return new ManageOffencesApiClient(token).getOffencesByCode(offenceCode)
  }
}
