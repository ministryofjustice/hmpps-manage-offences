import { FeatureToggle } from '../@types/manageOffences/manageOffencesClientTypes'

class FeatureToggleDisplay implements FeatureToggle {
  displayName: string

  hintText: string

  enabled: boolean

  feature: 'FULL_SYNC_NOMIS' | 'DELTA_SYNC_NOMIS' | 'FULL_SYNC_SDRS' | 'DELTA_SYNC_SDRS' | 'PUBLISH_EVENTS'
}

export default FeatureToggleDisplay
