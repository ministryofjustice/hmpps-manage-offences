import { components } from './index'

export type Offence = components['schemas']['Offence']
export type OffenceWithScheduleData = components['schemas']['OffenceWithScheduleData']
export type LinkOffence = components['schemas']['LinkOffence']
export type MostRecentLoadResult = components['schemas']['MostRecentLoadResult']
export type FeatureToggle = components['schemas']['FeatureToggle']
export type Schedule = components['schemas']['Schedule']
export type NomisChangeHistory = components['schemas']['NomisChangeHistory']
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
