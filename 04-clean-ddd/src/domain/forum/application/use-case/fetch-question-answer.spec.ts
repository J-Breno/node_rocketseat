import { expect, beforeEach } from 'vitest'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository.js'
import { FetchQuestionAnswersUseCase } from './fetch-question-answer.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { makeAnswer } from 'test/factories/make-answer.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswersUseCase
describe('Fetch Questions Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch question answer', async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('quesiton-1'),
      }),
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('quesiton-1'),
      }),
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('quesiton-1'),
      }),
    )

    const result = await sut.execute({
      questionId: 'quesiton-1',
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('quesiton-1'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'quesiton-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
