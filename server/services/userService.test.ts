import UserService from './userService'
import HmppsAuthClient, { AuthUserDetails } from '../data/hmppsAuthClient'

jest.mock('../data/hmppsAuthClient')

const user = { token: 'some token' } as Express.User

describe('User service', () => {
  let hmppsAuthClient: jest.Mocked<HmppsAuthClient>
  let userService: UserService

  describe('getUser', () => {
    beforeEach(() => {
      hmppsAuthClient = new HmppsAuthClient() as jest.Mocked<HmppsAuthClient>
      userService = new UserService(hmppsAuthClient)
    })
    it('Retrieves and formats user name', async () => {
      hmppsAuthClient.getUser.mockResolvedValue({ name: 'john smith' } as AuthUserDetails)

      const result = await userService.getUser(user)

      expect(result.displayName).toEqual('John Smith')
    })
    it('Propagates error', async () => {
      hmppsAuthClient.getUser.mockRejectedValue(new Error('some error'))

      await expect(userService.getUser(user)).rejects.toEqual(new Error('some error'))
    })
  })
})
