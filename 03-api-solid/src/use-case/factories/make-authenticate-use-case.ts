import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { AuthenticateUseCase } from '../authenticate.js'

export function makeAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository)
  return authenticateUseCase
}
