import { expect, beforeEach } from 'vitest'
import { CreateQuestionUseCase } from './create-question.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase
describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create an answer', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova Pergunta',
      content: 'Conteúdo da pergunta',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0]?.id).toEqual(question.id)
  })
})
