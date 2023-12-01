import UserService from './userService'
import ManageUsersApiClient, { User } from '../data/manageUsersApiClient'

jest.mock('../data/manageUsersApiClient')

const user = { token: 'some token' } as Express.User

describe('User service', () => {
  let manageUsersApiClient: jest.Mocked<ManageUsersApiClient>
  let userService: UserService

  describe('getUser', () => {
    beforeEach(() => {
      manageUsersApiClient = new ManageUsersApiClient() as jest.Mocked<ManageUsersApiClient>
      userService = new UserService(manageUsersApiClient)
    })
    it('Retrieves and formats user name', async () => {
      manageUsersApiClient.getUser.mockResolvedValue({ name: 'john smith' } as User)

      const result = await userService.getUser(user)

      expect(result.displayName).toEqual('John Smith')
    })
    it('Propagates error', async () => {
      manageUsersApiClient.getUser.mockRejectedValue(new Error('some error'))

      await expect(userService.getUser(user)).rejects.toEqual(new Error('some error'))
    })
  })
})
