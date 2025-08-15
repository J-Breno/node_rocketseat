import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import type { AnswerComment } from '../../enterprise/entities/answer-comments.js'

export interface AnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
}
