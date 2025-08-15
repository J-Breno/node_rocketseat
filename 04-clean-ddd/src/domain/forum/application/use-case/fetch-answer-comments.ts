import type { AnswerComment } from '../../enterprise/entities/answer-comments.js'
import type { AnswerCommentRepository } from '../repositories/answer-comments-repository.js'

interface FetchAnswerCommentRequestUseCase {
  page: number
  answerId: string
}

interface FetchAnswerCommentResponseUseCase {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentRequestUseCase): Promise<FetchAnswerCommentResponseUseCase> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return { answerComments }
  }
}
