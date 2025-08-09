import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { RegisterUseCase } from '../register.js'

export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUserRepository)
  return registerUseCase
}
