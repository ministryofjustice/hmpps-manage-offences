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

  public static readonly SEXUAL_OFFENCES_FROM_CODES_AND_S15P2 = new FeatureToggleType(
    FeatureToggleEnum.SEXUAL_OFFENCES_FROM_CODES_AND_S15P2,
    'Sexual Offences from Schedule 15 Part 2 and codes that begin with SX03 and SX56',
    `When enabled this will use Schedule 15 Part 2 and offences with codes that begin with SX03 and SX56 
    to determine if the offence is sexual. When disabled it will use offences that are on Schedule 3 and 
    Schedule 15 Part 2 to make this determination.`,
  )

  private constructor(
    public readonly featureName: FeatureToggleEnum,
    public readonly displayName: string,
    public readonly hintText: string = null,
  ) {}
}
