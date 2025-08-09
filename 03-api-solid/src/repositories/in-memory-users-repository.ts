import { Prisma } from 'generated/prisma/index.js'

export class InMemoryUsersRepository {
  public users: any[] = []
  async create(data: Prisma.UserCreateInput) {
    this.users.push(data)
  }
}
