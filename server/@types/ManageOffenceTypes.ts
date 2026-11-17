import { NomisChangeHistory } from './manageOffencesApi'

export type OffenceMarkers = {
  markersExist: boolean
  isSexual: boolean
  isSexualTrancheThree: boolean
  isDomesticAbuse: boolean
  isDomesticAbuseTrancheThree: boolean
  isNationalSecurity: boolean
  isViolent: boolean
  isTerrorism: boolean
  isMurderTrancheThree: boolean
  isSA2026ProgressionModelExcludedOffence: boolean
  inListA: boolean
  inListB: boolean
  inListC: boolean
  inListD: boolean
}

export type NomisHistoryRecords = {
  newOffences: NomisChangeHistory[]
  updatedOffences: NomisChangeHistory[]
  statutes: NomisChangeHistory[]
}

export type DateInput = {
  day: number
  month: number
  year: number
}
