import { RestClient, asUser } from '@ministryofjustice/hmpps-rest-client'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import config from '../config'
import logger from '../../logger'
import {
  FeatureToggle,
  LinkOffence,
  MostRecentLoadResult,
  NomisChangeHistory,
  Offence,
  OffenceToScheduleMapping,
  PcscLists,
  Schedule,
  SdsExclusionLists,
} from '../@types/manageOffences/manageOffencesClientTypes'

type User = Express.User

export default class ManageOffencesApiClient extends RestClient {
  constructor(authenticationClient: AuthenticationClient) {
    super('Manage offences API', config.apis.manageOffences, logger, authenticationClient)
  }

  getOffencesByCode(offenceCode: string, user: User): Promise<[Offence]> {
    return this.get(
      {
        path: `/offences/code/${offenceCode}`,
      },
      asUser(user.token),
    ) as Promise<[Offence]>
  }

  searchOffences(searchString: string, user: User): Promise<[Offence]> {
    return this.get(
      {
        path: `/offences/search?searchString=${searchString}`,
      },
      asUser(user.token),
    ) as Promise<[Offence]>
  }

  getOffenceById(offenceId: number, user: User): Promise<Offence> {
    return this.get(
      {
        path: `/offences/id/${offenceId}`,
      },
      asUser(user.token),
    ) as Promise<Offence>
  }

  getOffenceToScheduleMapping(offenceId: number, user: User): Promise<OffenceToScheduleMapping> {
    return this.get(
      {
        path: `/schedule/offence-mapping/id/${offenceId}`,
      },
      asUser(user.token),
    ) as Promise<OffenceToScheduleMapping>
  }

  getMostRecentLoadResult(user: User): Promise<[MostRecentLoadResult]> {
    return this.get(
      {
        path: '/offences/load-results',
      },
      asUser(user.token),
    ) as Promise<[MostRecentLoadResult]>
  }

  getFeatureToggles(user: User): Promise<[FeatureToggle]> {
    return this.get(
      {
        path: '/admin/feature-toggles',
      },
      asUser(user.token),
    ) as Promise<[FeatureToggle]>
  }

  toggleFeatures(featureToggles: FeatureToggle[], user: User): Promise<unknown> {
    return this.put(
      {
        path: '/admin/toggle-feature',
        data: featureToggles,
      },
      asUser(user.token),
    )
  }

  getAllSchedules(user: User): Promise<[Schedule]> {
    return this.get(
      {
        path: '/schedule/all',
      },
      asUser(user.token),
    ) as Promise<[Schedule]>
  }

  getScheduleById(scheduleId: number, user: User): Promise<Schedule> {
    return this.get(
      {
        path: `/schedule/by-id/${scheduleId}`,
      },
      asUser(user.token),
    ) as Promise<Schedule>
  }

  linkOffence(linkOffence: LinkOffence, user: User): Promise<unknown> {
    return this.post(
      {
        path: '/schedule/link-offence',
        data: linkOffence,
      },
      asUser(user.token),
    )
  }

  unlinkOffence(schedulePartId: number, offenceId: number, user: User): Promise<unknown> {
    return this.post(
      {
        path: '/schedule/unlink-offences',
        data: [{ schedulePartId, offenceId }],
      },
      asUser(user.token),
    )
  }

  getNomisChangeHistory(fromDate: Date, toDate: Date, user: User): Promise<[NomisChangeHistory]> {
    return this.get(
      {
        path: `/change-history/nomis?from=${fromDate.toISOString().split('T')[0]}&to=${
          toDate.toISOString().split('T')[0]
        }`,
      },
      asUser(user.token),
    ) as Promise<[NomisChangeHistory]>
  }

  reactivateOffenceInNomis(offenceId: number, user: User): Promise<unknown> {
    return this.post(
      {
        path: '/admin/nomis/offences/reactivate',
        data: [offenceId],
      },
      asUser(user.token),
    )
  }

  deactivateOffenceInNomis(offenceId: number, user: User): Promise<unknown> {
    return this.post(
      {
        path: '/admin/nomis/offences/deactivate',
        data: [offenceId],
      },
      asUser(user.token),
    )
  }

  addEncouragementOffence(offenceId: number, user: User): Promise<unknown> {
    return this.post(
      {
        path: `/admin/nomis/offences/encouragement/${offenceId}`,
        data: [],
      },
      asUser(user.token),
    )
  }

  getSdsExclusionLists(user: User): Promise<SdsExclusionLists> {
    return this.get(
      {
        path: '/schedule/sds-early-release-exclusion-lists',
      },
      asUser(user.token),
    ) as Promise<SdsExclusionLists>
  }

  getPcscLists(user: User): Promise<PcscLists> {
    return this.get(
      {
        path: '/schedule/pcsc-lists',
      },
      asUser(user.token),
    ) as Promise<PcscLists>
  }
}
