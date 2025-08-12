import type { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []
  async create(answer: Answer) {
    this.items.push(answer)
  }
}
