import type { PaginationParams } from '@/core/repositories/pagination-params.js'
import type { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository.js'
import type { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []
  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(asnwer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === asnwer.id)
    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items[itemIndex] = answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }
}
