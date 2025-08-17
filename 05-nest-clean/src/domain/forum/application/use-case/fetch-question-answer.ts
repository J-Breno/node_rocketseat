import { right, type Either } from '@/core/either.js'
import type { Answer } from '../../enterprise/entities/answer.js'
import type { AnswerRepository } from '../repositories/answers-repository.js'

interface FetchQuestionAnswersUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>

export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({ answers })
  }
}
