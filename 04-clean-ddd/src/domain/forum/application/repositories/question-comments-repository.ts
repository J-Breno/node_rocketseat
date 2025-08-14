import type { QuestionComment } from '../../enterprise/entities/question-comments.js'

export interface QuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
}
