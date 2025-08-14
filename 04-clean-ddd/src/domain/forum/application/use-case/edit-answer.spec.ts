import { expect, beforeEach } from 'vitest'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository.js'
import { makeAnswer } from 'test/factories/make-answer.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { EditAnswerUseCase } from './edit-answer.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase
describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      content: 'Conteudo teste',
      answerId: newAnswer.id.toValue(),
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'Conteudo teste',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        content: 'Conteudo teste',
        answerId: newAnswer.id.toValue(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
