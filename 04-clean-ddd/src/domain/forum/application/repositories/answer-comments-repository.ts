import type { AnswerComment } from '../../enterprise/entities/answer-comments.js'

export interface AnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
}
