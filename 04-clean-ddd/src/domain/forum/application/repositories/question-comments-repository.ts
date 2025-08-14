import type { QuestionComment } from '../../enterprise/entities/question-comments.js'

export interface QuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>
}
