import FeatureToggleEnum from '../enums/FeatureToggleEnum'

export default class FeatureToggleType {
  public static readonly FULL_SYNC_NOMIS = new FeatureToggleType(FeatureToggleEnum.FULL_SYNC_NOMIS, 'Full sync NOMIS')

  public static readonly DELTA_SYNC_NOMIS = new FeatureToggleType(
    FeatureToggleEnum.DELTA_SYNC_NOMIS,
    'Delta sync NOMIS',
  )

  public static readonly SYNC_SDRS = new FeatureToggleType(FeatureToggleEnum.SYNC_SDRS, 'Sync SDRS')

  private constructor(public readonly featureName: FeatureToggleEnum, public readonly displayName: string) {}
}
