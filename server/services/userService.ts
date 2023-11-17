import convertToTitleCase from '../utils/utils'
import ManageUsersApiClient from '../data/manageUsersApiClient'

interface UserDetails {
  name: string
  displayName: string
}

export default class UserService {
  constructor(private readonly manageUsersApiClient: ManageUsersApiClient) {}

  async getUser(userDetails: Express.User): Promise<UserDetails> {
    const user = await this.manageUsersApiClient.getUser(userDetails)
    return { name: user.name, displayName: convertToTitleCase(user.name as string) }
  }
}
