import type { SuperAgentRequest } from 'superagent'
import { stubFor } from './wiremock'

export default {
  stubPing: (httpStatus = 200): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: '/manage-offences-api/health/ping',
      },
      response: {
        status: httpStatus,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: { status: httpStatus === 200 ? 'UP' : 'DOWN' },
      },
    }),
  stubEmptyProgressionModelLists: (): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: '/manage-offences-api/schedule/progression-model-exclusion-lists',
      },
      response: {
        status: 200,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: { sentencingAct2026ProgressionModelExclusions: [] },
      },
    }),
}
