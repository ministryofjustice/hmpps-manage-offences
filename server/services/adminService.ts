import ManageOffencesApiClient from '../data/manageOffencesApiClient'
import {
  FeatureToggle,
  MostRecentLoadResult,
  NomisHistoryRecords,
  Offence,
} from '../@types/manageOffences/manageOffencesClientTypes'
import FeatureToggleDisplay from '../types/featureToggleDisplay'
import FeatureToggleType from '../types/featureToggleType'
import PrisonApiClient from '../data/prisonApiClient'
import AuthorisedRoles from '../enums/authorisedRoles'

type User = Express.User

export default class AdminService {
  constructor(
    private readonly manageOffencesApi: ManageOffencesApiClient,
    private readonly prisonApi: PrisonApiClient,
  ) {}

  async getNomisChangeHistory(from: Date, to: Date, user: User): Promise<NomisHistoryRecords> {
    const historyRecords = await this.manageOffencesApi.getNomisChangeHistory(from, to, user)
    const newOffences = historyRecords.filter(h => h.changeType === 'INSERT' && h.nomisChangeType === 'OFFENCE')
    const updatedOffences = historyRecords.filter(h => h.changeType === 'UPDATE' && h.nomisChangeType === 'OFFENCE')
    const statutes = historyRecords.filter(h => h.nomisChangeType === 'STATUTE')
    return { newOffences, updatedOffences, statutes }
  }

  async reactivateOffence(offenceId: number, user: User): Promise<unknown> {
    return this.manageOffencesApi.reactivateOffenceInNomis(offenceId, user)
  }

  async deactivateOffence(offenceId: number, user: User): Promise<unknown> {
    return this.manageOffencesApi.deactivateOffenceInNomis(offenceId, user)
  }

  async getMostRecentLoadResult(user: User): Promise<[MostRecentLoadResult]> {
    return this.manageOffencesApi.getMostRecentLoadResult(user)
  }

  async getFeatureToggles(user: User): Promise<FeatureToggleDisplay[]> {
    const toggles = await this.manageOffencesApi.getFeatureToggles(user)
    return toggles
      .sort((a, b) => a.feature.localeCompare(b.feature))
      .map(t => {
        return { ...t, displayName: FeatureToggleType[t.feature].displayName } as FeatureToggleDisplay
      })
  }

  async toggleFeatures(featureToggles: FeatureToggle[], user: User): Promise<unknown> {
    return this.manageOffencesApi.toggleFeatures(featureToggles, user)
  }

  async getNomisActivationFlags(
    offenceCode: string,
    offence: Offence,
    user: User,
    roles: string[],
  ): Promise<{ canActivate: boolean; canDeactivate: boolean }> {
    if (!roles.includes(AuthorisedRoles.ROLE_NOMIS_OFFENCE_ACTIVATOR)) {
      return { canActivate: false, canDeactivate: false }
    }
    const offences = await this.prisonApi.getOffencesByCodeStartsWith(offenceCode, user)
    const nomisOffence = offences.content.find(o => o.code === offenceCode)
    const today = new Date()
    const endDate = offence.endDate && new Date(offence.endDate)
    const canActivate = nomisOffence.activeFlag === 'N'
    const canDeactivate = endDate && endDate < today && nomisOffence.activeFlag === 'Y'
    return { canActivate, canDeactivate }
  }
}
