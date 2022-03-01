import nock from 'nock'
import HmppsRestClient from './hmppsRestClient'
import HmppsAuthClient from './hmppsAuthClient'

type User = Express.User

jest.mock('./tokenStore', () => {
  return jest.fn().mockImplementation(() => {
    return { TokenStore: () => '', getAuthToken: () => '' }
  })
})

const authClient = new HmppsAuthClient()

describe('hmppsAuthClient', () => {
  const get = jest.spyOn(HmppsRestClient.prototype, 'get')

  beforeEach(() => {
    get.mockResolvedValue(true)
  })

  afterEach(() => {
    jest.resetAllMocks()
    nock.cleanAll()
  })

  describe('getUser', () => {
    it('should return data from api', async () => {
      get.mockResolvedValue({ username: 'another' } as User)

      const result = await authClient.getUser({ token: 'token' } as User)

      expect(get).toHaveBeenCalledWith({ path: '/api/user/me' }, { token: 'token' })
      expect(result).toEqual({ username: 'another' })
    })
  })
})
