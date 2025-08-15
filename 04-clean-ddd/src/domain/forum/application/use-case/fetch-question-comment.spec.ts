import { expect, beforeEach } from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-comment-on-question-repository.js'
import { FetchQuestionCommentUseCase } from './fetch-question-comment.js'
import { makeQuestionComment } from 'test/factories/make-question-comment.js'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: FetchQuestionCommentUseCase
describe('Fetch Questions Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new FetchQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to fetch question comment', async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('quesiton-1'),
      }),
    )

    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('quesiton-1'),
      }),
    )

    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('quesiton-1'),
      }),
    )

    const result = await sut.execute({
      questionId: 'quesiton-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('quesiton-1'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'quesiton-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
