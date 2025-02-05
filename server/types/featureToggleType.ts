import FeatureToggleEnum from '../enums/FeatureToggleEnum'

export default class FeatureToggleType {
  public static readonly FULL_SYNC_NOMIS = new FeatureToggleType(FeatureToggleEnum.FULL_SYNC_NOMIS, 'Full Sync NOMIS')

  public static readonly DELTA_SYNC_NOMIS = new FeatureToggleType(
    FeatureToggleEnum.DELTA_SYNC_NOMIS,
    'Delta Sync NOMIS',
  )

  public static readonly FULL_SYNC_SDRS = new FeatureToggleType(FeatureToggleEnum.FULL_SYNC_SDRS, 'Full Sync SDRS')

  public static readonly DELTA_SYNC_SDRS = new FeatureToggleType(FeatureToggleEnum.DELTA_SYNC_SDRS, 'Delta Sync SDRS')

  public static readonly SYNC_HOME_OFFICE_CODES = new FeatureToggleType(
    FeatureToggleEnum.SYNC_HOME_OFFICE_CODES,
    'Full Sync Home Office Codes (Analytical Platform)',
  )

  public static readonly PUBLISH_EVENTS = new FeatureToggleType(FeatureToggleEnum.PUBLISH_EVENTS, 'Publish events')

  public static readonly UNLINK_SCHEDULES_NOMIS = new FeatureToggleType(
    FeatureToggleEnum.UNLINK_SCHEDULES_NOMIS,
    'Unlink schedules NOMIS (migration task)',
  )

  public static readonly LINK_SCHEDULES_NOMIS = new FeatureToggleType(
    FeatureToggleEnum.LINK_SCHEDULES_NOMIS,
    'Link schedules NOMIS (migration task)',
  )

  public static readonly T3_OFFENCE_EXCLUSIONS = new FeatureToggleType(
    FeatureToggleEnum.T3_OFFENCE_EXCLUSIONS,
    'Tranche Three Excluded Offences',
  )

  private constructor(
    public readonly featureName: FeatureToggleEnum,
    public readonly displayName: string,
    public readonly hintText: string = null,
  ) {}
}
