import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { CretaeGymUseCase } from './create-gym.js'

let gymsRepository: InMemoryGymsRepository
let sut: CretaeGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CretaeGymUseCase(gymsRepository)
  })

  it('Should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -3.7584896,
      longitude: -38.649856,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
