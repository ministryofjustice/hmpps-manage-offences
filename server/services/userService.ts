import convertToTitleCase from '../utils/utils'
import type HmppsAuthClient from '../data/hmppsAuthClient'

type User = Express.User

interface UserDetails {
  name: string
  displayName: string
}

export default class UserService {
  constructor(private readonly hmppsAuthClient: HmppsAuthClient) {}

  async getUser(userDetails: User): Promise<UserDetails> {
    const user = await this.hmppsAuthClient.getUser(userDetails)
    return { ...user, displayName: convertToTitleCase(user.name as string) }
  }
}
