import type { AnswerComment } from '../../enterprise/entities/answer-comments.js'

export interface AnswerCommentRepository {
  create(AnswerComment: AnswerComment): Promise<void>
}
