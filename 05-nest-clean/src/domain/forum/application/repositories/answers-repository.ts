import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import type { Answer } from '../../enterprise/entities/answer.js'

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  save(answer: Answer): Promise<void>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
}
