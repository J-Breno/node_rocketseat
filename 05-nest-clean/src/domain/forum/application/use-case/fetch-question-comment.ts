import { right, type Either } from '@/core/either.js'
import type { QuestionComment } from '../../enterprise/entities/question-comments.js'
import type { QuestionCommentRepository } from '../repositories/question-comments-repository.js'

interface FetchQuestionCommentRequestUseCase {
  page: number
  questionId: string
}

type FetchQuestionCommentResponseUseCase = Either<
  null,
  { questionComments: QuestionComment[] }
>

export class FetchQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentRequestUseCase): Promise<FetchQuestionCommentResponseUseCase> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({ questionComments })
  }
}
