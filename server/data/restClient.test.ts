import nock from 'nock'

import { AgentConfig } from '../config'
import RestClient from './restClient'
import AuthTokenService from './authTokenService'

jest.mock('./authTokenService')
const authTokenService = new AuthTokenService(null) as jest.Mocked<AuthTokenService>

const restClient = new RestClient(
  'api-name',
  {
    url: 'http://localhost:8080/api',
    timeout: {
      response: 1000,
      deadline: 1000,
    },
    agent: new AgentConfig(1000),
  },
  authTokenService,
)

describe.each(['get', 'patch', 'post', 'put', 'delete'] as const)('Method: %s', method => {
  it('should return response body', async () => {
    nock('http://localhost:8080', {
      reqheaders: { authorization: 'Bearer token-1' },
    })
      [method]('/api/test')
      .reply(200, { success: true })

    const result = await restClient[method](
      {
        path: '/test',
      },
      {
        token: 'token-1',
      },
    )

    expect(nock.isDone()).toBe(true)

    expect(result).toStrictEqual({
      success: true,
    })
  })

  it('should return raw response body', async () => {
    nock('http://localhost:8080', {
      reqheaders: { authorization: 'Bearer token-1' },
    })
      [method]('/api/test')
      .reply(200, { success: true })

    const result = await restClient[method](
      {
        path: '/test',
        headers: { header1: 'headerValue1' },
        raw: true,
      },
      {
        token: 'token-1',
      },
    )

    expect(nock.isDone()).toBe(true)

    expect(result).toMatchObject({
      req: { method: method.toUpperCase() },
      status: 200,
      text: '{"success":true}',
    })
  })

  if (method === 'get' || method === 'delete') {
    it('should retry by default', async () => {
      nock('http://localhost:8080', {
        reqheaders: { authorization: 'Bearer token-1' },
      })
        [method]('/api/test')
        .reply(500)
        [method]('/api/test')
        .reply(500)
        [method]('/api/test')
        .reply(500)

      await expect(
        restClient[method](
          {
            path: '/test',
            headers: { header1: 'headerValue1' },
          },
          {
            token: 'token-1',
          },
        ),
      ).rejects.toThrow('Internal Server Error')

      expect(nock.isDone()).toBe(true)
    })
  } else {
    it('should not retry by default', async () => {
      nock('http://localhost:8080', {
        reqheaders: { authorization: 'Bearer token-1' },
      })
        [method]('/api/test')
        .reply(500)

      await expect(
        restClient[method](
          {
            path: '/test',
            headers: { header1: 'headerValue1' },
          },
          {
            token: 'token-1',
          },
        ),
      ).rejects.toThrow('Internal Server Error')

      expect(nock.isDone()).toBe(true)
    })

    it('should retry if configured to do so', async () => {
      nock('http://localhost:8080', {
        reqheaders: { authorization: 'Bearer token-1' },
      })
        [method]('/api/test')
        .reply(500)
        [method]('/api/test')
        .reply(500)
        [method]('/api/test')
        .reply(500)

      await expect(
        restClient[method](
          {
            path: '/test',
            headers: { header1: 'headerValue1' },
            retry: true,
          },
          {
            token: 'token-1',
          },
        ),
      ).rejects.toThrow('Internal Server Error')

      expect(nock.isDone()).toBe(true)
    })
  }

  it('can recover through retries', async () => {
    nock('http://localhost:8080', {
      reqheaders: { authorization: 'Bearer token-1' },
    })
      [method]('/api/test')
      .reply(500)
      [method]('/api/test')
      .reply(500)
      [method]('/api/test')
      .reply(200, { success: true })

    const result = await restClient[method](
      {
        path: '/test',
        headers: { header1: 'headerValue1' },
        retry: true,
      },
      {
        token: 'token-1',
      },
    )

    expect(result).toStrictEqual({ success: true })
    expect(nock.isDone()).toBe(true)
  })
})
