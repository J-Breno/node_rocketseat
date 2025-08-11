import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { GetUserProfileUseCase } from '../get-user-profile.js'

export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(prismaUserRepository)
  return useCase
}
