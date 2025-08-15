import { left, right, type Either } from '@/core/either.js'
import type { Answer } from '../../enterprise/entities/answer.js'
import type { AnswerRepository } from '../repositories/answers-repository.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { answer: Answer }
>
export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    content,
    answerId,
    authorId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)
    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return right({ answer })
  }
}
