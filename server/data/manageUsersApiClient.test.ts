import nock from 'nock'
import ManageUsersApiClient, { User } from './manageUsersApiClient'
import RestClient from './restClient'

jest.mock('./tokenStore', () => {
  return jest.fn().mockImplementation(() => {
    return { TokenStore: () => '', getAuthToken: () => '' }
  })
})

const manageUsersApiClient = new ManageUsersApiClient()

describe('manageUsersApiClient', () => {
  const get = jest.spyOn(RestClient.prototype, 'get')

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

      const result = await manageUsersApiClient.getUser({ token: 'token' } as Express.User)

      expect(get).toHaveBeenCalledWith({ path: '/users/me' }, { token: 'token' })
      expect(result).toEqual({ username: 'another' })
    })
  })
})
