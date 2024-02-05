/* eslint-disable import/first */
/*
 * Do appinsights first as it does some magic instrumentation work, i.e. it affects other 'require's
 * In particular, applicationinsights automatically collects bunyan logs
 */
import { initialiseAppInsights, buildAppInsightsClient } from '../utils/azureAppInsights'
import applicationInfoSupplier from '../applicationInfo'

const applicationInfo = applicationInfoSupplier()
initialiseAppInsights()
buildAppInsightsClient(applicationInfo)

import ManageUsersApiClient from './manageUsersApiClient'
import { createRedisClient } from './redisClient'
import RedisTokenStore from './tokenStore/redisTokenStore'
import InMemoryTokenStore from './tokenStore/inMemoryTokenStore'
import config from '../config'
import AuthTokenService from './authTokenService'
import ManageOffencesApiClient from './manageOffencesApiClient'
import PrisonApiClient from './prisonApiClient'

type RestClientBuilder<T> = (token: string) => T

const authTokenService = new AuthTokenService(
  config.redis.enabled ? new RedisTokenStore(createRedisClient()) : new InMemoryTokenStore(),
)

export const dataAccess = () => ({
  applicationInfo,
  manageUsersApiClient: new ManageUsersApiClient(authTokenService),
  manageOffencesApiClient: new ManageOffencesApiClient(authTokenService),
  prisonApiClient: new PrisonApiClient(authTokenService),
})

export type DataAccess = ReturnType<typeof dataAccess>

export { RestClientBuilder, ManageUsersApiClient }
