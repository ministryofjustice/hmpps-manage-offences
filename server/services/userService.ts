import convertToTitleCase from '../utils/utils'
import ManageUsersApiClient, { User } from '../data/manageUsersApiClient'

interface UserDetails extends User {
  displayName: string
}

export default class UserService {
  constructor(private readonly manageUsersApiClient: ManageUsersApiClient) {}

  async getUser(userDetails: Express.User): Promise<UserDetails> {
    const user = await this.manageUsersApiClient.getUser(userDetails)
    return { ...user, displayName: convertToTitleCase(user.name as string) }
  }
}
