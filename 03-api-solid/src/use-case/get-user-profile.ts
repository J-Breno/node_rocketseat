import type { UsersRepository } from '@/repositories/users-repository.js'
import type { User } from 'generated/prisma/index.js'
import { ResourseNotFoundError } from './errors/resourse-not-found-error.js'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourseNotFoundError()
    }

    return {
      user,
    }
  }
}
