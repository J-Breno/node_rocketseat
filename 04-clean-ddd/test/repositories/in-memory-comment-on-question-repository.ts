import type { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository.js'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments.js'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentRepository
{
  public items: QuestionComment[] = []
  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
