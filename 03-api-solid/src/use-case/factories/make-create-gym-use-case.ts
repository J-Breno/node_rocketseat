import { CretaeGymUseCase } from '../create-gym.js'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new CretaeGymUseCase(prismaGymsRepository)
  return useCase
}
