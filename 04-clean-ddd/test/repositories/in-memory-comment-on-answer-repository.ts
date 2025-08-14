import type { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository.js'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comments.js'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = []
  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}
