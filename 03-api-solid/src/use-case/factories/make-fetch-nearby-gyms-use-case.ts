import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms.js'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository.js'

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(prismaGymsRepository)
  return useCase
}
