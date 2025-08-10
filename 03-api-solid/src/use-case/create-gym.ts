import type { Gym } from 'generated/prisma/index.js'
import type { GymsRepository } from '@/repositories/gyms-repository.js'

interface CretaeGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CretaeGymUseCaseResponse {
  gym: Gym
}

export class CretaeGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    latitude,
    longitude,
  }: CretaeGymUseCaseRequest): Promise<CretaeGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      latitude,
      longitude,
    })

    return { gym }
  }
}
