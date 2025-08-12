import { expect, it, beforeEach } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question.js'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da resposta',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0]?.id).toEqual(answer.id)
  })
})
