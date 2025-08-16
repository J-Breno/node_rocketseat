import { expect, beforeEach } from 'vitest'
import { CreateQuestionUseCase } from './create-question.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase
describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova Pergunta',
      content: 'Conteúdo da pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionRepository.items[0]?.attachments).toHaveLength(2)
    expect(inMemoryQuestionRepository.items[0]?.attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
