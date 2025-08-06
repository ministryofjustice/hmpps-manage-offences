import { components } from './index'

export type Offence = components['schemas']['Offence']
export type OffenceToScheduleMapping = components['schemas']['OffenceToScheduleMapping']
export type LinkOffence = components['schemas']['LinkOffence']
export type MostRecentLoadResult = components['schemas']['MostRecentLoadResult']
export type FeatureToggle = components['schemas']['FeatureToggle']
export type Schedule = components['schemas']['Schedule']
export type SchedulePart = components['schemas']['SchedulePart']
export type NomisChangeHistory = components['schemas']['NomisChangeHistory']
export type PcscLists = components['schemas']['PcscLists']
export type SdsExclusionLists = components['schemas']['SdsExclusionLists']
export type ImportCsvResult = components['schemas']['ImportCsvResult']
export type DateInput = {
  day: number
  month: number
  year: number
}
export type NomisHistoryRecords = {
  newOffences: NomisChangeHistory[]
  updatedOffences: NomisChangeHistory[]
  statutes: NomisChangeHistory[]
}

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
  inListA: boolean
  inListB: boolean
  inListC: boolean
  inListD: boolean
}
