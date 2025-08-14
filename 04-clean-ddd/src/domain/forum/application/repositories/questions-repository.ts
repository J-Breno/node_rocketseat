import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import type { Question } from '../../enterprise/entities/question.js'

export interface QuestionRepository {
  findById(id: string): Promise<Question | null>
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
}
