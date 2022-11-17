import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import { NomisHistoryRecords } from '../@types/manageOffences/manageOffencesClientTypes'

type User = Express.User

export default class ChangeHistoryService {
  constructor(private readonly manageOffencesApiClient: ManageOffencesApiClient) {}

  async getNomisChangeHistory(from: Date, to: Date, user: User): Promise<NomisHistoryRecords> {
    const historyRecords = await this.manageOffencesApiClient.getNomisChangeHistory(from, to, user)
    const newOffences = historyRecords.filter(h => h.changeType === 'INSERT' && h.nomisChangeType === 'OFFENCE')
    const updatedOffences = historyRecords.filter(h => h.changeType === 'UPDATE' && h.nomisChangeType === 'OFFENCE')
    const statutes = historyRecords.filter(h => h.nomisChangeType === 'STATUTE')
    const hoCodes = historyRecords.filter(h => h.nomisChangeType === 'HOME_OFFICE_CODE')
    return { newOffences, updatedOffences, statutes, hoCodes }
  }
}
